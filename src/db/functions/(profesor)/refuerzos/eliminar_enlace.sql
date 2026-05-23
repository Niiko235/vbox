-- =====================================================================
-- FUNCIÓN: eliminar_enlace
-- Descripción: Elimina un enlace y sus registros de ingreso en cascada.
-- Parámetros:
--   p_idenlace INT → ID del enlace a eliminar
-- Retorna:
--   BOOLEAN → TRUE si se eliminó, FALSE si no existía o hubo error
-- =====================================================================

CREATE OR REPLACE FUNCTION eliminar_enlace(p_idenlace INT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    -- Eliminar registros de ingreso al enlace primero (FK)
    DELETE FROM public.ingresoenlace
    WHERE fkidenlace_ingresoenlace = p_idenlace;

    -- Eliminar el enlace
    DELETE FROM public.enlace
    WHERE pkid_enlace = p_idenlace;

    RETURN FOUND;
EXCEPTION WHEN OTHERS THEN
    RETURN FALSE;
END;
$$;

-- SELECT eliminar_enlace(1);
