-- eliminar un modulo
CREATE OR REPLACE FUNCTION eliminar_modulo(p_id INT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM modulo WHERE pkid_modulo = p_id;
    RETURN FOUND;
END;
$$;

-- ejecutar
SELECT eliminar_modulo(1);
