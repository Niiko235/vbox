--traer los profesores registrados en el sistema
CREATE OR REPLACE FUNCTION consultar_profe(profe tipo_perfil)
RETURNS TABLE (
	PrimerNombre VARCHAR,
	Cedula BIGINT
)
AS $$
BEGIN
	RETURN QUERY
	--consulta
	SELECT  public.perfil.primernombre_perfil as PrimerNombre,
		public.perfil.pkcc_perfil as Cedula
	FROM	public.perfil
	WHERE	public.perfil.rol = profe;
END;
$$
LANGUAGE plpgsql;

--ejecución
SELECT * FROM consultar_profe('profesor');