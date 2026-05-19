--eliminar un curso registrado en el sistema
CREATE OR REPLACE FUNCTION eliminar_curso(
    id INT
)
RETURNS BOOLEAN
AS $$ 
DECLARE
    filas_afectadas INT;
BEGIN
    --eliminar
    DELETE FROM curso
    WHERE pkid_curso = id; 
    
    GET DIAGNOSTICS filas_afectadas = ROW_COUNT;

    RETURN filas_afectadas > 0;
END;
$$ LANGUAGE plpgsql;


-- esta funcion se puede mejorar, que cuando no se hayan encontrados registros eliminados, se pueda mostrar un mensaje indicando que no se encontró el profesor con la cédula proporcionada. Esto se puede lograr utilizando RAISE NOTICE o RAISE EXCEPTION para proporcionar retroalimentación al usuario.

--ejecutar
CALL eliminar_profesor(1000);