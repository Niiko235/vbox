-- ============================================================
-- 1. auditoria.aud_universidad
-- ============================================================

--insert
CREATE TRIGGER tr_universidad_insert
BEFORE INSERT ON public.universidad
FOR EACH ROW
EXECUTE FUNCTION func_universidad_insert();

--update
CREATE TRIGGER tr_universidad_update
BEFORE UPDATE ON public.universidad
FOR EACH ROW
EXECUTE FUNCTION func_universidad_update();

--delete
CREATE TRIGGER tr_universidad_delete
BEFORE DELETE ON public.universidad
FOR EACH ROW
EXECUTE FUNCTION func_universidad_delete();

-- ============================================================
-- 2. auditoria.aud_programa
-- ============================================================

--insert 
CREATE TRIGGER tr_programa_insert
BEFORE INSERT ON public.programa
FOR EACH ROW EXECUTE FUNCTION func_programa_insert();

--update new y old
CREATE TRIGGER tr_programa_update
BEFORE UPDATE ON public.programa
FOR EACH ROW EXECUTE FUNCTION func_programa_update();

--delete
CREATE TRIGGER tr_programa_delete
BEFORE DELETE ON public.programa
FOR EACH ROW EXECUTE FUNCTION func_programa_delete();

-- ============================================================
-- 3. auditoria.aud_perfil
-- ============================================================

--insert 
CREATE TRIGGER tr_perfil_insert
BEFORE INSERT ON public.perfil
FOR EACH ROW EXECUTE FUNCTION func_perfil_insert();

--update new y old
CREATE TRIGGER tr_perfil_update
BEFORE UPDATE ON public.perfil
FOR EACH ROW EXECUTE FUNCTION func_perfil_update();

--delete
CREATE TRIGGER tr_perfil_delete
BEFORE DELETE ON public.perfil
FOR EACH ROW EXECUTE FUNCTION func_perfil_delete();

-- ============================================================
-- 4. auditoria.aud_curso
-- ============================================================

--insert 
CREATE TRIGGER tr_curso_insert
BEFORE INSERT ON public.curso
FOR EACH ROW EXECUTE FUNCTION func_curso_insert();

--update new y old
CREATE TRIGGER tr_curso_update
BEFORE UPDATE ON public.curso
FOR EACH ROW EXECUTE FUNCTION func_curso_update();

--delete
CREATE TRIGGER tr_curso_delete
BEFORE DELETE ON public.curso
FOR EACH ROW EXECUTE FUNCTION func_curso_delete();

-- ============================================================
-- 5. auditoria.aud_cursoimpartido
-- ============================================================

--insert 
CREATE TRIGGER tr_cursoimpartido_insert
BEFORE INSERT ON public.cursoimpartido
FOR EACH ROW EXECUTE FUNCTION func_cursoimpartido_insert();

--update new y old
CREATE TRIGGER tr_cursoimpartido_update
BEFORE UPDATE ON public.cursoimpartido
FOR EACH ROW EXECUTE FUNCTION func_cursoimpartido_update();

--delete
CREATE TRIGGER tr_cursoimpartido_delete
BEFORE DELETE ON public.cursoimpartido
FOR EACH ROW EXECUTE FUNCTION func_cursoimpartido_delete();


-- ============================================================
-- 6. auditoria.aud_grupo
-- ============================================================

--insert 
CREATE TRIGGER tr_grupo_insert
BEFORE INSERT ON public.grupo
FOR EACH ROW EXECUTE FUNCTION func_grupo_insert();

--update new y old
CREATE TRIGGER tr_grupo_update
BEFORE UPDATE ON public.grupo
FOR EACH ROW EXECUTE FUNCTION func_grupo_update();

--delete
CREATE TRIGGER tr_grupo_delete
BEFORE DELETE ON public.grupo
FOR EACH ROW EXECUTE FUNCTION func_grupo_delete();

-- ============================================================
-- 7. auditoria.aud_participacion
-- ============================================================

--insert
CREATE TRIGGER tr_participacion_insert
BEFORE INSERT ON public.participacion
FOR EACH ROW EXECUTE FUNCTION func_participacion_insert();

--update new y old
CREATE TRIGGER tr_participacion_update
BEFORE UPDATE ON public.participacion
FOR EACH ROW EXECUTE FUNCTION func_participacion_update();

--delete
CREATE TRIGGER tr_participacion_delete
BEFORE DELETE ON public.participacion
FOR EACH ROW EXECUTE FUNCTION func_participacion_delete();

-- ============================================================
-- 8. auditoria.aud_certificado
-- ============================================================

--insert 
CREATE TRIGGER tr_certificado_insert
BEFORE INSERT ON public.certificado
FOR EACH ROW EXECUTE FUNCTION func_certificado_insert();

--update new y old
CREATE TRIGGER tr_certificado_update
BEFORE UPDATE ON public.certificado
FOR EACH ROW EXECUTE FUNCTION func_certificado_update();

--delete
CREATE TRIGGER tr_certificado_delete
BEFORE DELETE ON public.certificado
FOR EACH ROW EXECUTE FUNCTION func_certificado_delete();

-- ============================================================
-- 9. auditoria.aud_refuerzo
-- ============================================================

--insert 
CREATE TRIGGER tr_refuerzo_insert
BEFORE INSERT ON public.refuerzo
FOR EACH ROW EXECUTE FUNCTION func_refuerzo_insert();

--update new y old
CREATE TRIGGER tr_refuerzo_update
BEFORE UPDATE ON public.refuerzo
FOR EACH ROW EXECUTE FUNCTION func_refuerzo_update();

--delete
CREATE TRIGGER tr_refuerzo_delete
BEFORE DELETE ON public.refuerzo
FOR EACH ROW EXECUTE FUNCTION func_refuerzo_delete();

-- ============================================================
-- 10. auditoria.aud_enlace
-- ============================================================

--insert
CREATE TRIGGER tr_enlace_insert
BEFORE INSERT ON public.enlace
FOR EACH ROW EXECUTE FUNCTION func_enlace_insert();

--update new y old
CREATE TRIGGER tr_enlace_update
BEFORE UPDATE ON public.enlace
FOR EACH ROW EXECUTE FUNCTION func_enlace_update();

--delete
CREATE TRIGGER tr_enlace_delete
BEFORE DELETE ON public.enlace
FOR EACH ROW EXECUTE FUNCTION func_enlace_delete();

-- ============================================================
-- 11. auditoria.aud_ingresorefuerzo
-- ============================================================

--insert
CREATE TRIGGER tr_ingresorefuerzo_insert
BEFORE INSERT ON public.ingresorefuerzo
FOR EACH ROW EXECUTE FUNCTION func_ingresorefuerzo_insert();

--update
CREATE TRIGGER tr_ingresorefuerzo_update
BEFORE UPDATE ON public.ingresorefuerzo
FOR EACH ROW EXECUTE FUNCTION func_ingresorefuerzo_update();

--delete
CREATE TRIGGER tr_ingresorefuerzo_delete
BEFORE DELETE ON public.ingresorefuerzo
FOR EACH ROW EXECUTE FUNCTION func_ingresorefuerzo_delete();

-- ============================================================
-- 12. auditoria.aud_ingresoenlace
-- ============================================================

--insert
CREATE TRIGGER tr_ingresoenlace_insert
BEFORE INSERT ON public.ingresoenlace
FOR EACH ROW EXECUTE FUNCTION func_ingresoenlace_insert();

--update new y old
CREATE TRIGGER tr_ingresoenlace_update
BEFORE UPDATE ON public.ingresoenlace
FOR EACH ROW EXECUTE FUNCTION func_ingresoenlace_update();

--delete
CREATE TRIGGER tr_ingresoenlace_delete
BEFORE DELETE ON public.ingresoenlace
FOR EACH ROW EXECUTE FUNCTION func_ingresoenlace_delete();

-- ============================================================
-- 13. auditoria.aud_modulo
-- ============================================================

--insert
CREATE TRIGGER tr_modulo_insert
BEFORE INSERT ON public.modulo
FOR EACH ROW EXECUTE FUNCTION func_modulo_insert();

--update new y old
CREATE TRIGGER tr_modulo_update
BEFORE UPDATE ON public.modulo
FOR EACH ROW EXECUTE FUNCTION func_modulo_update();

--delete
CREATE TRIGGER tr_modulo_delete
BEFORE DELETE ON public.modulo
FOR EACH ROW EXECUTE FUNCTION func_modulo_delete();

-- ============================================================
-- 14. auditoria.aud_teoria
-- ============================================================

--insert
CREATE TRIGGER tr_teoria_insert
BEFORE INSERT ON public.teoria
FOR EACH ROW EXECUTE FUNCTION func_teoria_insert();

--update new y old
CREATE TRIGGER tr_teoria_update
BEFORE UPDATE ON public.teoria
FOR EACH ROW EXECUTE FUNCTION func_teoria_update();

--delete
CREATE TRIGGER tr_teoria_delete
BEFORE DELETE ON public.teoria
FOR EACH ROW EXECUTE FUNCTION func_teoria_delete();

-- ============================================================
-- 15. auditoria.aud_actividad
-- ============================================================

--insert 
CREATE TRIGGER tr_actividad_insert
BEFORE INSERT ON public.actividad
FOR EACH ROW EXECUTE FUNCTION func_actividad_insert();

--update new y old
CREATE TRIGGER tr_actividad_update
BEFORE UPDATE ON public.actividad
FOR EACH ROW EXECUTE FUNCTION func_actividad_update();

--delete
CREATE TRIGGER tr_actividad_delete
BEFORE DELETE ON public.actividad
FOR EACH ROW EXECUTE FUNCTION func_actividad_delete();

-- ============================================================
-- 16. auditoria.aud_juego
-- ============================================================

--insert 
CREATE TRIGGER tr_juego_insert
BEFORE INSERT ON public.juego
FOR EACH ROW EXECUTE FUNCTION func_juego_insert();

--update new y old
CREATE TRIGGER tr_juego_update
BEFORE UPDATE ON public.juego
FOR EACH ROW EXECUTE FUNCTION func_juego_update();

--delete
CREATE TRIGGER tr_juego_delete
BEFORE DELETE ON public.juego
FOR EACH ROW EXECUTE FUNCTION func_juego_delete();

-- ============================================================
-- 17. auditoria.aud_juegoelegido
-- ============================================================

--insert
CREATE TRIGGER tr_juegoelegido_insert
BEFORE INSERT ON public.juegoelegido
FOR EACH ROW EXECUTE FUNCTION func_juegoelegido_insert();

--update
CREATE TRIGGER tr_juegoelegido_update
BEFORE UPDATE ON public.juegoelegido
FOR EACH ROW EXECUTE FUNCTION func_juegoelegido_update();

--delete
CREATE TRIGGER tr_juegoelegido_delete
BEFORE DELETE ON public.juegoelegido
FOR EACH ROW EXECUTE FUNCTION func_juegoelegido_delete();

-- ============================================================
-- 18. auditoria.aud_ingresojuego
-- ============================================================

--insert
CREATE TRIGGER tr_ingresojuego_insert
BEFORE INSERT ON public.ingresojuego
FOR EACH ROW EXECUTE FUNCTION func_ingresojuego_insert();

--update
CREATE TRIGGER tr_ingresojuego_update
BEFORE UPDATE ON public.ingresojuego
FOR EACH ROW EXECUTE FUNCTION func_ingresojuego_update();

--delete
CREATE TRIGGER tr_ingresojuego_delete
BEFORE DELETE ON public.ingresojuego
FOR EACH ROW EXECUTE FUNCTION func_ingresojuego_delete();

-- ============================================================
-- 19. auditoria.aud_tipocomponente
-- ============================================================

--insert
CREATE TRIGGER tr_tipocomponente_insert
BEFORE INSERT ON public.tipocomponente
FOR EACH ROW EXECUTE FUNCTION func_tipocomponente_insert();

--update
CREATE TRIGGER tr_tipocomponente_update
BEFORE UPDATE ON public.tipocomponente
FOR EACH ROW EXECUTE FUNCTION func_tipocomponente_update();

--delete
CREATE TRIGGER tr_tipocomponente_delete
BEFORE DELETE ON public.tipocomponente
FOR EACH ROW EXECUTE FUNCTION func_tipocomponente_delete();

-- ============================================================
-- 20. auditoria.aud_componente
-- ============================================================

--insert
CREATE TRIGGER tr_componente_insert
BEFORE INSERT ON public.componente
FOR EACH ROW EXECUTE FUNCTION func_componente_insert();

--update
CREATE TRIGGER tr_componente_update
BEFORE UPDATE ON public.componente
FOR EACH ROW EXECUTE FUNCTION func_componente_update();

--delete
CREATE TRIGGER tr_componente_delete
BEFORE DELETE ON public.componente
FOR EACH ROW EXECUTE FUNCTION func_componente_delete();