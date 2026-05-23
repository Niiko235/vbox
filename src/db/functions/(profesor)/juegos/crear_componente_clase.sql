-- =====================================================================
-- FUNCIÓN: crear_componente_clase
-- Descripción: Crea un componente de tipo Clase para un juego.
--              La posición inicial es aleatoria dentro de un área
--              razonable para que los nodos no se apilen.
-- Parámetros:
--   p_nombre  VARCHAR → nombre de la clase
--   p_idjuego INT     → ID del juego
-- Retorna:
--   idcomponente INT
--   nombre       VARCHAR
--   x            FLOAT
--   y            FLOAT
-- =====================================================================

CREATE OR REPLACE FUNCTION crear_componente_clase(
    p_nombre  VARCHAR,
    p_idjuego INT
)
RETURNS TABLE (
    idcomponente INT,
    nombre       VARCHAR,
    x            FLOAT,
    y            FLOAT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_id         INT := nextval('componente_seq');
    v_x          FLOAT := (random() * 600 + 50)::FLOAT;
    v_y          FLOAT := (random() * 300 + 50)::FLOAT;
    v_idtipo     INT;
BEGIN
    -- Buscar el tipocomponente 'Clase' del módulo al que pertenece el juego
    SELECT tc.pkid_tipocomponente INTO v_idtipo
    FROM public.tipocomponente tc
    JOIN public.juego j ON tc.fkidmodulo_tipocomponente = j.fkidmodulo_juego
    WHERE j.pkid_juego = p_idjuego
      AND tc.nombre_tipocomponente = 'Clase'
    LIMIT 1;

    IF v_idtipo IS NULL THEN
        RAISE EXCEPTION 'No se encontró tipocomponente Clase para el juego %', p_idjuego;
    END IF;

    INSERT INTO public.componente (
        pkid_componente,
        nombre_componente,
        extra_componente,
        componentepadre_componente,
        retroalimentacion_componente,
        fkidtipocomponente_componente,
        fkidjuego_componente
    ) VALUES (
        v_id,
        p_nombre,
        json_build_object('x', v_x, 'y', v_y),
        NULL,
        NULL,
        v_idtipo,
        p_idjuego
    );

    RETURN QUERY SELECT v_id, p_nombre, v_x, v_y;
END;
$$;

-- SELECT * FROM crear_componente_clase('Producto', 100);
