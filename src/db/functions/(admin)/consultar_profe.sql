-- Traer todos los datos de los profesores registrados en el sistema
CREATE OR REPLACE FUNCTION consultar_profe()
RETURNS TABLE (
    pkcc              BIGINT,
    primernombre      VARCHAR,
    segundonombre     VARCHAR,
    primerapellido    VARCHAR,
    segundoapellido   VARCHAR,
    rol               tipo_perfil,
    fechanacimiento   TIMESTAMP,
    telefono          BIGINT,
    email             VARCHAR,
    codigoprograma    INT,
    nombreprograma    VARCHAR,
    codigouniversidad INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.pkcc_perfil              AS pkcc,
        p.primernombre_perfil      AS primernombre,
        p.segundonombre_perfil     AS segundonombre,
        p.primerapellido_perfil    AS primerapellido,
        p.segundoapellido_perfil   AS segundoapellido,
        p.rol                      AS rol,
        p.fechanacimiento_perfil   AS fechanacimiento,
        p.telefono_perfil          AS telefono,
        p.email_perfil             AS email,
        pr.pkcodigo_programa       AS codigoprograma,
        pr.nombre_programa         AS nombreprograma,
        pr.fkiduniversidad_programa AS codigouniversidad
    FROM public.perfil p
    JOIN public.programa pr ON pr.pkcodigo_programa = p.fkcodigoprograma_perfil
    WHERE p.rol = 'profesor';
END;
$$
LANGUAGE plpgsql;

-- Ejecución
SELECT * FROM consultar_profe();
