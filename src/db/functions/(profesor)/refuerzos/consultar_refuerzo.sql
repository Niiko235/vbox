-- =====================================================================
-- FUNCIÓN: consultar_refuerzo
-- Descripción: Retorna los datos de un refuerzo por su ID.
-- Parámetros:
--   p_idrefuerzo INT → ID del refuerzo
-- Retorna:
--   idrefuerzo   INT
--   explicacion  TEXT
--   puntuacion   INT
--   idmodulo     INT
--   nombremodulo VARCHAR
-- =====================================================================

CREATE OR REPLACE FUNCTION consultar_refuerzo(p_idrefuerzo INT)
RETURNS TABLE (
    idrefuerzo   INT,
    explicacion  TEXT,
    puntuacion   INT,
    idmodulo     INT,
    nombremodulo VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        r.pkid_refuerzo        AS idrefuerzo,
        r.explicacion_refuerzo AS explicacion,
        r.puntuacion_refuerzo  AS puntuacion,
        r.fkidmodulo_refuerzo  AS idmodulo,
        m.nombre_modulo        AS nombremodulo
    FROM public.refuerzo r
    JOIN public.modulo m ON m.pkid_modulo = r.fkidmodulo_refuerzo
    WHERE r.pkid_refuerzo = p_idrefuerzo;
END;
$$;

-- SELECT * FROM consultar_refuerzo(1);
