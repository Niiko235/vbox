-- traer los modulos de un curso
CREATE OR REPLACE FUNCTION consultar_modulos(p_idcurso INT)
RETURNS TABLE (
    id     INT,
    nombre VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        public.modulo.pkid_modulo AS id,
        public.modulo.nombre_modulo AS nombre
    FROM public.modulo
    WHERE public.modulo.fkidcurso_modulo = p_idcurso;
END;
$$;

-- ejecutar
SELECT * FROM consultar_modulos(101);
