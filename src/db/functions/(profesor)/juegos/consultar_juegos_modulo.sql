-- =====================================================================
-- FUNCIÓN: consultar_juegos_modulo
-- Descripción: Retorna todos los juegos de un módulo, con un flag
--              que indica si el grupo dado ya los tiene asignados.
--              Útil para la vista "Añadir juego existente".
-- Parámetros:
--   p_idmodulo INT → ID del módulo
--   p_idgrupo  INT → ID del grupo que está consultando
-- Retorna:
--   idjuego     INT
--   nombrejuego VARCHAR
--   descripcion VARCHAR
--   puntuacion  INT
--   yaasignado  BOOLEAN
-- =====================================================================

CREATE OR REPLACE FUNCTION consultar_juegos_modulo(p_idmodulo INT, p_idgrupo INT)
RETURNS TABLE (
    idjuego     INT,
    nombrejuego VARCHAR,
    descripcion VARCHAR,
    puntuacion  INT,
    yaasignado  BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        j.pkid_juego        AS idjuego,
        j.nombre_juego      AS nombrejuego,
        j.descripcion_juego AS descripcion,
        j.puntuacion_juego  AS puntuacion,
        EXISTS (
            SELECT 1 FROM public.juegoelegido je
            WHERE je.pfkidjuego_juegoelegido  = j.pkid_juego
              AND je.pfkidgrupo_juegoelegido   = p_idgrupo
        )                   AS yaasignado
    FROM public.juego j
    WHERE j.fkidmodulo_juego = p_idmodulo
    ORDER BY j.nombre_juego;
END;
$$;

-- SELECT * FROM consultar_juegos_modulo(3, 1000);
