-- Fix ICO contributions security by removing access to anonymous contributions
-- Drop the current policy that allows viewing NULL user_id contributions
DROP POLICY IF EXISTS "Users can view their own contributions" ON public.ico_contributions;

-- Create a stricter policy that only allows authenticated users to view their own contributions
CREATE POLICY "Authenticated users can view only their own contributions"
ON public.ico_contributions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- This removes the OR (user_id IS NULL) condition that was exposing anonymous contribution data