CREATE OR REPLACE FUNCTION registrar_actividad(
    p_nombre     VARCHAR,
    p_url        TEXT,
    p_disponible BOOLEAN,
    p_idteoría   INT
)
RETURNS INT
LANGUAGE plpgsql AS $$
DECLARE
    nuevo_id INT;
BEGIN
    nuevo_id := NEXTVAL('actividad_seq');

    INSERT INTO actividad (pkid_actividad, nombre_actividad, url_actividad, disponible_actividad, fkidteoria_actividad)
    VALUES (nuevo_id, p_nombre, p_url, p_disponible, p_idteoría);

    RETURN nuevo_id;
END;
$$;

SELECT registrar_actividad('Actividad 1', 'https://...', false, 1);
