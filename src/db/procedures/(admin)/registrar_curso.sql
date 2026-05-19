--registrar curso

CREATE OR REPLACE PROCEDURE registrar_curso(
	IN codigocurso INT,
    IN descripcion VARCHAR,
    IN nombrecurso VARCHAR,
    IN fechacreacion TIMESTAMP,
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
    		fechacreacion_curso,
    		imagen_curso
	) VALUES (
		codigocurso, descripcion, nombrecurso, fechacreacion, imagen
	);
END;
$$;

--ejecutar
CALL registrar_curso(
	101,
	'Curso de Programación en Python',
	'Programación en Python',
	'2024-01-15',
	'url_de_imagen.jpg'
);