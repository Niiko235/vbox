-- ============================================================
-- 1. auditoria.aud_universidad
-- ============================================================

--insert
CREATE OR REPLACE FUNCTION func_universidad_insert() RETURNS TRIGGER
AS $$
BEGIN
	INSERT INTO auditoria.aud_universidad (
		fecha_aud, usuario_aud, operacion_aud,pkcodigoies_universidad, nombre_universidad, tipo_universidad
	) VALUES (
		CURRENT_TIMESTAMP,CURRENT_USER,'INSERT',
		new.pkcodigoies_universidad, new.nombre_universidad, new.tipo_universidad
	);
	RETURN NEW;
END;
$$
LANGUAGE plpgsql;

--update new and old
CREATE OR REPLACE FUNCTION func_universidad_update() RETURNS TRIGGER
AS $$
BEGIN
	INSERT INTO auditoria.aud_universidad (
		fecha_aud, usuario_aud, operacion_aud,pkcodigoies_universidad, nombre_universidad, tipo_universidad
	) VALUES (
		CURRENT_TIMESTAMP,CURRENT_USER,'UPDATE',
		new.pkcodigoies_universidad, new.nombre_universidad, new.tipo_universidad
	);

	INSERT INTO auditoria.aud_universidad (
		fecha_aud, usuario_aud, operacion_aud,pkcodigoies_universidad, nombre_universidad, tipo_universidad
	) VALUES (
		CURRENT_TIMESTAMP, CURRENT_USER,'UPDATE',
		old.pkcodigoies_universidad, old.nombre_universidad, old.tipo_universidad
	);
	RETURN NEW;

END;
$$
LANGUAGE plpgsql;

--delete
CREATE OR REPLACE FUNCTION func_universidad_delete() RETURNS TRIGGER
AS $$
BEGIN
	INSERT INTO auditoria.aud_universidad (
		fecha_aud, usuario_aud, operacion_aud, pkcodigoies_universidad, nombre_universidad, tipo_universidad
	) VALUES (
		CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
		old.pkcodigoies_universidad, old.nombre_universidad, old.tipo_universidad
	);
	RETURN OLD;
END;
$$
LANGUAGE plpgsql;

-- ============================================================
-- 2. auditoria.aud_programa
-- ============================================================

--insert 
CREATE OR REPLACE FUNCTION func_programa_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_programa (
        fecha_aud, usuario_aud, operacion_aud,
        pkcodigo_programa, nombre_programa, fkiduniversidad_programa
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkcodigo_programa, NEW.nombre_programa, NEW.fkiduniversidad_programa
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--update new y old
CREATE OR REPLACE FUNCTION func_programa_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_programa (
        fecha_aud, usuario_aud, operacion_aud,
        pkcodigo_programa, nombre_programa, fkiduniversidad_programa
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkcodigo_programa, NEW.nombre_programa, NEW.fkiduniversidad_programa
    );
    INSERT INTO auditoria.aud_programa (
        fecha_aud, usuario_aud, operacion_aud,
        pkcodigo_programa, nombre_programa, fkiduniversidad_programa
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkcodigo_programa, OLD.nombre_programa, OLD.fkiduniversidad_programa
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_programa_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_programa (
        fecha_aud, usuario_aud, operacion_aud,
        pkcodigo_programa, nombre_programa, fkiduniversidad_programa
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkcodigo_programa, OLD.nombre_programa, OLD.fkiduniversidad_programa
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
-- ============================================================
-- 3. auditoria.aud_perfil
-- ============================================================

--insert 
CREATE OR REPLACE FUNCTION func_perfil_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_perfil (
        fecha_aud, usuario_aud, operacion_aud,
        pkcc_perfil, primernombre_perfil, segundonombre_perfil,
        primerapellido_perfil, segundoapellido_perfil, rol,
        fechanacimiento_perfil, telefono_perfil, email_perfil,
        contrasenia_perfil, fkcodigoprograma_perfil
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkcc_perfil, NEW.primernombre_perfil, NEW.segundonombre_perfil,
        NEW.primerapellido_perfil, NEW.segundoapellido_perfil, NEW.rol,
        NEW.fechanacimiento_perfil, NEW.telefono_perfil, NEW.email_perfil,
        NEW.contrasenia_perfil, NEW.fkcodigoprograma_perfil
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_perfil_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_perfil (
        fecha_aud, usuario_aud, operacion_aud,
        pkcc_perfil, primernombre_perfil, segundonombre_perfil,
        primerapellido_perfil, segundoapellido_perfil, rol,
        fechanacimiento_perfil, telefono_perfil, email_perfil,
        contrasenia_perfil, fkcodigoprograma_perfil
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkcc_perfil, NEW.primernombre_perfil, NEW.segundonombre_perfil,
        NEW.primerapellido_perfil, NEW.segundoapellido_perfil, NEW.rol,
        NEW.fechanacimiento_perfil, NEW.telefono_perfil, NEW.email_perfil,
        NEW.contrasenia_perfil, NEW.fkcodigoprograma_perfil
    );
    INSERT INTO auditoria.aud_perfil (
        fecha_aud, usuario_aud, operacion_aud,
        pkcc_perfil, primernombre_perfil, segundonombre_perfil,
        primerapellido_perfil, segundoapellido_perfil, rol,
        fechanacimiento_perfil, telefono_perfil, email_perfil,
        contrasenia_perfil, fkcodigoprograma_perfil
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkcc_perfil, OLD.primernombre_perfil, OLD.segundonombre_perfil,
        OLD.primerapellido_perfil, OLD.segundoapellido_perfil, OLD.rol,
        OLD.fechanacimiento_perfil, OLD.telefono_perfil, OLD.email_perfil,
        OLD.contrasenia_perfil, OLD.fkcodigoprograma_perfil
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_perfil_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_perfil (
        fecha_aud, usuario_aud, operacion_aud,
        pkcc_perfil, primernombre_perfil, segundonombre_perfil,
        primerapellido_perfil, segundoapellido_perfil, rol,
        fechanacimiento_perfil, telefono_perfil, email_perfil,
        contrasenia_perfil, fkcodigoprograma_perfil
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkcc_perfil, OLD.primernombre_perfil, OLD.segundonombre_perfil,
        OLD.primerapellido_perfil, OLD.segundoapellido_perfil, OLD.rol,
        OLD.fechanacimiento_perfil, OLD.telefono_perfil, OLD.email_perfil,
        OLD.contrasenia_perfil, OLD.fkcodigoprograma_perfil
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 4. auditoria.aud_curso
-- ============================================================

--insert
CREATE OR REPLACE FUNCTION func_curso_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_curso (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_curso, nombre_curso, descripcion_curso,
        imagen_curso, fechacreacion_curso, pfkidadministrador_curso
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkid_curso, NEW.nombre_curso, NEW.descripcion_curso,
        NEW.imagen_curso, NEW.fechacreacion_curso, NEW.pfkidadministrador_curso
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_curso_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_curso (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_curso, nombre_curso, descripcion_curso,
        imagen_curso, fechacreacion_curso, pfkidadministrador_curso
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkid_curso, NEW.nombre_curso, NEW.descripcion_curso,
        NEW.imagen_curso, NEW.fechacreacion_curso, NEW.pfkidadministrador_curso
    );
    INSERT INTO auditoria.aud_curso (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_curso, nombre_curso, descripcion_curso,
        imagen_curso, fechacreacion_curso, pfkidadministrador_curso
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkid_curso, OLD.nombre_curso, OLD.descripcion_curso,
        OLD.imagen_curso, OLD.fechacreacion_curso, OLD.pfkidadministrador_curso
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_curso_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_curso (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_curso, nombre_curso, descripcion_curso,
        imagen_curso, fechacreacion_curso, pfkidadministrador_curso
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkid_curso, OLD.nombre_curso, OLD.descripcion_curso,
        OLD.imagen_curso, OLD.fechacreacion_curso, OLD.pfkidadministrador_curso
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;


-- ============================================================
-- 5. auditoria.aud_cursoimpartido
-- ============================================================

--insert 
CREATE OR REPLACE FUNCTION func_cursoimpartido_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_cursoimpartido (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidcurso_cursoimpartido, pfkidprofesor_cursoimpartido
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pfkidcurso_cursoimpartido, NEW.pfkidprofesor_cursoimpartido
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_cursoimpartido_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_cursoimpartido (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidcurso_cursoimpartido, pfkidprofesor_cursoimpartido
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pfkidcurso_cursoimpartido, NEW.pfkidprofesor_cursoimpartido
    );
    INSERT INTO auditoria.aud_cursoimpartido (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidcurso_cursoimpartido, pfkidprofesor_cursoimpartido
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pfkidcurso_cursoimpartido, OLD.pfkidprofesor_cursoimpartido
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_cursoimpartido_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_cursoimpartido (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidcurso_cursoimpartido, pfkidprofesor_cursoimpartido
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pfkidcurso_cursoimpartido, OLD.pfkidprofesor_cursoimpartido
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 6. auditoria.aud_grupo
-- ============================================================

--insert 
CREATE OR REPLACE FUNCTION func_grupo_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_grupo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_grupo, fechacreacion_grupo, nombre_grupo,
        descripcion_grupo, fkidprofesorcursoimpartido_grupo, fkidcursocursoimpartido_grupo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkid_grupo, NEW.fechacreacion_grupo, NEW.nombre_grupo,
        NEW.descripcion_grupo, NEW.fkidprofesorcursoimpartido_grupo, NEW.fkidcursocursoimpartido_grupo
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_grupo_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_grupo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_grupo, fechacreacion_grupo, nombre_grupo,
        descripcion_grupo, fkidprofesorcursoimpartido_grupo, fkidcursocursoimpartido_grupo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkid_grupo, NEW.fechacreacion_grupo, NEW.nombre_grupo,
        NEW.descripcion_grupo, NEW.fkidprofesorcursoimpartido_grupo, NEW.fkidcursocursoimpartido_grupo
    );
    INSERT INTO auditoria.aud_grupo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_grupo, fechacreacion_grupo, nombre_grupo,
        descripcion_grupo, fkidprofesorcursoimpartido_grupo, fkidcursocursoimpartido_grupo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkid_grupo, OLD.fechacreacion_grupo, OLD.nombre_grupo,
        OLD.descripcion_grupo, OLD.fkidprofesorcursoimpartido_grupo, OLD.fkidcursocursoimpartido_grupo
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_grupo_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_grupo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_grupo, fechacreacion_grupo, nombre_grupo,
        descripcion_grupo, fkidprofesorcursoimpartido_grupo, fkidcursocursoimpartido_grupo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkid_grupo, OLD.fechacreacion_grupo, OLD.nombre_grupo,
        OLD.descripcion_grupo, OLD.fkidprofesorcursoimpartido_grupo, OLD.fkidcursocursoimpartido_grupo
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 7. auditoria.aud_participacion
-- ============================================================

--insert
CREATE OR REPLACE FUNCTION func_participacion_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_participacion (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidestudiante_participacion, pfkidgrupo_participacion,
        estado_participacion, fecharegistro_participacion,
        puntuaciontotal_participacion, puntuaciontotalmaterial_participacion,
        puntuaciontotallink_participacion
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pfkidestudiante_participacion, NEW.pfkidgrupo_participacion,
        NEW.estado_participacion, NEW.fecharegistro_participacion,
        NEW.puntuaciontotal_participacion, NEW.puntuaciontotalmaterial_participacion,
        NEW.puntuaciontotallink_participacion
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_participacion_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_participacion (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidestudiante_participacion, pfkidgrupo_participacion,
        estado_participacion, fecharegistro_participacion,
        puntuaciontotal_participacion, puntuaciontotalmaterial_participacion,
        puntuaciontotallink_participacion
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pfkidestudiante_participacion, NEW.pfkidgrupo_participacion,
        NEW.estado_participacion, NEW.fecharegistro_participacion,
        NEW.puntuaciontotal_participacion, NEW.puntuaciontotalmaterial_participacion,
        NEW.puntuaciontotallink_participacion
    );
    INSERT INTO auditoria.aud_participacion (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidestudiante_participacion, pfkidgrupo_participacion,
        estado_participacion, fecharegistro_participacion,
        puntuaciontotal_participacion, puntuaciontotalmaterial_participacion,
        puntuaciontotallink_participacion
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pfkidestudiante_participacion, OLD.pfkidgrupo_participacion,
        OLD.estado_participacion, OLD.fecharegistro_participacion,
        OLD.puntuaciontotal_participacion, OLD.puntuaciontotalmaterial_participacion,
        OLD.puntuaciontotallink_participacion
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_participacion_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_participacion (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidestudiante_participacion, pfkidgrupo_participacion,
        estado_participacion, fecharegistro_participacion,
        puntuaciontotal_participacion, puntuaciontotalmaterial_participacion,
        puntuaciontotallink_participacion
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pfkidestudiante_participacion, OLD.pfkidgrupo_participacion,
        OLD.estado_participacion, OLD.fecharegistro_participacion,
        OLD.puntuaciontotal_participacion, OLD.puntuaciontotalmaterial_participacion,
        OLD.puntuaciontotallink_participacion
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 8. auditoria.aud_certificado
-- ============================================================

--insert 
CREATE OR REPLACE FUNCTION func_certificado_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_certificado (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidestudianteparticipacion_certificado,
        pfkidgrupoparticipacion_certificado,
        titulo_certificado, fechaentregado_certificado
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pfkidestudianteparticipacion_certificado,
        NEW.pfkidgrupoparticipacion_certificado,
        NEW.titulo_certificado, NEW.fechaentregado_certificado
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_certificado_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_certificado (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidestudianteparticipacion_certificado,
        pfkidgrupoparticipacion_certificado,
        titulo_certificado, fechaentregado_certificado
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pfkidestudianteparticipacion_certificado,
        NEW.pfkidgrupoparticipacion_certificado,
        NEW.titulo_certificado, NEW.fechaentregado_certificado
    );
    INSERT INTO auditoria.aud_certificado (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidestudianteparticipacion_certificado,
        pfkidgrupoparticipacion_certificado,
        titulo_certificado, fechaentregado_certificado
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pfkidestudianteparticipacion_certificado,
        OLD.pfkidgrupoparticipacion_certificado,
        OLD.titulo_certificado, OLD.fechaentregado_certificado
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_certificado_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_certificado (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidestudianteparticipacion_certificado,
        pfkidgrupoparticipacion_certificado,
        titulo_certificado, fechaentregado_certificado
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pfkidestudianteparticipacion_certificado,
        OLD.pfkidgrupoparticipacion_certificado,
        OLD.titulo_certificado, OLD.fechaentregado_certificado
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 9. auditoria.aud_refuerzo
-- ============================================================

--insert
CREATE OR REPLACE FUNCTION func_refuerzo_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_refuerzo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_refuerzo, explicacion_refuerzo, puntuacion_refuerzo,
        fkidgrupo_refuerzo, fkidmodulo_refuerzo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkid_refuerzo, NEW.explicacion_refuerzo, NEW.puntuacion_refuerzo,
        NEW.fkidgrupo_refuerzo, NEW.fkidmodulo_refuerzo
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_refuerzo_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_refuerzo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_refuerzo, explicacion_refuerzo, puntuacion_refuerzo,
        fkidgrupo_refuerzo, fkidmodulo_refuerzo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkid_refuerzo, NEW.explicacion_refuerzo, NEW.puntuacion_refuerzo,
        NEW.fkidgrupo_refuerzo, NEW.fkidmodulo_refuerzo
    );
    INSERT INTO auditoria.aud_refuerzo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_refuerzo, explicacion_refuerzo, puntuacion_refuerzo,
        fkidgrupo_refuerzo, fkidmodulo_refuerzo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkid_refuerzo, OLD.explicacion_refuerzo, OLD.puntuacion_refuerzo,
        OLD.fkidgrupo_refuerzo, OLD.fkidmodulo_refuerzo
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_refuerzo_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_refuerzo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_refuerzo, explicacion_refuerzo, puntuacion_refuerzo,
        fkidgrupo_refuerzo, fkidmodulo_refuerzo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkid_refuerzo, OLD.explicacion_refuerzo, OLD.puntuacion_refuerzo,
        OLD.fkidgrupo_refuerzo, OLD.fkidmodulo_refuerzo
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 10. auditoria.aud_enlace
-- ============================================================

--insert
CREATE OR REPLACE FUNCTION func_enlace_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_enlace (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_enlace, tipo_enlace, contenido_enlace,
        puntuacion_enlace, fkidrefuerzo_enlace
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkid_enlace, NEW.tipo_enlace, NEW.contenido_enlace,
        NEW.puntuacion_enlace, NEW.fkidrefuerzo_enlace
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_enlace_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_enlace (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_enlace, tipo_enlace, contenido_enlace,
        puntuacion_enlace, fkidrefuerzo_enlace
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkid_enlace, NEW.tipo_enlace, NEW.contenido_enlace,
        NEW.puntuacion_enlace, NEW.fkidrefuerzo_enlace
    );
    INSERT INTO auditoria.aud_enlace (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_enlace, tipo_enlace, contenido_enlace,
        puntuacion_enlace, fkidrefuerzo_enlace
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkid_enlace, OLD.tipo_enlace, OLD.contenido_enlace,
        OLD.puntuacion_enlace, OLD.fkidrefuerzo_enlace
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_enlace_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_enlace (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_enlace, tipo_enlace, contenido_enlace,
        puntuacion_enlace, fkidrefuerzo_enlace
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkid_enlace, OLD.tipo_enlace, OLD.contenido_enlace,
        OLD.puntuacion_enlace, OLD.fkidrefuerzo_enlace
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 11. auditoria.aud_ingresorefuerzo
-- ============================================================

--insert
CREATE OR REPLACE FUNCTION func_ingresorefuerzo_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_ingresorefuerzo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_ingresorefuerzo, puntuacionobtenida_ingresorefuerzo,
        fecharegistro_ingresorefuerzo,
        fkidestudianteparticipacion_ingresorefuerzo,
        fkidgrupoparticipacion_ingresorefuerzo,
        fkidrefuerzo_ingresorefuerzo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkid_ingresorefuerzo, NEW.puntuacionobtenida_ingresorefuerzo,
        NEW.fecharegistro_ingresorefuerzo,
        NEW.fkidestudianteparticipacion_ingresorefuerzo,
        NEW.fkidgrupoparticipacion_ingresorefuerzo,
        NEW.fkidrefuerzo_ingresorefuerzo
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update
CREATE OR REPLACE FUNCTION func_ingresorefuerzo_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_ingresorefuerzo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_ingresorefuerzo, puntuacionobtenida_ingresorefuerzo,
        fecharegistro_ingresorefuerzo,
        fkidestudianteparticipacion_ingresorefuerzo,
        fkidgrupoparticipacion_ingresorefuerzo,
        fkidrefuerzo_ingresorefuerzo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkid_ingresorefuerzo, NEW.puntuacionobtenida_ingresorefuerzo,
        NEW.fecharegistro_ingresorefuerzo,
        NEW.fkidestudianteparticipacion_ingresorefuerzo,
        NEW.fkidgrupoparticipacion_ingresorefuerzo,
        NEW.fkidrefuerzo_ingresorefuerzo
    );
    INSERT INTO auditoria.aud_ingresorefuerzo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_ingresorefuerzo, puntuacionobtenida_ingresorefuerzo,
        fecharegistro_ingresorefuerzo,
        fkidestudianteparticipacion_ingresorefuerzo,
        fkidgrupoparticipacion_ingresorefuerzo,
        fkidrefuerzo_ingresorefuerzo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkid_ingresorefuerzo, OLD.puntuacionobtenida_ingresorefuerzo,
        OLD.fecharegistro_ingresorefuerzo,
        OLD.fkidestudianteparticipacion_ingresorefuerzo,
        OLD.fkidgrupoparticipacion_ingresorefuerzo,
        OLD.fkidrefuerzo_ingresorefuerzo
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_ingresorefuerzo_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_ingresorefuerzo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_ingresorefuerzo, puntuacionobtenida_ingresorefuerzo,
        fecharegistro_ingresorefuerzo,
        fkidestudianteparticipacion_ingresorefuerzo,
        fkidgrupoparticipacion_ingresorefuerzo,
        fkidrefuerzo_ingresorefuerzo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkid_ingresorefuerzo, OLD.puntuacionobtenida_ingresorefuerzo,
        OLD.fecharegistro_ingresorefuerzo,
        OLD.fkidestudianteparticipacion_ingresorefuerzo,
        OLD.fkidgrupoparticipacion_ingresorefuerzo,
        OLD.fkidrefuerzo_ingresorefuerzo
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 12. auditoria.aud_ingresoenlace
-- ============================================================

--insert
CREATE OR REPLACE FUNCTION func_ingresoenlace_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_ingresoenlace (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_ingresoenlace, puntuacionobtenida_ingresoenlace,
        fecharegistro_ingresoenlace,
        fkidestudianteparticipacion_ingresoenlace,
        fkidgrupoparticipacion_ingresoenlace,
        fkidenlace_ingresoenlace
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkid_ingresoenlace, NEW.puntuacionobtenida_ingresoenlace,
        NEW.fecharegistro_ingresoenlace,
        NEW.fkidestudianteparticipacion_ingresoenlace,
        NEW.fkidgrupoparticipacion_ingresoenlace,
        NEW.fkidenlace_ingresoenlace
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_ingresoenlace_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_ingresoenlace (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_ingresoenlace, puntuacionobtenida_ingresoenlace,
        fecharegistro_ingresoenlace,
        fkidestudianteparticipacion_ingresoenlace,
        fkidgrupoparticipacion_ingresoenlace,
        fkidenlace_ingresoenlace
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkid_ingresoenlace, NEW.puntuacionobtenida_ingresoenlace,
        NEW.fecharegistro_ingresoenlace,
        NEW.fkidestudianteparticipacion_ingresoenlace,
        NEW.fkidgrupoparticipacion_ingresoenlace,
        NEW.fkidenlace_ingresoenlace
    );
    INSERT INTO auditoria.aud_ingresoenlace (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_ingresoenlace, puntuacionobtenida_ingresoenlace,
        fecharegistro_ingresoenlace,
        fkidestudianteparticipacion_ingresoenlace,
        fkidgrupoparticipacion_ingresoenlace,
        fkidenlace_ingresoenlace
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkid_ingresoenlace, OLD.puntuacionobtenida_ingresoenlace,
        OLD.fecharegistro_ingresoenlace,
        OLD.fkidestudianteparticipacion_ingresoenlace,
        OLD.fkidgrupoparticipacion_ingresoenlace,
        OLD.fkidenlace_ingresoenlace
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_ingresoenlace_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_ingresoenlace (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_ingresoenlace, puntuacionobtenida_ingresoenlace,
        fecharegistro_ingresoenlace,
        fkidestudianteparticipacion_ingresoenlace,
        fkidgrupoparticipacion_ingresoenlace,
        fkidenlace_ingresoenlace
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkid_ingresoenlace, OLD.puntuacionobtenida_ingresoenlace,
        OLD.fecharegistro_ingresoenlace,
        OLD.fkidestudianteparticipacion_ingresoenlace,
        OLD.fkidgrupoparticipacion_ingresoenlace,
        OLD.fkidenlace_ingresoenlace
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 13. auditoria.aud_modulo
-- ============================================================

--insert
CREATE OR REPLACE FUNCTION func_modulo_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_modulo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_modulo, numerorefuerzos_modulo, nombre_modulo, fkidcurso_modulo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkid_modulo, NEW.numerorefuerzos_modulo, NEW.nombre_modulo, NEW.fkidcurso_modulo
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_modulo_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_modulo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_modulo, numerorefuerzos_modulo, nombre_modulo, fkidcurso_modulo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkid_modulo, NEW.numerorefuerzos_modulo, NEW.nombre_modulo, NEW.fkidcurso_modulo
    );
    INSERT INTO auditoria.aud_modulo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_modulo, numerorefuerzos_modulo, nombre_modulo, fkidcurso_modulo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkid_modulo, OLD.numerorefuerzos_modulo, OLD.nombre_modulo, OLD.fkidcurso_modulo
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_modulo_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_modulo (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_modulo, numerorefuerzos_modulo, nombre_modulo, fkidcurso_modulo
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkid_modulo, OLD.numerorefuerzos_modulo, OLD.nombre_modulo, OLD.fkidcurso_modulo
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 14. auditoria.aud_teoria
-- ============================================================

--insert
CREATE OR REPLACE FUNCTION func_teoria_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_teoria (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_teoria, nombre_teoria, contenido_teoria,
        orden_teoria, fkidmodulo_teoria
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkid_teoria, NEW.nombre_teoria, NEW.contenido_teoria,
        NEW.orden_teoria, NEW.fkidmodulo_teoria
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_teoria_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_teoria (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_teoria, nombre_teoria, contenido_teoria,
        orden_teoria, fkidmodulo_teoria
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkid_teoria, NEW.nombre_teoria, NEW.contenido_teoria,
        NEW.orden_teoria, NEW.fkidmodulo_teoria
    );
    INSERT INTO auditoria.aud_teoria (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_teoria, nombre_teoria, contenido_teoria,
        orden_teoria, fkidmodulo_teoria
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkid_teoria, OLD.nombre_teoria, OLD.contenido_teoria,
        OLD.orden_teoria, OLD.fkidmodulo_teoria
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_teoria_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_teoria (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_teoria, nombre_teoria, contenido_teoria,
        orden_teoria, fkidmodulo_teoria
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkid_teoria, OLD.nombre_teoria, OLD.contenido_teoria,
        OLD.orden_teoria, OLD.fkidmodulo_teoria
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 15. auditoria.aud_actividad
-- ============================================================

--insert 
CREATE OR REPLACE FUNCTION func_actividad_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_actividad (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_actividad, nombre_actividad, url_actividad,
        disponible_actividad, fkidteoria_actividad
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkid_actividad, NEW.nombre_actividad, NEW.url_actividad,
        NEW.disponible_actividad, NEW.fkidteoria_actividad
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_actividad_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_actividad (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_actividad, nombre_actividad, url_actividad,
        disponible_actividad, fkidteoria_actividad
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkid_actividad, NEW.nombre_actividad, NEW.url_actividad,
        NEW.disponible_actividad, NEW.fkidteoria_actividad
    );
    INSERT INTO auditoria.aud_actividad (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_actividad, nombre_actividad, url_actividad,
        disponible_actividad, fkidteoria_actividad
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkid_actividad, OLD.nombre_actividad, OLD.url_actividad,
        OLD.disponible_actividad, OLD.fkidteoria_actividad
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_actividad_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_actividad (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_actividad, nombre_actividad, url_actividad,
        disponible_actividad, fkidteoria_actividad
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkid_actividad, OLD.nombre_actividad, OLD.url_actividad,
        OLD.disponible_actividad, OLD.fkidteoria_actividad
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 16. auditoria.aud_juego
-- ============================================================

--insert 
CREATE OR REPLACE FUNCTION func_juego_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_juego (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_juego, nombre_juego, descripcion_juego,
        puntuacion_juego, fkidmodulo_juego, fkidgrupo_juego
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkid_juego, NEW.nombre_juego, NEW.descripcion_juego,
        NEW.puntuacion_juego, NEW.fkidmodulo_juego, NEW.fkidgrupo_juego
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_juego_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_juego (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_juego, nombre_juego, descripcion_juego,
        puntuacion_juego, fkidmodulo_juego, fkidgrupo_juego
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkid_juego, NEW.nombre_juego, NEW.descripcion_juego,
        NEW.puntuacion_juego, NEW.fkidmodulo_juego, NEW.fkidgrupo_juego
    );
    INSERT INTO auditoria.aud_juego (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_juego, nombre_juego, descripcion_juego,
        puntuacion_juego, fkidmodulo_juego, fkidgrupo_juego
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkid_juego, OLD.nombre_juego, OLD.descripcion_juego,
        OLD.puntuacion_juego, OLD.fkidmodulo_juego, OLD.fkidgrupo_juego
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_juego_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_juego (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_juego, nombre_juego, descripcion_juego,
        puntuacion_juego, fkidmodulo_juego, fkidgrupo_juego
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkid_juego, OLD.nombre_juego, OLD.descripcion_juego,
        OLD.puntuacion_juego, OLD.fkidmodulo_juego, OLD.fkidgrupo_juego
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 17. auditoria.aud_juegoelegido
-- ============================================================

--insert
CREATE OR REPLACE FUNCTION func_juegoelegido_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_juegoelegido (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidjuego_juegoelegido, pfkidgrupo_juegoelegido
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pfkidjuego_juegoelegido, NEW.pfkidgrupo_juegoelegido
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update
CREATE OR REPLACE FUNCTION func_juegoelegido_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_juegoelegido (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidjuego_juegoelegido, pfkidgrupo_juegoelegido
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pfkidjuego_juegoelegido, NEW.pfkidgrupo_juegoelegido
    );
    INSERT INTO auditoria.aud_juegoelegido (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidjuego_juegoelegido, pfkidgrupo_juegoelegido
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pfkidjuego_juegoelegido, OLD.pfkidgrupo_juegoelegido
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_juegoelegido_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_juegoelegido (
        fecha_aud, usuario_aud, operacion_aud,
        pfkidjuego_juegoelegido, pfkidgrupo_juegoelegido
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pfkidjuego_juegoelegido, OLD.pfkidgrupo_juegoelegido
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 18. auditoria.aud_ingresojuego
-- ============================================================

--insert
CREATE OR REPLACE FUNCTION func_ingresojuego_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_ingresojuego (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_ingresojuego, puntuacionobtenida_ingresojuego,
        fecharegistro_ingresojuego,
        fkidestudianteparticipacion_ingresojuego,
        fkidgrupoparticipacion_ingresojuego,
        fkidjuegojuegoelegido_ingresojuego,
        fkidgrupojuegoelegido_ingresojuego
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkid_ingresojuego, NEW.puntuacionobtenida_ingresojuego,
        NEW.fecharegistro_ingresojuego,
        NEW.fkidestudianteparticipacion_ingresojuego,
        NEW.fkidgrupoparticipacion_ingresojuego,
        NEW.fkidjuegojuegoelegido_ingresojuego,
        NEW.fkidgrupojuegoelegido_ingresojuego
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_ingresojuego_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_ingresojuego (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_ingresojuego, puntuacionobtenida_ingresojuego,
        fecharegistro_ingresojuego,
        fkidestudianteparticipacion_ingresojuego,
        fkidgrupoparticipacion_ingresojuego,
        fkidjuegojuegoelegido_ingresojuego,
        fkidgrupojuegoelegido_ingresojuego
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkid_ingresojuego, NEW.puntuacionobtenida_ingresojuego,
        NEW.fecharegistro_ingresojuego,
        NEW.fkidestudianteparticipacion_ingresojuego,
        NEW.fkidgrupoparticipacion_ingresojuego,
        NEW.fkidjuegojuegoelegido_ingresojuego,
        NEW.fkidgrupojuegoelegido_ingresojuego
    );
    INSERT INTO auditoria.aud_ingresojuego (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_ingresojuego, puntuacionobtenida_ingresojuego,
        fecharegistro_ingresojuego,
        fkidestudianteparticipacion_ingresojuego,
        fkidgrupoparticipacion_ingresojuego,
        fkidjuegojuegoelegido_ingresojuego,
        fkidgrupojuegoelegido_ingresojuego
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkid_ingresojuego, OLD.puntuacionobtenida_ingresojuego,
        OLD.fecharegistro_ingresojuego,
        OLD.fkidestudianteparticipacion_ingresojuego,
        OLD.fkidgrupoparticipacion_ingresojuego,
        OLD.fkidjuegojuegoelegido_ingresojuego,
        OLD.fkidgrupojuegoelegido_ingresojuego
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_ingresojuego_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_ingresojuego (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_ingresojuego, puntuacionobtenida_ingresojuego,
        fecharegistro_ingresojuego,
        fkidestudianteparticipacion_ingresojuego,
        fkidgrupoparticipacion_ingresojuego,
        fkidjuegojuegoelegido_ingresojuego,
        fkidgrupojuegoelegido_ingresojuego
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkid_ingresojuego, OLD.puntuacionobtenida_ingresojuego,
        OLD.fecharegistro_ingresojuego,
        OLD.fkidestudianteparticipacion_ingresojuego,
        OLD.fkidgrupoparticipacion_ingresojuego,
        OLD.fkidjuegojuegoelegido_ingresojuego,
        OLD.fkidgrupojuegoelegido_ingresojuego
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 19. auditoria.aud_tipocomponente
-- ============================================================

--insert
CREATE OR REPLACE FUNCTION func_tipocomponente_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_tipocomponente (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_tipocomponente, nombre_tipocomponente, fkidmodulo_tipocomponente
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkid_tipocomponente, NEW.nombre_tipocomponente, NEW.fkidmodulo_tipocomponente
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update
CREATE OR REPLACE FUNCTION func_tipocomponente_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_tipocomponente (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_tipocomponente, nombre_tipocomponente, fkidmodulo_tipocomponente
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkid_tipocomponente, NEW.nombre_tipocomponente, NEW.fkidmodulo_tipocomponente
    );
    INSERT INTO auditoria.aud_tipocomponente (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_tipocomponente, nombre_tipocomponente, fkidmodulo_tipocomponente
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkid_tipocomponente, OLD.nombre_tipocomponente, OLD.fkidmodulo_tipocomponente
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_tipocomponente_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_tipocomponente (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_tipocomponente, nombre_tipocomponente, fkidmodulo_tipocomponente
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkid_tipocomponente, OLD.nombre_tipocomponente, OLD.fkidmodulo_tipocomponente
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
 
 
-- ============================================================
-- 20. auditoria.aud_componente
-- ============================================================

--insert
CREATE OR REPLACE FUNCTION func_componente_insert() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_componente (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_componente, nombre_componente, extra_componente,
        componentepadre_componente, retroalimentacion_componente,
        fkidtipocomponente_componente, fkidjuego_componente
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'INSERT',
        NEW.pkid_componente, NEW.nombre_componente, NEW.extra_componente,
        NEW.componentepadre_componente, NEW.retroalimentacion_componente,
        NEW.fkidtipocomponente_componente, NEW.fkidjuego_componente
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--update new y old
CREATE OR REPLACE FUNCTION func_componente_update() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_componente (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_componente, nombre_componente, extra_componente,
        componentepadre_componente, retroalimentacion_componente,
        fkidtipocomponente_componente, fkidjuego_componente
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        NEW.pkid_componente, NEW.nombre_componente, NEW.extra_componente,
        NEW.componentepadre_componente, NEW.retroalimentacion_componente,
        NEW.fkidtipocomponente_componente, NEW.fkidjuego_componente
    );
    INSERT INTO auditoria.aud_componente (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_componente, nombre_componente, extra_componente,
        componentepadre_componente, retroalimentacion_componente,
        fkidtipocomponente_componente, fkidjuego_componente
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'UPDATE',
        OLD.pkid_componente, OLD.nombre_componente, OLD.extra_componente,
        OLD.componentepadre_componente, OLD.retroalimentacion_componente,
        OLD.fkidtipocomponente_componente, OLD.fkidjuego_componente
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
--delete
CREATE OR REPLACE FUNCTION func_componente_delete() RETURNS TRIGGER
AS $$
BEGIN
    INSERT INTO auditoria.aud_componente (
        fecha_aud, usuario_aud, operacion_aud,
        pkid_componente, nombre_componente, extra_componente,
        componentepadre_componente, retroalimentacion_componente,
        fkidtipocomponente_componente, fkidjuego_componente
    ) VALUES (
        CURRENT_TIMESTAMP, CURRENT_USER, 'DELETE',
        OLD.pkid_componente, OLD.nombre_componente, OLD.extra_componente,
        OLD.componentepadre_componente, OLD.retroalimentacion_componente,
        OLD.fkidtipocomponente_componente, OLD.fkidjuego_componente
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;