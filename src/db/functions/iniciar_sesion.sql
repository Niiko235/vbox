--consultarusuario-inicio

CREATE OR REPLACE FUNCTION iniciar_sesion(email VARCHAR, contrasenia VARCHAR)
RETURNS TABLE (
	PrimerNombre VARCHAR,
	USUARIO VARCHAR,
	ROL tipo_perfil
)
AS $$
BEGIN
	RETURN QUERY
	--consulta
	SELECT  public.perfil.primernombre_perfil as PrimerNombre,
		public.perfil.email_perfil as USUARIO,
		public.perfil.rol as ROL
	FROM	public.perfil
	WHERE	public.perfil.email_perfil = email AND
		public.perfil.contrasenia_perfil = contrasenia;
END;
$$
LANGUAGE plpgsql;

--ejecución
SELECT * FROM iniciar_sesion ('caperez@uni.edu','admin123');
