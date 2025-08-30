-- Fix email subscriptions security by removing public SELECT access
-- Drop the overly permissive SELECT policy that allows anyone to view email addresses
DROP POLICY IF EXISTS "Anyone can view subscriptions" ON public.email_subscriptions;

-- Keep the INSERT policy as-is since users need to subscribe
-- If admin access is needed later, create a specific policy with role-based access control

-- Note: This completely removes SELECT access since the application doesn't need to read
-- from this table - it only inserts new subscriptions