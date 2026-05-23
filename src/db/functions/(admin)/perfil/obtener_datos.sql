--obtener datos del usuario para la ventana perfil
CREATE OR REPLACE FUNCTION obtener_datos(
	IN cedula BIGINT
)
RETURNS TABLE(
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
    codigouniversidad INT,
    nombreuniversidad VARCHAR
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
        pr.fkiduniversidad_programa AS codigouniversidad,
        u.nombre_universidad       AS nombreuniversidad
    FROM public.perfil p
    JOIN public.programa pr ON pr.pkcodigo_programa = p.fkcodigoprograma_perfil
    JOIN public.universidad u ON pr.fkiduniversidad_programa = u.pkcodigoies_universidad
    WHERE p.pkcc_perfil = cedula;
END;
$$
LANGUAGE plpgsql;

--ejecución
SELECT * FROM obtener_datos(1002)