--eliminar un profesor registrado en el sistema
CREATE OR REPLACE FUNCTION eliminar_profesor(
    cedula BIGINT
)
RETURNS BOOLEAN
AS $$
BEGIN
    --eliminar
    DELETE FROM perfil
    WHERE pkcc_perfil = cedula AND rol = 'profesor';

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;


-- esta funcion se puede mejorar, que cuando no se hayan encontrados registros eliminados, se pueda mostrar un mensaje indicando que no se encontró el profesor con la cédula proporcionada. Esto se puede lograr utilizando RAISE NOTICE o RAISE EXCEPTION para proporcionar retroalimentación al usuario.

--ejecutar
CALL eliminar_profesor(123456789);