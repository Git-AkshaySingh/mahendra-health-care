-- Fix profiles table RLS to prevent PII exposure
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Create private storage bucket for prescriptions
INSERT INTO storage.buckets (id, name, public)
VALUES ('prescriptions', 'prescriptions', false)
ON CONFLICT (id) DO NOTHING;

-- Add RLS policies for prescription uploads
CREATE POLICY "Users can upload own prescriptions"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'prescriptions' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own prescriptions"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'prescriptions' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins can view all prescriptions"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'prescriptions' 
    AND public.has_role(auth.uid(), 'admin')
  );