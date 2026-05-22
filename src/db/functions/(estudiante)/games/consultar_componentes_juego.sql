-- =====================================================================
-- FUNCIÓN: consultar_componentes_juego
-- Descripción: Retorna todos los componentes de un juego (clases,
--              atributos y métodos) junto con su tipo y datos extra.
--              Incluye clase_correcta (componentepadre_componente) que
--              es usado EXCLUSIVAMENTE por el server action de validación.
--              El frontend nunca recibe este campo.
-- Parámetros:
--   p_id_juego  INT  → ID del juego
-- Retorna:
--   id                     INT
--   nombre                 VARCHAR
--   extra                  JSON
--   retroalimentacion      TEXT
--   nombre_tipo_componente VARCHAR → 'Clase' | 'Atributo' | 'Metodo'
--   clase_correcta         INT     → padre correcto (solución); NULL para clases
-- =====================================================================

CREATE OR REPLACE FUNCTION consultar_componentes_juego(p_id_juego INT)
RETURNS TABLE (
    id                     INT,
    nombre                 VARCHAR,
    extra                  JSON,
    retroalimentacion      TEXT,
    nombre_tipo_componente VARCHAR,
    clase_correcta         INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.pkid_componente               AS id,
        c.nombre_componente             AS nombre,
        c.extra_componente              AS extra,
        c.retroalimentacion_componente  AS retroalimentacion,
        tc.nombre_tipocomponente        AS nombre_tipo_componente,
        c.componentepadre_componente    AS clase_correcta
    FROM public.componente c
    JOIN public.tipocomponente tc
        ON tc.pkid_tipocomponente = c.fkidtipocomponente_componente
    WHERE c.fkidjuego_componente = p_id_juego
    ORDER BY tc.nombre_tipocomponente, c.pkid_componente;
END;
$$
LANGUAGE plpgsql;

-- Prueba:
-- SELECT * FROM consultar_componentes_juego(1);
