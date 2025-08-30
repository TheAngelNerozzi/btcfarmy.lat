-- Enable realtime for ico_contributions table
ALTER TABLE public.ico_contributions REPLICA IDENTITY FULL;

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.ico_contributions;