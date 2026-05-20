CREATE OR REPLACE FUNCTION eliminar_teoria(p_id INT)
RETURNS BOOLEAN
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM teoria WHERE pkid_teoria = p_id;
    RETURN FOUND;
END;
$$;

SELECT eliminar_teoria(1);
