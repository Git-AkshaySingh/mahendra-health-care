
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='profiles'
      AND policyname='Admins and staff can view all profiles'
  ) THEN
    CREATE POLICY "Admins and staff can view all profiles"
      ON public.profiles
      FOR SELECT
      TO authenticated
      USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='storage' AND tablename='objects'
      AND policyname='Staff can view all prescriptions'
  ) THEN
    CREATE POLICY "Staff can view all prescriptions"
      ON storage.objects
      FOR SELECT
      TO authenticated
      USING (bucket_id = 'prescriptions' AND (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff')));
  END IF;
END $$;
