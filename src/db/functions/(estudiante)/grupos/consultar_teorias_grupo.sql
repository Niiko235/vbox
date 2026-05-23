-- Traer todas las teorías del curso al que pertenece el grupo
CREATE OR REPLACE FUNCTION consultar_teorias_grupo(p_idgrupo INT)
RETURNS TABLE (
    idteoria  INT,
    nombre    VARCHAR,
    contenido TEXT,
    orden     INT,
    idmodulo  INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.pkid_teoria       AS idteoria,
        t.nombre_teoria     AS nombre,
        t.contenido_teoria  AS contenido,
        t.orden_teoria      AS orden,
        t.fkidmodulo_teoria AS idmodulo
    FROM public.grupo g
    JOIN public.cursoimpartido ci
        ON  ci.pfkidcurso_cursoimpartido    = g.fkidcursocursoimpartido_grupo
        AND ci.pfkidprofesor_cursoimpartido = g.fkidprofesorcursoimpartido_grupo
    JOIN public.modulo m
        ON  m.fkidcurso_modulo = ci.pfkidcurso_cursoimpartido
    JOIN public.teoria t
        ON  t.fkidmodulo_teoria = m.pkid_modulo
    WHERE g.pkid_grupo = p_idgrupo
    ORDER BY m.pkid_modulo, t.orden_teoria;
END;
$$
LANGUAGE plpgsql;

-- Ejecución
-- SELECT * FROM consultar_teorias_grupo(1000);
