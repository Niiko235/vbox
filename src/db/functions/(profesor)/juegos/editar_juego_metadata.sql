-- =====================================================================
-- FUNCIÓN: editar_juego_metadata
-- Descripción: Actualiza el nombre, descripción y puntuación de un juego.
-- Parámetros:
--   p_idjuego     INT     → ID del juego
--   p_nombre      VARCHAR → nuevo nombre
--   p_descripcion VARCHAR → nueva descripción
--   p_puntuacion  INT     → nueva puntuación
-- Retorna: BOOLEAN
-- =====================================================================

CREATE OR REPLACE FUNCTION editar_juego_metadata(
    p_idjuego     INT,
    p_nombre      VARCHAR,
    p_descripcion VARCHAR,
    p_puntuacion  INT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE public.juego
    SET
        nombre_juego      = p_nombre,
        descripcion_juego = p_descripcion,
        puntuacion_juego  = p_puntuacion
    WHERE pkid_juego = p_idjuego;

    RETURN FOUND;
EXCEPTION WHEN OTHERS THEN
    RETURN FALSE;
END;
$$;

-- SELECT editar_juego_metadata(100, 'Nuevo nombre', 'Nueva descripción', 80);
