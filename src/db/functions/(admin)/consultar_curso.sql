--traer los cursos registrados en el sistema
CREATE OR REPLACE FUNCTION consultar_curso()
RETURNS TABLE (
    Nombre VARCHAR,
    Id INT,
    FechaCreacion TIMESTAMP
)
AS $$
BEGIN
	RETURN QUERY
	--consulta
	SELECT public.curso.nombre_curso as Nombre,
        public.curso.pkid_curso as Id, 
        public.curso.fechacreacion_curso as FechaCreacion 
    FROM public.curso;
END;
$$
LANGUAGE plpgsql;

--ejecución
SELECT * FROM consultar_curso();