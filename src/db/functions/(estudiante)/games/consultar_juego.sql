-- =====================================================================
-- FUNCIÓN: consultar_juego
-- Descripción: Retorna la metadata de un juego dado su ID.
-- Parámetros:
--   p_id_juego  INT  → ID del juego a consultar
-- Retorna:
--   id          INT
--   nombre      VARCHAR
--   descripcion VARCHAR
--   puntuacion  INT
-- =====================================================================

CREATE OR REPLACE FUNCTION consultar_juego(p_id_juego INT)
RETURNS TABLE (
    id          INT,
    nombre      VARCHAR,
    descripcion VARCHAR,
    puntuacion  INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        j.pkid_juego        AS id,
        j.nombre_juego      AS nombre,
        j.descripcion_juego AS descripcion,
        j.puntuacion_juego  AS puntuacion
    FROM public.juego j
    WHERE j.pkid_juego = p_id_juego;
END;
$$
LANGUAGE plpgsql;

-- Prueba:
-- SELECT * FROM consultar_juego(1);
