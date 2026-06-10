
-- 1. Extend orders with delivery, prescription link, and customer snapshot
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS prescription_id uuid REFERENCES public.prescriptions(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS delivery_type text NOT NULL DEFAULT 'regular',
  ADD COLUMN IF NOT EXISTS delivery_fee numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS customer_name text,
  ADD COLUMN IF NOT EXISTS customer_phone text,
  ADD COLUMN IF NOT EXISTS customer_email text,
  ADD COLUMN IF NOT EXISTS shipping_address text,
  ADD COLUMN IF NOT EXISTS shipping_city text,
  ADD COLUMN IF NOT EXISTS shipping_zip text,
  ADD COLUMN IF NOT EXISTS notes text;

ALTER TABLE public.orders ALTER COLUMN status SET DEFAULT 'pending';
UPDATE public.orders SET status='pending' WHERE status IS NULL;

-- 2. Order status history
CREATE TABLE IF NOT EXISTS public.order_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status text NOT NULL,
  note text,
  changed_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.order_status_history TO authenticated;
GRANT ALL ON public.order_status_history TO service_role;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers view own order history"
  ON public.order_status_history FOR SELECT TO authenticated
  USING (order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid()));
CREATE POLICY "Staff and admin view all order history"
  ON public.order_status_history FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
CREATE POLICY "Staff and admin insert order history"
  ON public.order_status_history FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));

-- 3. Notifications (used for both admin/staff and customers)
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  audience text NOT NULL DEFAULT 'user', -- 'user' | 'staff'
  title text NOT NULL,
  body text,
  link text,
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own notifications"
  ON public.notifications FOR SELECT TO authenticated
  USING (audience='user' AND user_id = auth.uid());
CREATE POLICY "Users update own notifications"
  ON public.notifications FOR UPDATE TO authenticated
  USING (audience='user' AND user_id = auth.uid());
CREATE POLICY "Staff and admin view staff notifications"
  ON public.notifications FOR SELECT TO authenticated
  USING (audience='staff' AND (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff')));
CREATE POLICY "Staff and admin update staff notifications"
  ON public.notifications FOR UPDATE TO authenticated
  USING (audience='staff' AND (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff')));
CREATE POLICY "Authenticated can insert notifications"
  ON public.notifications FOR INSERT TO authenticated
  WITH CHECK (true);

-- 4. Staff RLS extensions
CREATE POLICY "Staff view all orders"
  ON public.orders FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'staff'));
CREATE POLICY "Staff update orders"
  ON public.orders FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'staff'));
CREATE POLICY "Staff view all order items"
  ON public.order_items FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'staff'));
CREATE POLICY "Admins update order items"
  ON public.order_items FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
CREATE POLICY "Staff view all prescriptions"
  ON public.prescriptions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
CREATE POLICY "Staff manage products"
  ON public.products FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'staff'));
CREATE POLICY "Staff and admin view customers"
  ON public.customers FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));

-- 5. Trigger: when order status changes, log to history + create customer notification
CREATE OR REPLACE FUNCTION public.handle_order_status_change()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.order_status_history(order_id,status,note,changed_by)
    VALUES (NEW.id, COALESCE(NEW.status,'pending'),'Order placed',NEW.user_id);
    INSERT INTO public.notifications(audience,title,body,order_id,link)
    VALUES ('staff','New order received','A new order requires review.',NEW.id,'/admin/orders');
    RETURN NEW;
  END IF;
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.order_status_history(order_id,status,changed_by)
    VALUES (NEW.id, NEW.status, auth.uid());
    IF NEW.user_id IS NOT NULL THEN
      INSERT INTO public.notifications(user_id,audience,title,body,order_id,link)
      VALUES (NEW.user_id,'user','Order '||NEW.status,'Your order status is now '||NEW.status,NEW.id,'/dashboard');
    END IF;
  END IF;
  RETURN NEW;
END;$$;

DROP TRIGGER IF EXISTS trg_order_status_change ON public.orders;
CREATE TRIGGER trg_order_status_change
  AFTER INSERT OR UPDATE OF status ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_order_status_change();
