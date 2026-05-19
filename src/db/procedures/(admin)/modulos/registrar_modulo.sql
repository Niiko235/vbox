-- registrar un modulo en un curso
CREATE OR REPLACE PROCEDURE registrar_modulo(
    IN p_nombre   VARCHAR,
    IN p_idcurso  INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO modulo (pkid_modulo, nombre_modulo, fkidcurso_modulo)
    VALUES (NEXTVAL('modulo_seq'), p_nombre, p_idcurso);
END;
$$;

-- ejecutar
CALL registrar_modulo('Módulo 1', 101);
