-- editar el nombre de un modulo
CREATE OR REPLACE FUNCTION editar_modulo(
    p_id     INT,
    p_nombre VARCHAR
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE modulo
    SET nombre_modulo = p_nombre
    WHERE pkid_modulo = p_id;

    RETURN FOUND;
END;
$$;

-- ejecutar
SELECT editar_modulo(1, 'Nuevo nombre');
