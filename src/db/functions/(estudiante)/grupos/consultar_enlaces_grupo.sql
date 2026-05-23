-- Traer todos los enlaces de los refuerzos asignados a un grupo
CREATE OR REPLACE FUNCTION consultar_enlaces_grupo(p_idgrupo INT)
RETURNS TABLE (
    idenlace    INT,
    tipo        VARCHAR,
    contenido   TEXT,
    puntuacion  INT,
    idrefuerzo  INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.pkid_enlace          AS idenlace,
        e.tipo_enlace::VARCHAR AS tipo,
        e.contenido_enlace     AS contenido,
        e.puntuacion_enlace    AS puntuacion,
        e.fkidrefuerzo_enlace  AS idrefuerzo
    FROM public.refuerzo r
    JOIN public.enlace e
        ON  e.fkidrefuerzo_enlace = r.pkid_refuerzo
    WHERE r.fkidgrupo_refuerzo = p_idgrupo;
END;
$$
LANGUAGE plpgsql;

-- Ejecución
-- SELECT * FROM consultar_enlaces_grupo(1000);
