-- Traer los datos básicos de un grupo por su id
CREATE OR REPLACE FUNCTION consultar_grupo_por_id(p_idgrupo INT)
RETURNS TABLE (
    idgrupo       INT,
    nombregrupo   VARCHAR,
    descripcion   VARCHAR,
    fechacreacion TIMESTAMP,
    idcurso       INT,
    nombrecurso   VARCHAR
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        g.pkid_grupo                       AS idgrupo,
        g.nombre_grupo                     AS nombregrupo,
        g.descripcion_grupo                AS descripcion,
        g.fechacreacion_grupo              AS fechacreacion,
        c.pkid_curso                       AS idcurso,
        c.nombre_curso                     AS nombrecurso
    FROM public.grupo g
    JOIN public.cursoimpartido ci
        ON  ci.pfkidcurso_cursoimpartido    = g.fkidcursocursoimpartido_grupo
        AND ci.pfkidprofesor_cursoimpartido = g.fkidprofesorcursoimpartido_grupo
    JOIN public.curso c
        ON  c.pkid_curso = ci.pfkidcurso_cursoimpartido
    WHERE g.pkid_grupo = p_idgrupo;
END;
$$
LANGUAGE plpgsql;

-- Ejecución
-- SELECT * FROM consultar_grupo_por_id(1000);
