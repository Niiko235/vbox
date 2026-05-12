--traer universidad

CREATE OR REPLACE FUNCTION retornar_universidad()
RETURNS TABLE(
	Universidad VARCHAR
)
AS $$
BEGIN
	RETURN QUERY
	--consulta
	SELECT	public.universidad.nombre_universidad as Universidad
	FROM public.universidad
	ORDER BY public.universidad.pkcodigoies_universidad ASC;

END;
$$
LANGUAGE plpgsql;

--llamar
SELECT * FROM retornar_universidad();

--retorno programas

CREATE OR REPLACE FUNCTION retorno_programas(codigo_universidad INT)
RETURNS TABLE (
	Programa VARCHAR
)
AS $$
BEGIN
	RETURN QUERY
	--consulta
	SELECT public.programa.nombre_programa as Programa
	FROM public.programa
	WHERE public.programa.fkiduniversidad_programa = codigo_universidad;
END;
$$
LANGUAGE plpgsql;

--llamar 
SELECT * FROM retorno_programas(2);