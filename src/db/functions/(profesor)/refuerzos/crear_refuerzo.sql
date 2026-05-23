-- Crea un nuevo refuerzo para un grupo en un módulo del curso
CREATE OR REPLACE FUNCTION crear_refuerzo(
    p_explicacion TEXT,
    p_puntuacion  INT,
    p_idmodulo    INT,
    p_idgrupo     INT
)
RETURNS BOOLEAN
AS $$
DECLARE
    v_idrefuerzo INT := nextval('refuerzo_seq');
BEGIN
    INSERT INTO public.refuerzo (
        pkid_refuerzo,
        explicacion_refuerzo,
        puntuacion_refuerzo,
        fkidmodulo_refuerzo,
        fkidgrupo_refuerzo
    ) VALUES (
        v_idrefuerzo,
        p_explicacion,
        p_puntuacion,
        p_idmodulo,
        p_idgrupo
    );

    RETURN FOUND;
EXCEPTION WHEN OTHERS THEN
    RETURN FALSE;
END;
$$
LANGUAGE plpgsql;

-- Ejecución
-- SELECT crear_refuerzo('Explicación de prueba', 10, 1, 1000);
