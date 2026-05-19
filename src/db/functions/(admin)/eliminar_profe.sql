--eliminar un profesor registrado en el sistema
CREATE OR REPLACE FUNCTION eliminar_profesor(
    cedula BIGINT
)
DECLARE
    filas_afectadas BOOLEAN;
LANGUAGE plpgsql
AS $$
BEGIN
    --eliminar
    DELETE FROM perfil
    WHERE pkcc_perfil = cedula AND rol = 'profesor';
    
    GET DIAGNOSTICS filas_afectadas = ROWCOUNT;

    RETURN filas_afectadas > 0;
END;
$$;


-- esta funcion se puede mejorar, que cuando no se hayan encontrados registros eliminados, se pueda mostrar un mensaje indicando que no se encontró el profesor con la cédula proporcionada. Esto se puede lograr utilizando RAISE NOTICE o RAISE EXCEPTION para proporcionar retroalimentación al usuario.

--ejecutar
CALL eliminar_profesor(123456789);