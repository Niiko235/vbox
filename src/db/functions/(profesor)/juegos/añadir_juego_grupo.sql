-- =====================================================================
-- FUNCIÓN: añadir_juego_grupo
-- Descripción: Asigna un juego existente a un grupo (juegoelegido).
--              Retorna FALSE si ya estaba asignado.
-- Parámetros:
--   p_idjuego INT → ID del juego
--   p_idgrupo INT → ID del grupo
-- Retorna: BOOLEAN
-- =====================================================================

CREATE OR REPLACE FUNCTION añadir_juego_grupo(p_idjuego INT, p_idgrupo INT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    -- Verificar que no esté ya asignado
    IF EXISTS (
        SELECT 1 FROM public.juegoelegido
        WHERE pfkidjuego_juegoelegido = p_idjuego
          AND pfkidgrupo_juegoelegido  = p_idgrupo
    ) THEN
        RETURN FALSE;
    END IF;

    INSERT INTO public.juegoelegido (
        pfkidjuego_juegoelegido,
        pfkidgrupo_juegoelegido
    ) VALUES (
        p_idjuego,
        p_idgrupo
    );

    RETURN TRUE;
EXCEPTION WHEN OTHERS THEN
    RETURN FALSE;
END;
$$;

-- SELECT añadir_juego_grupo(1, 1001);
