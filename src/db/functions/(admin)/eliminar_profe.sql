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

--ejecutar
CALL eliminar_profesor(123456789);