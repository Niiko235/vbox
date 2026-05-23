-- =====================================================================
-- FUNCIÓN: crear_componente_metodo
-- Descripción: Crea un componente de tipo Metodo vinculado a una clase.
-- Parámetros:
--   p_nombre            VARCHAR → nombre del método (ej: "calcularTotal()")
--   p_visibilidad       VARCHAR → 'private' | 'public' | 'protected'
--   p_tipo              VARCHAR → tipo de retorno (ej: "void", "boolean")
--   p_idclase           INT     → ID del componente clase padre
--   p_retroalimentacion TEXT    → feedback cuando el estudiante se equivoca (opcional)
--   p_idjuego           INT     → ID del juego
-- Retorna:
--   idcomponente        INT
--   nombre              VARCHAR
--   visibilidad         VARCHAR
--   tipo                VARCHAR
--   idclase             INT
-- =====================================================================

CREATE OR REPLACE FUNCTION crear_componente_metodo(
    p_nombre            VARCHAR,
    p_visibilidad       VARCHAR,
    p_tipo              VARCHAR,
    p_idclase           INT,
    p_retroalimentacion TEXT,
    p_idjuego           INT
)
RETURNS TABLE (
    idcomponente  INT,
    nombre        VARCHAR,
    visibilidad   VARCHAR,
    tipo          VARCHAR,
    idclase       INT
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
      AND tc.nombre_tipocomponente = 'Metodo'
    LIMIT 1;

    IF v_idtipo IS NULL THEN
        RAISE EXCEPTION 'No se encontró tipocomponente Metodo para el juego %', p_idjuego;
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
        json_build_object('visibilidad', p_visibilidad, 'tipo', p_tipo),
        p_idclase,
        p_retroalimentacion,
        v_idtipo,
        p_idjuego
    );

    RETURN QUERY SELECT v_id, p_nombre, p_visibilidad, p_tipo, p_idclase;
END;
$$;

-- SELECT * FROM crear_componente_metodo('calcularTotal()', 'public', 'void', 100, null, 100);
