-- Traer los estudiantes inscritos en un grupo
CREATE OR REPLACE FUNCTION consultar_estudiantes_grupo(p_idgrupo INT)
RETURNS TABLE (
    cedula           BIGINT,
    nombre           TEXT,
    correo           VARCHAR,
    puntuaciontotal  INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        pe.pkcc_perfil AS cedula,
        TRIM(BOTH ' ' FROM
            pe.primernombre_perfil   || ' ' ||
            COALESCE(pe.segundonombre_perfil, '') || ' ' ||
            pe.primerapellido_perfil || ' ' ||
            COALESCE(pe.segundoapellido_perfil, '')
        )                                  AS nombre,
        pe.email_perfil                    AS correo,
        pa.puntuaciontotal_participacion   AS puntuaciontotal
    FROM public.participacion pa
    JOIN public.perfil pe
        ON pe.pkcc_perfil = pa.pfkidestudiante_participacion
    WHERE pa.pfkidgrupo_participacion = p_idgrupo;
END;
$$
LANGUAGE plpgsql;

-- Ejecución
-- SELECT * FROM consultar_estudiantes_grupo(1000);
