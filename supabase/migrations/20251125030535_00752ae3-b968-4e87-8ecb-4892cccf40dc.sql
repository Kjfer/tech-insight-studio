-- Fix RLS policies for BI tables to allow admin inserts
-- Drop existing admin policies
DROP POLICY IF EXISTS "Admins can manage BI hero" ON bi_hero;
DROP POLICY IF EXISTS "Admins can manage BI features" ON bi_features;
DROP POLICY IF EXISTS "Admins can manage BI video" ON bi_video;
DROP POLICY IF EXISTS "Admins can manage BI FAQs" ON bi_faqs;

-- Recreate with proper WITH CHECK clause
CREATE POLICY "Admins can manage BI hero"
ON bi_hero
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage BI features"
ON bi_features
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage BI video"
ON bi_video
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage BI FAQs"
ON bi_faqs
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));