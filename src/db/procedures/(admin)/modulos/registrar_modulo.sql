-- registrar un modulo en un curso, retorna el id generado
CREATE OR REPLACE FUNCTION registrar_modulo(
    p_nombre  VARCHAR,
    p_idcurso INT
)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    nuevo_id INT;
BEGIN
    nuevo_id := NEXTVAL('modulo_seq');

    INSERT INTO modulo (pkid_modulo, nombre_modulo, fkidcurso_modulo)
    VALUES (nuevo_id, p_nombre, p_idcurso);

    RETURN nuevo_id;
END;
$$;

-- ejecutar
SELECT registrar_modulo('Módulo 1', 101);
