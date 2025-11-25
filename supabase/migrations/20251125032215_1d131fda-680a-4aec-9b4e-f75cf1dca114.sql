-- Eliminar la columna category de bi_features ya que no se utiliza
ALTER TABLE bi_features DROP COLUMN IF EXISTS category;