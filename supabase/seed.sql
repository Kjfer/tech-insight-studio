-- Seed data for DatoDirecto

-- Insert hero slides
INSERT INTO public.hero_slides (title, highlight, description, image_url, order_index) VALUES
('Transformamos Datos en', 'Decisiones Inteligentes', 'Asesoría tecnológica especializada y plantillas profesionales de Excel, Python y Power BI para potenciar tu negocio con soluciones prácticas y efectivas.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop', 1),
('Business Intelligence', '(BI)', 'Implementamos sistemas de análisis y visualización de datos personalizados para potenciar la toma de decisiones estratégicas.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop', 2),
('Desarrollo de Sistemas Web', 'y Web Services', 'Creamos soluciones integrales para el control y gestión del personal, adaptadas a las necesidades operativas de su organización.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop', 3),
('Venta de Plantillas y', 'Reportes Personalizados', 'Ofrecemos plantillas de reporting diseñadas en función de los indicadores y métricas ya establecidas y amoldables para de su empresa, facilitando un análisis eficiente y profesional.', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop', 4);

-- Insert template categories
INSERT INTO public.template_categories (name, icon) VALUES
('Excel', 'FileSpreadsheet'),
('Python', 'Code2'),
('Power BI', 'BarChart3');

-- Get category IDs for reference
DO $$
DECLARE
  excel_id uuid;
  python_id uuid;
  powerbi_id uuid;
BEGIN
  SELECT id INTO excel_id FROM public.template_categories WHERE name = 'Excel';
  SELECT id INTO python_id FROM public.template_categories WHERE name = 'Python';
  SELECT id INTO powerbi_id FROM public.template_categories WHERE name = 'Power BI';

  -- Insert services
  INSERT INTO public.services (title, description, image_url, icon, show_in_home) VALUES
  ('Asesoría en Business Intelligence', 'Diseño e implementación de sistemas de análisis y visualización de datos para optimizar la toma de decisiones estratégicas en tu organización.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', 'BarChart', true),
  ('Plantillas de Excel Profesionales', 'Plantillas avanzadas y personalizadas para análisis financiero, control de inventarios, gestión de proyectos y más, diseñadas para maximizar tu productividad.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', 'FileSpreadsheet', true),
  ('Desarrollo en Python', 'Soluciones automatizadas y scripts personalizados en Python para análisis de datos, web scraping, automatización de procesos y más.', 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop', 'Code', true),
  ('Dashboards en Power BI', 'Creación de dashboards interactivos y reportes dinámicos en Power BI para visualizar y analizar datos de manera efectiva.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', 'BarChart3', true);

  -- Insert templates
  INSERT INTO public.templates (title, description, image_url, category_id, price, is_featured) VALUES
  ('Dashboard Financiero', 'Control financiero completo con KPIs, análisis de flujo de caja y proyecciones', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', excel_id, 49.99, true),
  ('Análisis de Ventas', 'Dashboard interactivo para análisis de ventas, clientes y tendencias de mercado', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', powerbi_id, 79.99, true),
  ('Automatización RPA', 'Scripts para automatización de procesos repetitivos y extracción de datos', 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop', python_id, 99.99, false),
  ('Control de Inventario', 'Sistema completo de gestión de inventario con alertas y reorden automático', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop', excel_id, 39.99, true),
  ('Análisis Predictivo', 'Modelos de machine learning para predicción de ventas y tendencias', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop', python_id, 149.99, false),
  ('Dashboard Ejecutivo', 'Panel ejecutivo con KPIs principales y análisis de desempeño empresarial', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', powerbi_id, 89.99, true);
END $$;

-- Insert keywords
INSERT INTO public.keywords (name) VALUES
('Análisis P&L'),
('Flujo de caja'),
('Gráficos dinámicos'),
('Proyecciones'),
('Métricas de ventas'),
('Segmentación'),
('Análisis temporal'),
('Mapas'),
('Web scraping'),
('Automatización'),
('Procesamiento'),
('Reportes'),
('Stock mínimo'),
('Alertas'),
('Historial'),
('ML models'),
('Predicciones'),
('Visualización'),
('API'),
('KPIs'),
('Tendencias'),
('Benchmarking'),
('Drill-down');

-- Link keywords to templates
DO $$
DECLARE
  template_id uuid;
  keyword_id uuid;
BEGIN
  -- Dashboard Financiero keywords
  SELECT id INTO template_id FROM public.templates WHERE title = 'Dashboard Financiero';
  FOR keyword_id IN SELECT id FROM public.keywords WHERE name IN ('Análisis P&L', 'Flujo de caja', 'Gráficos dinámicos', 'Proyecciones') LOOP
    INSERT INTO public.template_keywords (template_id, keyword_id) VALUES (template_id, keyword_id);
  END LOOP;

  -- Análisis de Ventas keywords
  SELECT id INTO template_id FROM public.templates WHERE title = 'Análisis de Ventas';
  FOR keyword_id IN SELECT id FROM public.keywords WHERE name IN ('Métricas de ventas', 'Segmentación', 'Análisis temporal', 'Mapas') LOOP
    INSERT INTO public.template_keywords (template_id, keyword_id) VALUES (template_id, keyword_id);
  END LOOP;

  -- Automatización RPA keywords
  SELECT id INTO template_id FROM public.templates WHERE title = 'Automatización RPA';
  FOR keyword_id IN SELECT id FROM public.keywords WHERE name IN ('Web scraping', 'Automatización', 'Procesamiento', 'Reportes') LOOP
    INSERT INTO public.template_keywords (template_id, keyword_id) VALUES (template_id, keyword_id);
  END LOOP;

  -- Control de Inventario keywords
  SELECT id INTO template_id FROM public.templates WHERE title = 'Control de Inventario';
  FOR keyword_id IN SELECT id FROM public.keywords WHERE name IN ('Stock mínimo', 'Alertas', 'Historial', 'Reportes') LOOP
    INSERT INTO public.template_keywords (template_id, keyword_id) VALUES (template_id, keyword_id);
  END LOOP;

  -- Análisis Predictivo keywords
  SELECT id INTO template_id FROM public.templates WHERE title = 'Análisis Predictivo';
  FOR keyword_id IN SELECT id FROM public.keywords WHERE name IN ('ML models', 'Predicciones', 'Visualización', 'API') LOOP
    INSERT INTO public.template_keywords (template_id, keyword_id) VALUES (template_id, keyword_id);
  END LOOP;

  -- Dashboard Ejecutivo keywords
  SELECT id INTO template_id FROM public.templates WHERE title = 'Dashboard Ejecutivo';
  FOR keyword_id IN SELECT id FROM public.keywords WHERE name IN ('KPIs', 'Tendencias', 'Benchmarking', 'Drill-down') LOOP
    INSERT INTO public.template_keywords (template_id, keyword_id) VALUES (template_id, keyword_id);
  END LOOP;
END $$;

-- Insert about_us
INSERT INTO public.about_us (mission, vision, history) VALUES
('Nuestra misión es empoderar a las empresas mediante soluciones tecnológicas innovadoras que transformen datos en decisiones estratégicas, facilitando el crecimiento y la eficiencia operativa.',
'Ser la empresa líder en soluciones de Business Intelligence y desarrollo tecnológico en la región, reconocida por nuestra excelencia, innovación y compromiso con el éxito de nuestros clientes.',
'Fundada en 2020, DatoDirecto nació de la visión de democratizar el acceso a herramientas de análisis de datos profesionales. Comenzamos ofreciendo plantillas de Excel personalizadas y hemos crecido hasta convertirnos en un referente en Business Intelligence, desarrollo web y soluciones tecnológicas integrales.');

-- Insert values
INSERT INTO public.values (title, description, icon) VALUES
('Excelencia', 'Nos esforzamos por entregar productos y servicios de la más alta calidad, superando las expectativas de nuestros clientes.', 'Target'),
('Innovación', 'Buscamos constantemente nuevas formas de resolver problemas y mejorar nuestras soluciones tecnológicas.', 'Lightbulb'),
('Integridad', 'Actuamos con honestidad y transparencia en todas nuestras relaciones comerciales.', 'Shield'),
('Compromiso', 'Estamos dedicados al éxito de nuestros clientes y trabajamos incansablemente para alcanzar sus objetivos.', 'Heart');

-- Insert team members
INSERT INTO public.team_members (name, role, description) VALUES
('Juan Pérez', 'CEO & Fundador', 'Experto en Business Intelligence con más de 10 años de experiencia en el sector tecnológico.'),
('María González', 'Directora de Desarrollo', 'Especialista en desarrollo web y automatización de procesos con Python y JavaScript.'),
('Carlos Rodríguez', 'Consultor BI Senior', 'Certificado en Power BI y Tableau, con amplia experiencia en implementación de soluciones de visualización de datos.');

-- Insert sample clients
INSERT INTO public.clients (name, logo_url) VALUES
('Cliente 1', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop'),
('Cliente 2', 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&h=100&fit=crop'),
('Cliente 3', 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&h=100&fit=crop'),
('Cliente 4', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&h=100&fit=crop'),
('Cliente 5', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=100&fit=crop');
