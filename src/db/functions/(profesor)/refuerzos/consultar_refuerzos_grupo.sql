-- Traer los refuerzos asociados a un grupo
CREATE OR REPLACE FUNCTION consultar_refuerzos_grupo(p_idgrupo INT)
RETURNS TABLE (
    idrefuerzo   INT,
    explicacion  TEXT,
    puntuacion   INT,
    idmodulo     INT,
    nombremodulo VARCHAR
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        r.pkid_refuerzo         AS idrefuerzo,
        r.explicacion_refuerzo  AS explicacion,
        r.puntuacion_refuerzo   AS puntuacion,
        m.pkid_modulo           AS idmodulo,
        m.nombre_modulo         AS nombremodulo
    FROM public.refuerzo r
    JOIN public.modulo m
        ON m.pkid_modulo = r.fkidmodulo_refuerzo
    WHERE r.fkidgrupo_refuerzo = p_idgrupo;
END;
$$
LANGUAGE plpgsql;

-- Ejecución
-- SELECT * FROM consultar_refuerzos_grupo(1000);
