CREATE OR REPLACE FUNCTION editar_teoria(
    p_id        INT,
    p_nombre    VARCHAR,
    p_contenido TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE teoria
    SET nombre_teoria   = p_nombre,
        contenido_teoria = p_contenido
    WHERE pkid_teoria = p_id;

    RETURN FOUND;
END;
$$;

SELECT editar_teoria(1, 'Nuevo nombre', 'Nuevo contenido');
