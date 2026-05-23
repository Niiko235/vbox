-- =====================================================================
-- FUNCIÓN: eliminar_componente
-- Descripción: Elimina un componente. Si es una Clase, elimina en
--              cascada sus atributos, métodos y todas las relaciones
--              que la involucren.
-- Parámetros:
--   p_idcomponente INT → ID del componente a eliminar
-- Retorna: BOOLEAN
-- =====================================================================

CREATE OR REPLACE FUNCTION eliminar_componente(p_idcomponente INT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
    v_tipo VARCHAR;
BEGIN
    -- Obtener el tipo del componente
    SELECT tc.nombre_tipocomponente INTO v_tipo
    FROM public.componente c
    JOIN public.tipocomponente tc
        ON tc.pkid_tipocomponente = c.fkidtipocomponente_componente
    WHERE c.pkid_componente = p_idcomponente;

    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;

    IF v_tipo = 'Clase' THEN
        -- Eliminar relaciones que involucren esta clase
        DELETE FROM public.componente
        WHERE fkidtipocomponente_componente IN (
            SELECT pkid_tipocomponente
            FROM public.tipocomponente
            WHERE nombre_tipocomponente = 'Relacion'
        )
        AND (
            (extra_componente->>'claseOrigen')::INT  = p_idcomponente
            OR
            (extra_componente->>'claseDestino')::INT = p_idcomponente
        );

        -- Eliminar atributos y métodos hijos
        DELETE FROM public.componente
        WHERE componentepadre_componente = p_idcomponente;
    END IF;

    -- Eliminar el componente en sí
    DELETE FROM public.componente
    WHERE pkid_componente = p_idcomponente;

    RETURN FOUND;
EXCEPTION WHEN OTHERS THEN
    RETURN FALSE;
END;
$$;

-- SELECT eliminar_componente(100);
