CREATE OR REPLACE FUNCTION get_profesores()
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
    SELECT
        p.pkcc_perfil        AS pkcc,
        p.primernombre_perfil AS primernombre,
        p.primerapellido_perfil AS primerapellido,
        p.rol                AS rol,
        p.email_perfil       AS email
    FROM public.perfil p
    WHERE p.rol = 'profesor';
END;
$$
LANGUAGE plpgsql;

-- ejecución
SELECT * FROM get_profesores();
