-- =====================================================================
-- FUNCIÓN: editar_profesor
-- Descripción: Actualiza los datos de un profesor dado su cédula.
--              La cédula (pkcc) no se puede modificar.
-- Parámetros:
--   p_cedula          BIGINT
--   p_primernombre    VARCHAR
--   p_segundonombre   VARCHAR  (nullable)
--   p_primerapellido  VARCHAR
--   p_segundoapellido VARCHAR  (nullable)
--   p_fechanacimiento TIMESTAMP
--   p_telefono        BIGINT
--   p_email           VARCHAR
--   p_contrasenia     VARCHAR  (nullable — NULL conserva la contraseña actual)
--   p_codigoprograma  INT
-- Retorna: BOOLEAN → TRUE si se actualizó, FALSE si no existe
-- =====================================================================

CREATE OR REPLACE FUNCTION editar_profesor(
    p_cedula          BIGINT,
    p_primernombre    VARCHAR,
    p_segundonombre   VARCHAR,
    p_primerapellido  VARCHAR,
    p_segundoapellido VARCHAR,
    p_fechanacimiento TIMESTAMP,
    p_telefono        BIGINT,
    p_email           VARCHAR,
    p_contrasenia     VARCHAR,
    p_codigoprograma  INT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE public.perfil SET
        primernombre_perfil    = p_primernombre,
        segundonombre_perfil   = p_segundonombre,
        primerapellido_perfil  = p_primerapellido,
        segundoapellido_perfil = p_segundoapellido,
        fechanacimiento_perfil = p_fechanacimiento,
        telefono_perfil        = p_telefono,
        email_perfil           = p_email,
        contrasenia_perfil     = COALESCE(p_contrasenia, contrasenia_perfil),
        fkcodigoprograma_perfil = p_codigoprograma
    WHERE pkcc_perfil = p_cedula
      AND rol = 'profesor';

    RETURN FOUND;
END;
$$;

-- Prueba:
-- SELECT editar_profesor(123456789, 'Juan', 'David', 'Narvaez', 'Sepulveda',
--   '2000-05-10', 311234567, 'juan@gmail.com', '123456', 103);
