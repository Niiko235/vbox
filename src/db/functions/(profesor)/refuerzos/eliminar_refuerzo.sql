-- Eliminar un refuerzo por su id
CREATE OR REPLACE FUNCTION eliminar_refuerzo(p_idrefuerzo INT)
RETURNS BOOLEAN
AS $$
BEGIN
    DELETE FROM public.enlace
    WHERE fkidrefuerzo_enlace = p_idrefuerzo;

    DELETE FROM public.refuerzo
    WHERE pkid_refuerzo = p_idrefuerzo;

    RETURN FOUND;
EXCEPTION WHEN OTHERS THEN
    RETURN FALSE;
END;
$$
LANGUAGE plpgsql;

-- Ejecución
-- SELECT eliminar_refuerzo(1);
