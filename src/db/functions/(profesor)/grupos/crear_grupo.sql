-- Crear un nuevo grupo para un profesor en un curso que imparte
-- El id se autogenera con la secuencia grupo_seq
CREATE OR REPLACE FUNCTION crear_grupo(
    p_nombre      VARCHAR,
    p_descripcion VARCHAR,
    p_cedula      BIGINT,
    p_idcurso     INT
)
RETURNS TABLE (
    idgrupo       INT,
    nombregrupo   VARCHAR,
    descripcion   VARCHAR,
    fechacreacion TIMESTAMP
)
AS $$
DECLARE
    v_idgrupo INT := nextval('grupo_seq');
    v_fecha   TIMESTAMP := NOW();
BEGIN
    INSERT INTO public.grupo (
        pkid_grupo,
        fechacreacion_grupo,
        nombre_grupo,
        descripcion_grupo,
        fkidprofesorcursoimpartido_grupo,
        fkidcursocursoimpartido_grupo
    ) VALUES (
        v_idgrupo,
        v_fecha,
        p_nombre,
        p_descripcion,
        p_cedula,
        p_idcurso
    );

    RETURN QUERY
    SELECT
        v_idgrupo      AS idgrupo,
        p_nombre       AS nombregrupo,
        p_descripcion  AS descripcion,
        v_fecha        AS fechacreacion;
END;
$$
LANGUAGE plpgsql;

-- Ejecución
-- SELECT * FROM crear_grupo('Grupo A', 'Descripción', 987654321, 101);
