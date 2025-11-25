-- Agregar campo de redirección a servicios
ALTER TABLE services ADD COLUMN IF NOT EXISTS redirect_link TEXT;

COMMENT ON COLUMN services.redirect_link IS 'Valores permitidos: portfolio, business-intelligence, null';