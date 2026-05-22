-- Traer todos los grupos a los que pertenece un estudiante
CREATE OR REPLACE FUNCTION consultar_grupos_estudiante(p_cedula BIGINT)
RETURNS TABLE (
    idgrupo       INT,
    nombregrupo   VARCHAR,
    descripcion   VARCHAR,
    fechaingreso  TIMESTAMP,
    nombrecurso   VARCHAR
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        g.pkid_grupo                          AS idgrupo,
        g.nombre_grupo                        AS nombregrupo,
        g.descripcion_grupo                   AS descripcion,
        p.fecharegistro_participacion         AS fechaingreso,
        c.nombre_curso                        AS nombrecurso
    FROM public.participacion p
    JOIN public.grupo g  ON g.pkid_grupo   = p.pfkidgrupo_participacion
    JOIN public.curso c  ON c.pkid_curso   = g.fkidcursocursoimpartido_grupo
    WHERE p.pfkidestudiante_participacion = p_cedula;
END;
$$
LANGUAGE plpgsql;

-- Ejecución
SELECT * FROM consultar_grupos_estudiante(123456789);
