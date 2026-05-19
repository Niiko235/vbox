--traer los cursos registrados en el sistema
CREATE OR REPLACE FUNCTION consultar_curso()
RETURNS TABLE (
    id            INT,
    nombre        VARCHAR,
    descripcion   VARCHAR,
    fechacreacion TIMESTAMP
)
AS $$
BEGIN
	RETURN QUERY
	--consulta
	SELECT
        public.curso.pkid_curso as id,
        public.curso.nombre_curso as nombre,
        public.curso.descripcion_curso as descripcion,
        public.curso.fechacreacion_curso as fechacreacion
    FROM public.curso;
END;
$$
LANGUAGE plpgsql;

--ejecución
SELECT * FROM consultar_curso();