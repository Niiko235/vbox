-- Traer los módulos del curso asociado a un grupo
CREATE OR REPLACE FUNCTION consultar_modulos_grupo(p_idgrupo INT)
RETURNS TABLE (
    idmodulo  INT,
    nombre    VARCHAR
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        m.pkid_modulo   AS idmodulo,
        m.nombre_modulo AS nombre
    FROM public.grupo g
    JOIN public.cursoimpartido ci
        ON  ci.pfkidcurso_cursoimpartido    = g.fkidcursocursoimpartido_grupo
        AND ci.pfkidprofesor_cursoimpartido = g.fkidprofesorcursoimpartido_grupo
    JOIN public.modulo m
        ON  m.fkidcurso_modulo = ci.pfkidcurso_cursoimpartido
    WHERE g.pkid_grupo = p_idgrupo
    ORDER BY m.pkid_modulo;
END;
$$
LANGUAGE plpgsql;

-- Ejecución
-- SELECT * FROM consultar_modulos_grupo(1000);
