--editar nombre y descripcion de un curso
CREATE OR REPLACE FUNCTION editar_curso(
    p_id INT,
    p_nombre VARCHAR,
    p_descripcion VARCHAR
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE curso
    SET nombre_curso = p_nombre,
        descripcion_curso = p_descripcion
    WHERE pkid_curso = p_id;

    RETURN FOUND;
END;
$$;

--ejecutar
SELECT editar_curso(101, 'Nuevo Nombre', 'Nueva descripción');
