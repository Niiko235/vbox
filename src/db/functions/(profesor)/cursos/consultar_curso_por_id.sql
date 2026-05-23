-- Traer los datos de un curso por su id
CREATE OR REPLACE FUNCTION consultar_curso_por_id(p_idcurso INT)
RETURNS TABLE (
    idcurso       INT,
    nombrecurso   VARCHAR,
    descripcion   VARCHAR,
    imagen        TEXT,
    fechacreacion TIMESTAMP
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.pkid_curso          AS idcurso,
        c.nombre_curso        AS nombrecurso,
        c.descripcion_curso   AS descripcion,
        c.imagen_curso        AS imagen,
        c.fechacreacion_curso AS fechacreacion
    FROM public.curso c
    WHERE c.pkid_curso = p_idcurso;
END;
$$
LANGUAGE plpgsql;

-- Ejecución
-- SELECT * FROM consultar_curso_por_id(101);
