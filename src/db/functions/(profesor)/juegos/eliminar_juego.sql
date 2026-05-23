-- =====================================================================
-- FUNCIÓN: eliminar_juego
-- Descripción: Elimina completamente un juego: historial de ingresos,
--              componentes, asignaciones a grupos y el juego mismo.
--              Solo debe llamarse si el grupo solicitante es el creador
--              (validar en el server action).
-- Parámetros:
--   p_idjuego INT → ID del juego a eliminar
-- Retorna: BOOLEAN
-- =====================================================================

CREATE OR REPLACE FUNCTION eliminar_juego(p_idjuego INT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    -- 1. Eliminar historial de ingresos al juego
    DELETE FROM public.ingresojuego
    WHERE fkidjuegojuegoelegido_ingresojuego = p_idjuego;

    -- 2. Eliminar todos los componentes del juego
    DELETE FROM public.componente
    WHERE fkidjuego_componente = p_idjuego;

    -- 3. Eliminar asignaciones a grupos
    DELETE FROM public.juegoelegido
    WHERE pfkidjuego_juegoelegido = p_idjuego;

    -- 4. Eliminar el juego
    DELETE FROM public.juego
    WHERE pkid_juego = p_idjuego;

    RETURN FOUND;
EXCEPTION WHEN OTHERS THEN
    RETURN FALSE;
END;
$$;

-- SELECT eliminar_juego(100);
