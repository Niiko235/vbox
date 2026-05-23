-- =====================================================================
-- FUNCIÓN: consultar_juegos_grupo_profesor
-- Descripción: Retorna todos los juegos asociados a un grupo (via
--              juegoelegido) con un flag que indica si este grupo
--              es el creador (y por tanto puede editar/eliminar).
-- Parámetros:
--   p_idgrupo INT → ID del grupo
-- Retorna:
--   idjuego      INT
--   nombrejuego  VARCHAR
--   descripcion  VARCHAR
--   puntuacion   INT
--   nombremodulo VARCHAR
--   escreador    BOOLEAN
-- =====================================================================

CREATE OR REPLACE FUNCTION consultar_juegos_grupo_profesor(p_idgrupo INT)
RETURNS TABLE (
    idjuego      INT,
    nombrejuego  VARCHAR,
    descripcion  VARCHAR,
    puntuacion   INT,
    nombremodulo VARCHAR,
    escreador    BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        j.pkid_juego            AS idjuego,
        j.nombre_juego          AS nombrejuego,
        j.descripcion_juego     AS descripcion,
        j.puntuacion_juego      AS puntuacion,
        m.nombre_modulo         AS nombremodulo,
        (j.fkidgrupo_juego = p_idgrupo) AS escreador
    FROM public.juegoelegido je
    JOIN public.juego j
        ON j.pkid_juego = je.pfkidjuego_juegoelegido
    JOIN public.modulo m
        ON m.pkid_modulo = j.fkidmodulo_juego
    WHERE je.pfkidgrupo_juegoelegido = p_idgrupo
    ORDER BY escreador DESC, j.nombre_juego;
END;
$$;

-- SELECT * FROM consultar_juegos_grupo_profesor(1000);
