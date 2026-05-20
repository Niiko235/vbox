CREATE OR REPLACE FUNCTION eliminar_actividad(p_id INT)
RETURNS BOOLEAN
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM actividad WHERE pkid_actividad = p_id;
    RETURN FOUND;
END;
$$;

SELECT eliminar_actividad(1);
