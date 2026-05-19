--registrar profesor

CREATE OR REPLACE PROCEDURE registrar_profesor(
	IN cedula BIGINT,
	IN primernombre VARCHAR, 
	IN segundonombre VARCHAR, 
	IN primerapellido VARCHAR,
	IN segundoapellido VARCHAR,
	IN rol tipo_perfil,
	IN fechanacimiento TIMESTAMP,
	IN telefono BIGINT,
	IN email VARCHAR,
	IN contrasenia VARCHAR,
	IN codigoprograma INT
)
LANGUAGE plpgsql
AS $$
BEGIN
	--insertar
	INSERT INTO perfil (
		pkcc_perfil,
    		primernombre_perfil,
    		segundonombre_perfil,
    		primerapellido_perfil,
    		segundoapellido_perfil,
    		rol,
    		fechanacimiento_perfil,
    		telefono_perfil,
    		email_perfil,
    		contrasenia_perfil,
    		fkcodigoprograma_perfil
	) VALUES (
		cedula, primernombre, segundonombre, primerapellido, segundoapellido, rol,
        fechanacimiento, telefono, email, contrasenia, codigoprograma
	);
	
END;
$$;

--ejecutar
CALL registrar_profesor(
    123456789,
    'Juan',
    'David',
    'Narvaez',
    'Sepulveda',
    'profesor',
    '2000-05-10',
    311234567,
    'juan@gmail.com',
    '123456',
    103
);
