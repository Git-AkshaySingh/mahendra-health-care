
-- Prescriptions: add title/description, allow update/delete by owner & admin
ALTER TABLE public.prescriptions
  ADD COLUMN IF NOT EXISTS title text NOT NULL DEFAULT 'Prescription',
  ADD COLUMN IF NOT EXISTS description text;

DROP POLICY IF EXISTS "Users update own prescriptions" ON public.prescriptions;
CREATE POLICY "Users update own prescriptions" ON public.prescriptions
  FOR UPDATE TO authenticated
  USING (customer_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (customer_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Users delete own prescriptions" ON public.prescriptions;
CREATE POLICY "Users delete own prescriptions" ON public.prescriptions
  FOR DELETE TO authenticated
  USING (customer_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- Storage: allow owner & admin to delete prescription files
DROP POLICY IF EXISTS "Users delete own prescription files" ON storage.objects;
CREATE POLICY "Users delete own prescription files" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'prescriptions'
    AND (
      (auth.uid())::text = (storage.foldername(name))[1]
      OR public.has_role(auth.uid(),'admin')
    )
  );

-- Profiles: disabled flag + admin can update any profile
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS disabled boolean NOT NULL DEFAULT false;

DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
CREATE POLICY "Admins can update any profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Products: remove qr_code_url
ALTER TABLE public.products DROP COLUMN IF EXISTS qr_code_url;
