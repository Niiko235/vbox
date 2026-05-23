-- Unir a un estudiante a un grupo mediante el código (id) del grupo
-- Retorna los datos del grupo recién unido para mostrarlo en el listado
CREATE OR REPLACE FUNCTION unirse_grupo(p_cedula BIGINT, p_idgrupo INT)
RETURNS TABLE (
    idgrupo       INT,
    nombregrupo   VARCHAR,
    descripcion   VARCHAR,
    fechaingreso  TIMESTAMP,
    nombrecurso   VARCHAR
)
AS $$
BEGIN
    INSERT INTO public.participacion (
        pfkidestudiante_participacion,
        pfkidgrupo_participacion
    ) VALUES (p_cedula, p_idgrupo);

    RETURN QUERY
    SELECT
        g.pkid_grupo                       AS idgrupo,
        g.nombre_grupo                     AS nombregrupo,
        g.descripcion_grupo                AS descripcion,
        p.fecharegistro_participacion      AS fechaingreso,
        c.nombre_curso                     AS nombrecurso
    FROM public.participacion p
    JOIN public.grupo g
        ON  g.pkid_grupo = p.pfkidgrupo_participacion
    JOIN public.cursoimpartido ci
        ON  ci.pfkidcurso_cursoimpartido    = g.fkidcursocursoimpartido_grupo
        AND ci.pfkidprofesor_cursoimpartido = g.fkidprofesorcursoimpartido_grupo
    JOIN public.curso c
        ON  c.pkid_curso = ci.pfkidcurso_cursoimpartido
    WHERE p.pfkidestudiante_participacion = p_cedula
      AND p.pfkidgrupo_participacion      = p_idgrupo;
END;
$$
LANGUAGE plpgsql;

-- Ejecución
-- SELECT * FROM unirse_grupo(123456789, 1);
