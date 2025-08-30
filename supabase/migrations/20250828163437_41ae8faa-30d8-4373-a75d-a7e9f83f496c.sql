-- Fix search path security issue for the get_ico_total function
CREATE OR REPLACE FUNCTION public.get_ico_total()
RETURNS DECIMAL 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  RETURN COALESCE((
    SELECT SUM(amount_usd) 
    FROM public.ico_contributions 
    WHERE status = 'confirmed'
  ), 0);
END;
$$;