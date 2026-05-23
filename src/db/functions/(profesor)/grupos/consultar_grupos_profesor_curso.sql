-- Traer los grupos que un profesor tiene en un curso específico
CREATE OR REPLACE FUNCTION consultar_grupos_profesor_curso(p_cedula BIGINT, p_idcurso INT)
RETURNS TABLE (
    idgrupo       INT,
    nombregrupo   VARCHAR,
    descripcion   VARCHAR,
    fechacreacion TIMESTAMP
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        g.pkid_grupo            AS idgrupo,
        g.nombre_grupo          AS nombregrupo,
        g.descripcion_grupo     AS descripcion,
        g.fechacreacion_grupo   AS fechacreacion
    FROM public.grupo g
    WHERE g.fkidprofesorcursoimpartido_grupo = p_cedula
      AND g.fkidcursocursoimpartido_grupo    = p_idcurso;
END;
$$
LANGUAGE plpgsql;

-- Ejecución
-- SELECT * FROM consultar_grupos_profesor_curso(987654321, 101);
