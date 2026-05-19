--registrar curso

CREATE OR REPLACE PROCEDURE registrar_curso(
	IN codigocurso INT,
    IN descripcion VARCHAR,
    IN nombrecurso VARCHAR,
    IN administrador BIGINT,
    IN imagen TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
	--insertar
	INSERT INTO curso (
			pkid_curso,
    		descripcion_curso,
    		nombre_curso,
    		pfkidadministrador_curso,
    		imagen_curso
	) VALUES (
		codigocurso, descripcion, nombrecurso, administrador, imagen
	);
END;
$$;

--ejecutar
CALL registrar_curso(
	10001,
	'Curso de Programación en Python',
	'Programación en Python',
	1001,
	'url_de_imagen.jpg'
);