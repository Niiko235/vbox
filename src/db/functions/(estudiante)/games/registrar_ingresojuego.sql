-- =====================================================================
-- FUNCIÓN: registrar_ingresojuego
-- Descripción: Registra el resultado de un intento de juego por parte
--              de un estudiante. Retorna el ID generado.
-- Parámetros:
--   p_id_estudiante BIGINT → CC del estudiante
--   p_id_grupo      INT    → ID del grupo
--   p_id_juego      INT    → ID del juego
--   p_puntaje       INT    → Puntaje obtenido tras la validación
-- =====================================================================

CREATE OR REPLACE FUNCTION registrar_ingresojuego(
    p_id_estudiante BIGINT,
    p_id_grupo      INT,
    p_id_juego      INT,
    p_puntaje       INT
)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    nuevo_id INT;
BEGIN
    nuevo_id := NEXTVAL('ingresojuego_seq');

    INSERT INTO public.ingresojuego (
        pkid_ingresojuego,
        puntuacionobtenida_ingresojuego,
        fkidestudianteparticipacion_ingresojuego,
        fkidgrupoparticipacion_ingresojuego,
        fkidjuegojuegoelegido_ingresojuego,
        fkidgrupojuegoelegido_ingresojuego
    ) VALUES (
        nuevo_id,
        p_puntaje,
        p_id_estudiante,
        p_id_grupo,
        p_id_juego,
        p_id_grupo
    );

    RETURN nuevo_id;
END;
$$;

-- Prueba:
-- SELECT registrar_ingresojuego(123456, 1, 1, 45);
