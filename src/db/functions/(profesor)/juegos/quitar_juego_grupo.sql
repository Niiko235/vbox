-- =====================================================================
-- FUNCIÓN: quitar_juego_grupo
-- Descripción: Quita la asignación de un juego a un grupo
--              (elimina de juegoelegido). Si el grupo es el creador
--              del juego, usar eliminar_juego en su lugar.
-- Parámetros:
--   p_idjuego INT → ID del juego
--   p_idgrupo INT → ID del grupo
-- Retorna: BOOLEAN
-- =====================================================================

CREATE OR REPLACE FUNCTION quitar_juego_grupo(p_idjuego INT, p_idgrupo INT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM public.juegoelegido
    WHERE pfkidjuego_juegoelegido = p_idjuego
      AND pfkidgrupo_juegoelegido  = p_idgrupo;

    RETURN FOUND;
EXCEPTION WHEN OTHERS THEN
    RETURN FALSE;
END;
$$;

-- SELECT quitar_juego_grupo(1, 1001);
