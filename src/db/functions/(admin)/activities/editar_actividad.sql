CREATE OR REPLACE FUNCTION editar_actividad(
    p_id         INT,
    p_nombre     VARCHAR,
    p_url        TEXT,
    p_disponible BOOLEAN
)
RETURNS BOOLEAN
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE actividad
    SET nombre_actividad     = p_nombre,
        url_actividad        = p_url,
        disponible_actividad = p_disponible
    WHERE pkid_actividad = p_id;

    RETURN FOUND;
END;
$$;

SELECT editar_actividad(1, 'Nuevo nombre', 'https://...', true);
