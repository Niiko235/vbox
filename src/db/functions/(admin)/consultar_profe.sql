--traer los profesores registrados en el sistema
CREATE OR REPLACE FUNCTION consultar_profe()
RETURNS TABLE (
	pkcc           BIGINT,
    primernombre   VARCHAR,
    primerapellido VARCHAR,
    rol            tipo_perfil,
    email          VARCHAR
)
AS $$
BEGIN
	RETURN QUERY
	--consulta
	SELECT
        public.perfil.pkcc_perfil        AS pkcc,
        public.perfil.primernombre_perfil AS primernombre,
        public.perfil.primerapellido_perfil AS primerapellido,
        public.perfil.rol                AS rol,
        public.perfil.email_perfil       AS email
    FROM public.perfil
    WHERE public.perfil.rol = 'profesor';
END;
$$
LANGUAGE plpgsql;

--ejecución
SELECT * FROM consultar_profe('profesor');