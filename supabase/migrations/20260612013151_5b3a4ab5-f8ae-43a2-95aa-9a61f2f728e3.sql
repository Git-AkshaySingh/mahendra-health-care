
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS deletion_requested_at timestamptz;

-- Allow users to update their own profile (covers deletion_requested_at).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'profiles'
      AND policyname = 'Users can update their own profile'
  ) THEN
    CREATE POLICY "Users can update their own profile"
      ON public.profiles
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Admin-only purge function: deletes auth users (cascades) whose deletion was requested 14+ days ago.
CREATE OR REPLACE FUNCTION public.purge_deleted_accounts()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  victim record;
  cnt integer := 0;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can purge accounts';
  END IF;

  FOR victim IN
    SELECT id FROM public.profiles
    WHERE deletion_requested_at IS NOT NULL
      AND deletion_requested_at < now() - interval '14 days'
  LOOP
    DELETE FROM auth.users WHERE id = victim.id;
    cnt := cnt + 1;
  END LOOP;
  RETURN cnt;
END;
$$;

REVOKE ALL ON FUNCTION public.purge_deleted_accounts() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.purge_deleted_accounts() TO authenticated, service_role;
