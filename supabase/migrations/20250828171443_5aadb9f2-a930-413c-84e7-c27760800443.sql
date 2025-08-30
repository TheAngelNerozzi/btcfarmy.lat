-- Update get_ico_total function to include pending contributions
CREATE OR REPLACE FUNCTION public.get_ico_total()
 RETURNS numeric
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN COALESCE((
    SELECT SUM(amount_usd) 
    FROM public.ico_contributions 
    WHERE status IN ('confirmed', 'pending')
  ), 0);
END;
$function$;