-- =====================================================================
-- FUNCIÓN: editar_refuerzo
-- Descripción: Edita la metadata de un refuerzo existente.
-- Parámetros:
--   p_idrefuerzo  INT  → ID del refuerzo
--   p_explicacion TEXT → nueva explicación
--   p_puntuacion  INT  → nueva puntuación
--   p_idmodulo    INT  → nuevo módulo
-- Retorna:
--   BOOLEAN → TRUE si se actualizó, FALSE si no existía o hubo error
-- =====================================================================

CREATE OR REPLACE FUNCTION editar_refuerzo(
    p_idrefuerzo  INT,
    p_explicacion TEXT,
    p_puntuacion  INT,
    p_idmodulo    INT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE public.refuerzo
    SET explicacion_refuerzo = p_explicacion,
        puntuacion_refuerzo  = p_puntuacion,
        fkidmodulo_refuerzo  = p_idmodulo
    WHERE pkid_refuerzo = p_idrefuerzo;

    RETURN FOUND;
EXCEPTION WHEN OTHERS THEN
    RETURN FALSE;
END;
$$;

-- SELECT editar_refuerzo(1, 'Nueva explicación', 15, 2);
