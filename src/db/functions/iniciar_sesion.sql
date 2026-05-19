--consultarusuario-inicio

CREATE OR REPLACE FUNCTION iniciar_sesion(email VARCHAR, contrasenia VARCHAR)
RETURNS TABLE (
	primernombre VARCHAR,
	correo VARCHAR,
	rol tipo_perfil,
	id BIGINT
)
AS $$
BEGIN
	RETURN QUERY
	--consulta
	SELECT  public.perfil.primernombre_perfil as primernombre,
		public.perfil.email_perfil as correo,
		public.perfil.rol as rol,
		public.perfil.pkcc_perfil as id
	FROM	public.perfil
	WHERE	public.perfil.email_perfil = email AND
		public.perfil.contrasenia_perfil = contrasenia;
END;
$$
LANGUAGE plpgsql;

--ejecución
SELECT * FROM iniciar_sesion ('caperez@uni.edu','admin123');
