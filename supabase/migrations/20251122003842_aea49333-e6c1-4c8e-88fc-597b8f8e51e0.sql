-- Add price_usd and video_url columns to templates table
ALTER TABLE public.templates 
ADD COLUMN price_usd numeric,
ADD COLUMN video_url text;