-- Add medicine-specific columns to the products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS salt TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS form TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS strength_value NUMERIC;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS strength_unit TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS pack_size NUMERIC;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS pack_type TEXT;

-- Add index for faster medicine lookups by salt/composition
CREATE INDEX IF NOT EXISTS idx_products_salt ON public.products USING GIN (to_tsvector('english', COALESCE(salt, '')));
CREATE INDEX IF NOT EXISTS idx_products_form ON public.products (form);
