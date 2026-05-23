-- Traer todas las actividades del curso al que pertenece el grupo
CREATE OR REPLACE FUNCTION consultar_actividades_grupo(p_idgrupo INT)
RETURNS TABLE (
    idactividad  INT,
    nombre       VARCHAR,
    url          TEXT,
    disponible   BOOLEAN,
    idteoria     INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        a.pkid_actividad        AS idactividad,
        a.nombre_actividad      AS nombre,
        a.url_actividad         AS url,
        a.disponible_actividad  AS disponible,
        a.fkidteoria_actividad  AS idteoria
    FROM public.grupo g
    JOIN public.cursoimpartido ci
        ON  ci.pfkidcurso_cursoimpartido    = g.fkidcursocursoimpartido_grupo
        AND ci.pfkidprofesor_cursoimpartido = g.fkidprofesorcursoimpartido_grupo
    JOIN public.modulo m
        ON  m.fkidcurso_modulo = ci.pfkidcurso_cursoimpartido
    JOIN public.teoria t
        ON  t.fkidmodulo_teoria = m.pkid_modulo
    JOIN public.actividad a
        ON  a.fkidteoria_actividad = t.pkid_teoria
    WHERE g.pkid_grupo = p_idgrupo;
END;
$$
LANGUAGE plpgsql;

-- Ejecución
-- SELECT * FROM consultar_actividades_grupo(1000);
