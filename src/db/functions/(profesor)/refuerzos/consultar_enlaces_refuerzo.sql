-- =====================================================================
-- FUNCIÓN: consultar_enlaces_refuerzo
-- Descripción: Retorna todos los enlaces asociados a un refuerzo.
-- Parámetros:
--   p_idrefuerzo INT → ID del refuerzo
-- Retorna:
--   idenlace   INT
--   tipo       VARCHAR
--   contenido  TEXT
--   puntuacion INT
-- =====================================================================

CREATE OR REPLACE FUNCTION consultar_enlaces_refuerzo(p_idrefuerzo INT)
RETURNS TABLE (
    idenlace   INT,
    tipo       VARCHAR,
    contenido  TEXT,
    puntuacion INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.pkid_enlace          AS idenlace,
        e.tipo_enlace::VARCHAR AS tipo,
        e.contenido_enlace     AS contenido,
        e.puntuacion_enlace    AS puntuacion
    FROM public.enlace e
    WHERE e.fkidrefuerzo_enlace = p_idrefuerzo
    ORDER BY e.pkid_enlace;
END;
$$;

-- SELECT * FROM consultar_enlaces_refuerzo(1);
