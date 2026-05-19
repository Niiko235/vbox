CREATE OR REPLACE FUNCTION get_cursos()
RETURNS TABLE (
    pkid            INT,
    nombre          VARCHAR,
    fechacreacion   TIMESTAMP
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.pkid_curso           AS pkid,
        c.nombre_curso         AS nombre,
        c.fechacreacion_curso  AS fechacreacion
    FROM public.curso c;
END;
$$
LANGUAGE plpgsql;

-- ejecución
SELECT * FROM get_cursos();
