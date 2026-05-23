-- =====================================================================
-- FUNCIÓN: crear_enlace
-- Descripción: Crea un nuevo enlace para un refuerzo.
-- Parámetros:
--   p_tipo       VARCHAR → 'Sitio web' | 'Documento' | 'Video' | 'Otro'
--   p_contenido  TEXT    → URL o contenido del enlace
--   p_puntuacion INT     → puntuación del enlace
--   p_idrefuerzo INT     → ID del refuerzo al que pertenece
-- Retorna:
--   idenlace   INT
--   tipo       VARCHAR
--   contenido  TEXT
--   puntuacion INT
-- =====================================================================

CREATE OR REPLACE FUNCTION crear_enlace(
    p_tipo       VARCHAR,
    p_contenido  TEXT,
    p_puntuacion INT,
    p_idrefuerzo INT
)
RETURNS TABLE (
    idenlace   INT,
    tipo       VARCHAR,
    contenido  TEXT,
    puntuacion INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_id INT := nextval('enlace_seq');
BEGIN
    INSERT INTO public.enlace (
        pkid_enlace,
        tipo_enlace,
        contenido_enlace,
        puntuacion_enlace,
        fkidrefuerzo_enlace
    ) VALUES (
        v_id,
        p_tipo::tipo_enlace,
        p_contenido,
        p_puntuacion,
        p_idrefuerzo
    );

    RETURN QUERY SELECT v_id, p_tipo, p_contenido, p_puntuacion;
END;
$$;

-- SELECT * FROM crear_enlace('Video', 'https://youtube.com/video', 5, 1);
