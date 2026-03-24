-- Seed data for new tables

-- Insert Clients
INSERT INTO clients (name, sort_order, is_visible) VALUES
  ('Take Back The Mic', 1, true),
  ('Mastercard', 2, true),
  ('Route to Zero', 3, true),
  ('HashIT', 4, true),
  ('Kavlr', 5, true),
  ('Syntech', 6, true),
  ('EasyJet', 7, true),
  ('Access Bank', 8, true),
  ('Sparkle', 9, true),
  ('Polo Luxury', 10, true),
  ('Tryba', 11, true),
  ('Vulta', 12, true);

-- Insert Countries
INSERT INTO countries (name, sort_order) VALUES
  ('Nigeria', 1),
  ('United Kingdom', 2),
  ('Dubai', 3),
  ('Ghana', 4),
  ('Kenya', 5),
  ('South Africa', 6),
  ('Egypt', 7),
  ('Uganda', 8),
  ('Rwanda', 9),
  ('Tanzania', 10),
  ('United States', 11),
  ('Canada', 12),
  ('India', 13),
  ('Singapore', 14),
  ('Australia', 15);

-- Insert Stats
INSERT INTO stats (value, label, sort_order) VALUES
  ('1.1B', 'Impressions', 1),
  ('50+', 'Countries', 2),
  ('12+', 'Years', 3),
  ('200+', 'Projects', 4);

-- Insert Credentials
INSERT INTO credentials (title, description, sort_order) VALUES
  ('Webby Award Nomination', '2023 for TBTM Interactive Festival', 1),
  ('Mastercard Partnership', 'Digital card product design', 2),
  ('1.1 Billion Impressions', 'Across fifty countries', 3),
  ('Government-Level Work', 'Westminster engagement on net zero policy', 4),
  ('Chartered Designer', 'Member, Chartered Society of Designers', 5),
  ('MA Graphic Design', 'Distinction, University of Hertfordshire', 6);

-- Insert Products
INSERT INTO products (name, description, sort_order) VALUES
  ('Art Director Studio', 'Platform for creative direction work, bridging the gap between concept and execution. Tools for art directors and creative teams to collaborate on brand direction and visual systems.', 1),
  ('Draw in the Air', 'Gesture-based learning platform for children. Combining gesture recognition with interactive design to make learning intuitive and engaging.', 2);

-- Insert Style Settings (optional design tokens or configuration)
INSERT INTO style_settings (key, value) VALUES
  ('brand_color_primary', '#000000'),
  ('brand_color_accent', '#666666'),
  ('font_family_serif', 'Georgia, serif'),
  ('font_family_sans', 'Inter, sans-serif');
