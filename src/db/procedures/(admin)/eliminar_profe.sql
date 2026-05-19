--eliminar un profesor registrado en el sistema
CREATE OR REPLACE PROCEDURE eliminar_profesor(
    IN cedula BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
    --eliminar
    DELETE FROM perfil
    WHERE pkcc_perfil = cedula AND rol = 'profesor';
    
END;
$$;

--ejecutar
CALL eliminar_profesor(123456789);