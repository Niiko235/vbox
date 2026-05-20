CREATE OR REPLACE FUNCTION registrar_teoria(
    p_nombre   VARCHAR,
    p_contenido TEXT,
    p_idmodulo INT
)
RETURNS INT
LANGUAGE plpgsql AS $$
DECLARE
    nuevo_id INT;
BEGIN
    nuevo_id := NEXTVAL('teoria_seq');

    INSERT INTO teoria (pkid_teoria, nombre_teoria, contenido_teoria, fkidmodulo_teoria)
    VALUES (nuevo_id, p_nombre, p_contenido, p_idmodulo);

    RETURN nuevo_id;
END;
$$;

SELECT registrar_teoria('Introducción', 'Contenido inicial...', 1);
