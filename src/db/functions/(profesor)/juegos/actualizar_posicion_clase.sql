-- =====================================================================
-- FUNCIÓN: actualizar_posicion_clase
-- Descripción: Actualiza las coordenadas {x, y} en extra_componente
--              cuando el profesor arrastra un nodo en el canvas.
-- Parámetros:
--   p_idcomponente INT   → ID del componente clase
--   p_x            FLOAT → nueva posición x
--   p_y            FLOAT → nueva posición y
-- Retorna: BOOLEAN
-- =====================================================================

CREATE OR REPLACE FUNCTION actualizar_posicion_clase(
    p_idcomponente INT,
    p_x            FLOAT,
    p_y            FLOAT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE public.componente
    SET extra_componente = json_build_object('x', p_x, 'y', p_y)
    WHERE pkid_componente = p_idcomponente;

    RETURN FOUND;
EXCEPTION WHEN OTHERS THEN
    RETURN FALSE;
END;
$$;

-- SELECT actualizar_posicion_clase(100, 250.0, 180.0);
