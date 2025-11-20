-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    dosage TEXT,
    usage_instructions TEXT,
    side_effects TEXT,
    price NUMERIC NOT NULL DEFAULT 0,
    discount_percent INTEGER DEFAULT 0,
    image_url TEXT,
    qr_code_url TEXT,
    category TEXT NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    manufacturer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create customers table
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    alternate_phone TEXT,
    email TEXT,
    age INTEGER,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    total_amount NUMERIC,
    prescription_url TEXT,
    status TEXT DEFAULT 'pending',
    payment_status TEXT DEFAULT 'pending',
    payment_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    price_at_purchase NUMERIC,
    discount_at_purchase INTEGER DEFAULT 0
);

-- Create prescriptions table (separate from orders)
CREATE TABLE IF NOT EXISTS public.prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    file_url TEXT
);

-- Create trigger for products updated_at
CREATE TRIGGER update_products_timestamp
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_timestamp
BEFORE UPDATE ON public.customers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_timestamp
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can view products"
ON public.products
FOR SELECT
USING (true);

CREATE POLICY "Only admins can manage products"
ON public.products
FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Customers policies
CREATE POLICY "Users can view own customer profile"
ON public.customers
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own customer profile"
ON public.customers
FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert own customer profile"
ON public.customers
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Orders policies
CREATE POLICY "Users can create their own orders"
ON public.orders
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own orders"
ON public.orders
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Order Items policies
CREATE POLICY "Users can insert order items for own orders"
ON public.order_items
FOR INSERT
WITH CHECK (
  order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid())
);

CREATE POLICY "Users can view order items for own orders"
ON public.order_items
FOR SELECT
USING (
  order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can view all order items"
ON public.order_items
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Prescriptions policies
CREATE POLICY "Users can upload prescriptions"
ON public.prescriptions
FOR INSERT
WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Users can view their prescriptions"
ON public.prescriptions
FOR SELECT
USING (customer_id = auth.uid());

CREATE POLICY "Admins can view all prescriptions"
ON public.prescriptions
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Insert default categories
INSERT INTO public.categories (name, description) VALUES
('Medicines', 'General medicines and pharmaceuticals'),
('Diabetes', 'Diabetes care and management products'),
('Pain Relief', 'Pain management and relief products'),
('Ayurveda', 'Ayurvedic and herbal products'),
('Health Devices', 'Medical devices and equipment'),
('Personal Care', 'Personal care and hygiene products')
ON CONFLICT DO NOTHING;