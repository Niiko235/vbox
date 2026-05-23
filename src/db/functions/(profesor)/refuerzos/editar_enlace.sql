-- =====================================================================
-- FUNCIÓN: editar_enlace
-- Descripción: Edita un enlace existente.
-- Parámetros:
--   p_idenlace   INT     → ID del enlace
--   p_tipo       VARCHAR → 'Sitio web' | 'Documento' | 'Video' | 'Otro'
--   p_contenido  TEXT    → URL o contenido del enlace
--   p_puntuacion INT     → puntuación del enlace
-- Retorna:
--   BOOLEAN → TRUE si se actualizó, FALSE si no existía o hubo error
-- =====================================================================

CREATE OR REPLACE FUNCTION editar_enlace(
    p_idenlace   INT,
    p_tipo       VARCHAR,
    p_contenido  TEXT,
    p_puntuacion INT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE public.enlace
    SET tipo_enlace       = p_tipo::tipo_enlace,
        contenido_enlace  = p_contenido,
        puntuacion_enlace = p_puntuacion
    WHERE pkid_enlace = p_idenlace;

    RETURN FOUND;
EXCEPTION WHEN OTHERS THEN
    RETURN FALSE;
END;
$$;

-- SELECT editar_enlace(1, 'Documento', 'https://nuevo-doc.pdf', 10);
