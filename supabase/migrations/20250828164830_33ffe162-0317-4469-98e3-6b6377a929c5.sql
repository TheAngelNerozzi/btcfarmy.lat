-- Fix RLS to prevent anonymous access to orders with NULL user_id
-- 1) Drop the overly-permissive SELECT policy
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

-- 2) Create a stricter SELECT policy for authenticated users only
CREATE POLICY "Authenticated users can view their own orders"
ON public.orders
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Note: Keep existing INSERT policy as-is to allow guest checkout
-- "Anyone can insert orders" remains unchanged.