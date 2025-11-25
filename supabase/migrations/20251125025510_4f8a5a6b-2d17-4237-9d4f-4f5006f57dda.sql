-- Create BI Hero table
CREATE TABLE public.bi_hero (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create BI Features table
CREATE TABLE public.bi_features (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create BI Video table
CREATE TABLE public.bi_video (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_url text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create BI FAQs table
CREATE TABLE public.bi_faqs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bi_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bi_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bi_video ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bi_faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for bi_hero
CREATE POLICY "Anyone can view BI hero"
ON public.bi_hero FOR SELECT
USING (true);

CREATE POLICY "Admins can manage BI hero"
ON public.bi_hero FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policies for bi_features
CREATE POLICY "Anyone can view BI features"
ON public.bi_features FOR SELECT
USING (true);

CREATE POLICY "Admins can manage BI features"
ON public.bi_features FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policies for bi_video
CREATE POLICY "Anyone can view BI video"
ON public.bi_video FOR SELECT
USING (true);

CREATE POLICY "Admins can manage BI video"
ON public.bi_video FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policies for bi_faqs
CREATE POLICY "Anyone can view BI FAQs"
ON public.bi_faqs FOR SELECT
USING (true);

CREATE POLICY "Admins can manage BI FAQs"
ON public.bi_faqs FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));