-- Add staff role to app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'staff';

-- Add stock_quantity column to products if missing
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'products' 
    AND column_name = 'stock_quantity'
  ) THEN
    ALTER TABLE public.products ADD COLUMN stock_quantity INTEGER NOT NULL DEFAULT 0;
  END IF;
END $$;