CREATE OR REPLACE FUNCTION consultar_teorias(p_idmodulo INT)
RETURNS TABLE (
    id       INT,
    nombre   VARCHAR,
    contenido TEXT
)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.pkid_teoria   AS id,
        t.nombre_teoria AS nombre,
        t.contenido_teoria AS contenido
    FROM public.teoria t
    WHERE t.fkidmodulo_teoria = p_idmodulo
    ORDER BY t.orden_teoria;
END;
$$;

SELECT * FROM consultar_teorias(1);
