-- Trae los juegos de un grupo junto con el mejor puntaje y la última
-- vez que los jugó el estudiante. Parte desde participacion para anclar
-- correctamente ambos lados del ingresojuego.
CREATE OR REPLACE FUNCTION consultar_juegos_grupo_estudiante(
    p_idgrupo  INT,
    p_cedula   BIGINT
)
RETURNS TABLE (
    idjuego      INT,
    nombrejuego  VARCHAR,
    mejorpuntaje INT,
    ultimavez    TIMESTAMP,
    idmodulo     INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        j.pkid_juego                                 AS idjuego,
        j.nombre_juego                               AS nombrejuego,
        MAX(ij.puntuacionobtenida_ingresojuego)::INT AS mejorpuntaje,
        MAX(ij.fecharegistro_ingresojuego)           AS ultimavez,
        j.fkidmodulo_juego                           AS idmodulo
    FROM public.participacion p
    JOIN public.juegoelegido je
        ON  je.pfkidgrupo_juegoelegido = p.pfkidgrupo_participacion
    JOIN public.juego j
        ON  j.pkid_juego = je.pfkidjuego_juegoelegido
    LEFT JOIN public.ingresojuego ij
        -- lado participacion
        ON  ij.fkidestudianteparticipacion_ingresojuego = p.pfkidestudiante_participacion
        AND ij.fkidgrupoparticipacion_ingresojuego      = p.pfkidgrupo_participacion
        -- lado juegoelegido
        AND ij.fkidjuegojuegoelegido_ingresojuego       = je.pfkidjuego_juegoelegido
        AND ij.fkidgrupojuegoelegido_ingresojuego       = je.pfkidgrupo_juegoelegido
    WHERE p.pfkidestudiante_participacion = p_cedula
      AND p.pfkidgrupo_participacion      = p_idgrupo
    GROUP BY j.pkid_juego, j.nombre_juego, j.fkidmodulo_juego
    ORDER BY j.pkid_juego;
END;
$$
LANGUAGE plpgsql;

-- Ejecución de prueba
SELECT * FROM consultar_juegos_grupo_estudiante(1000, 123456789);
