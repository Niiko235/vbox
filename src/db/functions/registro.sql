-- Retorna todas las universidades con su ID y nombre
CREATE OR REPLACE FUNCTION retornar_universidad()
RETURNS TABLE(
	id          INT,
	nombre      VARCHAR
)
AS $$
BEGIN
	RETURN QUERY
	SELECT
		u.pkcodigoies_universidad AS id,
		u.nombre_universidad      AS nombre
	FROM public.universidad u
	ORDER BY u.pkcodigoies_universidad ASC;
END;
$$
LANGUAGE plpgsql;

-- llamar
SELECT * FROM retornar_universidad();

-- Retorna todos los programas con su ID, nombre e ID de universidad
CREATE OR REPLACE FUNCTION retornar_programas()
RETURNS TABLE (
	id             INT,
	nombre         VARCHAR,
	id_universidad INT
)
AS $$
BEGIN
	RETURN QUERY
	SELECT
		p.pkcodigo_programa          AS id,
		p.nombre_programa            AS nombre,
		p.fkiduniversidad_programa   AS id_universidad
	FROM public.programa p
	ORDER BY p.pkcodigo_programa ASC;
END;
$$
LANGUAGE plpgsql;

-- llamar
SELECT * FROM retornar_programas();