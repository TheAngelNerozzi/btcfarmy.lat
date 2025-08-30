-- Add explicit restrictive SELECT policy to prevent any access to email addresses
-- This ensures no one can read email subscriptions data
CREATE POLICY "Block all email subscription access"
ON public.email_subscriptions
FOR SELECT
TO authenticated, anon
USING (false);

-- This policy explicitly denies all SELECT access to protect email addresses