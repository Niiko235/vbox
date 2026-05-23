-- =====================================================================
-- FUNCIÓN: crear_componente_relacion
-- Descripción: Crea un componente de tipo Relacion entre dos clases.
-- Parámetros:
--   p_tipo_relacion     VARCHAR → 'Asociacion'|'Agregacion'|'Composicion'|'Herencia'
--   p_idclase_origen    INT     → ID del componente clase origen
--   p_idclase_destino   INT     → ID del componente clase destino
--   p_retroalimentacion TEXT    → feedback cuando el estudiante no la dibuja (opcional)
--   p_idjuego           INT     → ID del juego
-- Retorna:
--   idcomponente        INT
--   tipo_relacion       VARCHAR
--   idclase_origen      INT
--   idclase_destino     INT
--   retroalimentacion   TEXT
-- =====================================================================

CREATE OR REPLACE FUNCTION crear_componente_relacion(
    p_tipo_relacion     VARCHAR,
    p_idclase_origen    INT,
    p_idclase_destino   INT,
    p_retroalimentacion TEXT,
    p_idjuego           INT
)
RETURNS TABLE (
    idcomponente      INT,
    tipo_relacion     VARCHAR,
    idclase_origen    INT,
    idclase_destino   INT,
    retroalimentacion TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_id     INT := nextval('componente_seq');
    v_idtipo INT;
BEGIN
    SELECT tc.pkid_tipocomponente INTO v_idtipo
    FROM public.tipocomponente tc
    JOIN public.juego j ON tc.fkidmodulo_tipocomponente = j.fkidmodulo_juego
    WHERE j.pkid_juego = p_idjuego
      AND tc.nombre_tipocomponente = 'Relacion'
    LIMIT 1;

    IF v_idtipo IS NULL THEN
        RAISE EXCEPTION 'No se encontró tipocomponente Relacion para el juego %', p_idjuego;
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
        NULL,
        json_build_object(
            'claseOrigen',  p_idclase_origen,
            'claseDestino', p_idclase_destino,
            'tipo',         p_tipo_relacion
        ),
        NULL,
        p_retroalimentacion,
        v_idtipo,
        p_idjuego
    );

    RETURN QUERY SELECT v_id, p_tipo_relacion, p_idclase_origen, p_idclase_destino, p_retroalimentacion;
END;
$$;

-- SELECT * FROM crear_componente_relacion('Agregacion', 100, 101, 'Carrito agrega Productos', 100);
