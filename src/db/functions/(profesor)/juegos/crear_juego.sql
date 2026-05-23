-- =====================================================================
-- FUNCIÓN: crear_juego
-- Descripción: Crea un juego y lo asigna automáticamente al grupo
--              creador en juegoelegido.
-- Parámetros:
--   p_nombre      VARCHAR → nombre del juego
--   p_descripcion VARCHAR → descripción
--   p_puntuacion  INT     → puntuación máxima
--   p_idmodulo    INT     → módulo al que pertenece
--   p_idgrupo     INT     → grupo creador
-- Retorna:
--   idjuego       INT
--   nombrejuego   VARCHAR
--   descripcion   VARCHAR
--   puntuacion    INT
--   idmodulo      INT
--   nombremodulo  VARCHAR
-- =====================================================================

CREATE OR REPLACE FUNCTION crear_juego(
    p_nombre      VARCHAR,
    p_descripcion VARCHAR,
    p_puntuacion  INT,
    p_idmodulo    INT,
    p_idgrupo     INT
)
RETURNS TABLE (
    idjuego      INT,
    nombrejuego  VARCHAR,
    descripcion  VARCHAR,
    puntuacion   INT,
    idmodulo     INT,
    nombremodulo VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_idjuego INT := nextval('juego_seq');
BEGIN
    INSERT INTO public.juego (
        pkid_juego,
        nombre_juego,
        descripcion_juego,
        puntuacion_juego,
        fkidmodulo_juego,
        fkidgrupo_juego
    ) VALUES (
        v_idjuego,
        p_nombre,
        p_descripcion,
        p_puntuacion,
        p_idmodulo,
        p_idgrupo
    );

    -- Asignar automáticamente al grupo creador
    INSERT INTO public.juegoelegido (
        pfkidjuego_juegoelegido,
        pfkidgrupo_juegoelegido
    ) VALUES (
        v_idjuego,
        p_idgrupo
    );

    RETURN QUERY
    SELECT
        v_idjuego           AS idjuego,
        p_nombre            AS nombrejuego,
        p_descripcion       AS descripcion,
        p_puntuacion        AS puntuacion,
        m.pkid_modulo       AS idmodulo,
        m.nombre_modulo     AS nombremodulo
    FROM public.modulo m
    WHERE m.pkid_modulo = p_idmodulo;
END;
$$;

-- SELECT * FROM crear_juego('Juego UML', 'Diagrama de clases', 100, 3, 1000);
