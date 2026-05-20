CREATE OR REPLACE FUNCTION consultar_actividades(p_idteoría INT)
RETURNS TABLE (
    id          INT,
    nombre      VARCHAR,
    url         TEXT,
    disponible  BOOLEAN
)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT
        a.pkid_actividad        AS id,
        a.nombre_actividad      AS nombre,
        a.url_actividad         AS url,
        a.disponible_actividad  AS disponible
    FROM public.actividad a
    WHERE a.fkidteoria_actividad = p_idteoría;
END;
$$;

SELECT * FROM consultar_actividades(1);
