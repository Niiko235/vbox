-------------------------------------------------------------------
--                      TIPOS ENUMERADOS                         --
-------------------------------------------------------------------
CREATE TYPE tipo_universidad AS ENUM ('privada', 'publica');
CREATE TYPE tipo_enlace AS ENUM ('Sitio web', 'Documento', 'Video', 'Otro');
CREATE TYPE tipooperacion_auditoria AS ENUM ('INSERT', 'UPDATE', 'DELETE');
CREATE TYPE tipo_perfil AS ENUM ('estudiante', 'profesor', 'administrador');

-------------------------------------------------------------------
--                         TABLAS PRINCIPALES                    --
-------------------------------------------------------------------

CREATE TABLE public.universidad (
    pkcodigoies_universidad INT NOT NULL,
    nombre_universidad VARCHAR(20) NOT NULL,
    tipo_universidad tipo_universidad NOT NULL
);

CREATE TABLE public.programa (
    pkcodigo_programa INT NOT NULL,
    nombre_programa VARCHAR(20) NOT NULL,
    fkiduniversidad_programa INT NOT NULL
);

CREATE TABLE public.perfil (
    pkcc_perfil BIGINT NOT NULL,
    primernombre_perfil VARCHAR(15) NOT NULL,
    segundonombre_perfil VARCHAR(30),
    primerapellido_perfil VARCHAR(15) NOT NULL,
    segundoapellido_perfil VARCHAR(30),
    rol tipo_perfil NOT NULL,
    fechanacimiento_perfil TIMESTAMP NOT NULL,
    telefono_perfil BIGINT UNIQUE NOT NULL,
    email_perfil VARCHAR(30) NOT NULL,
    contrasenia_perfil VARCHAR(10) NOT NULL,
    fkcodigoprograma_perfil INT NOT NULL
);

CREATE TABLE public.curso (
    pkid_curso INT NOT NULL,
    nombre_curso VARCHAR(25) NOT NULL,
    descripcion_curso VARCHAR(500) NOT NULL,
    imagen_curso TEXT NOT NULL,
    fechacreacion_curso TIMESTAMP NOT NULL DEFAULT NOW(),
    pfkidadministrador_curso BIGINT NOT NULL
);

CREATE TABLE public.grupo (
    pkid_grupo INT NOT NULL,
    fechacreacion_grupo TIMESTAMP NOT NULL DEFAULT NOW(),
    nombre_grupo VARCHAR(20) NOT NULL,
    descripcion_grupo VARCHAR(500) NOT NULL,
    fkidprofesorcursoimpartido_grupo BIGINT NOT NULL,
    fkidcursocursoimpartido_grupo INT NOT NULL
);

CREATE TABLE public.cursoimpartido(
    pfkidcurso_cursoimpartido INT NOT NULL,
    pfkidprofesor_cursoimpartido BIGINT NOT NULL
);


CREATE TABLE public.participacion (
    pfkidestudiante_participacion BIGINT NOT NULL,
    pfkidgrupo_participacion INT NOT NULL,
    estado_participacion BOOLEAN NOT NULL DEFAULT FALSE,
    fecharegistro_participacion TIMESTAMP NOT NULL DEFAULT NOW(),
    puntuaciontotal_participacion INT NOT NULL DEFAULT 0,
    puntuaciontotalmaterial_participacion INT NOT NULL DEFAULT 0,
    puntuaciontotallink_participacion INT NOT NULL DEFAULT 0
);

CREATE TABLE public.certificado (
    pfkidestudianteparticipacion_certificado BIGINT NOT NULL,
    pfkidgrupoparticipacion_certificado INT NOT NULL,
    titulo_certificado VARCHAR(20) NOT NULL,
    fechaentregado_certificado TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE public.refuerzo (
    pkid_refuerzo INT NOT NULL,
    explicacion_refuerzo TEXT NOT NULL,
    puntuacion_refuerzo INT NOT NULL DEFAULT 0,
    fkidgrupo_refuerzo INT NOT NULL,
    fkidmodulo_refuerzo INT NOT NULL
);

CREATE TABLE public.enlace (
    pkid_enlace INT NOT NULL,
    tipo_enlace tipo_enlace NOT NULL,
    contenido_enlace TEXT NOT NULL,
    puntuacion_enlace INT NOT NULL DEFAULT 0,
    fkidrefuerzo_enlace INT NOT NULL
);

CREATE TABLE public.ingresorefuerzo (
    pkid_ingresorefuerzo INT NOT NULL,
    puntuacionobtenida_ingresorefuerzo INT NOT NULL DEFAULT 0,
    fecharegistro_ingresorefuerzo TIMESTAMP NOT NULL DEFAULT NOW(),
    fkidestudianteparticipacion_ingresorefuerzo BIGINT NOT NULL,
    fkidgrupoparticipacion_ingresorefuerzo INT NOT NULL,
    fkidrefuerzo_ingresorefuerzo INT NOT NULL
);

CREATE TABLE public.ingresoenlace (
    pkid_ingresoenlace INT NOT NULL,
    puntuacionobtenida_ingresoenlace INT NOT NULL DEFAULT 0,
    fecharegistro_ingresoenlace TIMESTAMP NOT NULL DEFAULT NOW(),
    fkidestudianteparticipacion_ingresoenlace BIGINT NOT NULL,
    fkidgrupoparticipacion_ingresoenlace INT NOT NULL,
    fkidenlace_ingresoenlace INT NOT NULL
);

CREATE TABLE public.modulo (
    pkid_modulo INT NOT NULL,
    numerorefuerzos_modulo INT NOT NULL DEFAULT 0,
    nombre_modulo VARCHAR(20) NOT NULL,
    fkidcurso_modulo INT NOT NULL
);

CREATE TABLE public.teoria (
    pkid_teoria INT NOT NULL,
    nombre_teoria VARCHAR(20) NOT NULL,
    contenido_teoria TEXT NOT NULL,
    orden_teoria INT NOT NULL DEFAULT 0,
    fkidmodulo_teoria INT NOT NULL
);

CREATE TABLE public.actividad (
    pkid_actividad INT NOT NULL,
    nombre_actividad VARCHAR(20) NOT NULL,
    url_actividad TEXT NOT NULL,
    disponible_actividad BOOLEAN NOT NULL DEFAULT FALSE,
    fkidteoria_actividad INT NOT NULL
);

CREATE TABLE public.juego (
    pkid_juego INT NOT NULL,
    nombre_juego VARCHAR(20) NOT NULL,
    descripcion_juego VARCHAR(500) NOT NULL,
    puntuacion_juego INT NOT NULL DEFAULT 0,
    fkidmodulo_juego INT NOT NULL,
    fkidgrupo_juego INT NOT NULL
);

CREATE TABLE public.juegoelegido (
    pfkidjuego_juegoelegido INT NOT NULL,
    pfkidgrupo_juegoelegido INT NOT NULL
);

CREATE TABLE public.ingresojuego (
    pkid_ingresojuego INT NOT NULL,
    puntuacionobtenida_ingresojuego INT NOT NULL DEFAULT 0,
    fecharegistro_ingresojuego TIMESTAMP NOT NULL DEFAULT NOW(),
    fkidestudianteparticipacion_ingresojuego BIGINT NOT NULL,
    fkidgrupoparticipacion_ingresojuego INT NOT NULL,
    fkidjuegojuegoelegido_ingresojuego INT NOT NULL,
    fkidgrupojuegoelegido_ingresojuego INT NOT NULL
);

CREATE TABLE public.tipocomponente (
    pkid_tipocomponente INT NOT NULL,
    nombre_tipocomponente VARCHAR(20) NOT NULL,
    fkidmodulo_tipocomponente INT NOT NULL
);

CREATE TABLE public.componente (
    pkid_componente INT NOT NULL,
    nombre_componente VARCHAR(20),
    extra_componente JSON,
    componentepadre_componente INT,
    retroalimentacion_componente TEXT,
    fkidtipocomponente_componente INT NOT NULL,
    fkidjuego_componente INT NOT NULL
);

-------------------------------------------------------------------
--                         PRIMARY KEYS                          --
-------------------------------------------------------------------
ALTER TABLE public.universidad ADD CONSTRAINT pk_universidad PRIMARY KEY (pkcodigoies_universidad);

ALTER TABLE public.programa ADD CONSTRAINT pk_programa PRIMARY KEY (pkcodigo_programa);

ALTER TABLE public.perfil ADD CONSTRAINT pk_perfil PRIMARY KEY (pkcc_perfil);

ALTER TABLE public.curso ADD CONSTRAINT pk_curso PRIMARY KEY (pkid_curso);

ALTER TABLE public.grupo ADD CONSTRAINT pk_grupo PRIMARY KEY (pkid_grupo);

ALTER TABLE public.cursoimpartido ADD CONSTRAINT pk_cursoimpartido PRIMARY KEY (pfkidcurso_cursoimpartido, pfkidprofesor_cursoimpartido);

ALTER TABLE public.participacion ADD CONSTRAINT pk_participacion PRIMARY KEY (pfkidestudiante_participacion, pfkidgrupo_participacion);

ALTER TABLE public.certificado ADD CONSTRAINT pk_certificado PRIMARY KEY (pfkidestudianteparticipacion_certificado, pfkidgrupoparticipacion_certificado);

ALTER TABLE public.refuerzo ADD CONSTRAINT pk_refuerzo PRIMARY KEY (pkid_refuerzo);

ALTER TABLE public.enlace ADD CONSTRAINT pk_enlace PRIMARY KEY (pkid_enlace);

ALTER TABLE public.ingresorefuerzo ADD CONSTRAINT pk_ingresorefuerzo PRIMARY KEY (pkid_ingresorefuerzo);

ALTER TABLE public.ingresoenlace ADD CONSTRAINT pk_ingresoenlace PRIMARY KEY (pkid_ingresoenlace);

ALTER TABLE public.modulo ADD CONSTRAINT pk_modulo PRIMARY KEY (pkid_modulo);

ALTER TABLE public.teoria ADD CONSTRAINT pk_teoria PRIMARY KEY (pkid_teoria);

ALTER TABLE public.actividad ADD CONSTRAINT pk_actividad PRIMARY KEY (pkid_actividad);

ALTER TABLE public.juego ADD CONSTRAINT pk_juego PRIMARY KEY (pkid_juego);

ALTER TABLE public.juegoelegido ADD CONSTRAINT pk_juegoelegido PRIMARY KEY (pfkidjuego_juegoelegido, pfkidgrupo_juegoelegido);

ALTER TABLE public.ingresojuego ADD CONSTRAINT pk_ingresojuego PRIMARY KEY (pkid_ingresojuego);

ALTER TABLE public.tipocomponente ADD CONSTRAINT pk_tipocomponente PRIMARY KEY (pkid_tipocomponente);

ALTER TABLE public.componente ADD CONSTRAINT pk_componente PRIMARY KEY (pkid_componente);


-------------------------------------------------------------------
--                         FOREIGN KEYS                          --
-------------------------------------------------------------------


ALTER TABLE public.programa 
    ADD CONSTRAINT 
        fk_programa_universidad 
    FOREIGN KEY 
        (fkiduniversidad_programa) 
    REFERENCES 
        public.universidad (pkcodigoies_universidad);

ALTER TABLE public.perfil 
    ADD CONSTRAINT 
        fk_perfil_programa 
    FOREIGN KEY 
        (fkcodigoprograma_perfil) 
    REFERENCES 
        public.programa (pkcodigo_programa);

ALTER TABLE public.curso 
    ADD CONSTRAINT 
        fk_curso_administrador 
    FOREIGN KEY 
        (pfkidadministrador_curso) 
    REFERENCES 
        public.perfil (pkcc_perfil);

ALTER TABLE public.grupo 
    ADD CONSTRAINT 
        fk_grupo_cursoimpartido
    FOREIGN KEY
        (fkidcursocursoimpartido_grupo, fkidprofesorcursoimpartido_grupo)
    REFERENCES
        public.cursoimpartido (pfkidcurso_cursoimpartido, pfkidprofesor_cursoimpartido);

ALTER TABLE public.participacion 
    ADD CONSTRAINT 
        fk_participacion_estudiante 
    FOREIGN KEY 
        (pfkidestudiante_participacion) 
    REFERENCES 
        public.perfil (pkcc_perfil);

ALTER TABLE public.participacion 
    ADD CONSTRAINT 
        fk_participacion_grupo 
    FOREIGN KEY 
        (pfkidgrupo_participacion) 
    REFERENCES 
        public.grupo (pkid_grupo);

ALTER TABLE public.certificado 
    ADD CONSTRAINT 
        fk_certificado_participacion 
    FOREIGN KEY 
        (pfkidestudianteparticipacion_certificado, 
    pfkidgrupoparticipacion_certificado)
         REFERENCES public.participacion (pfkidestudiante_participacion, pfkidgrupo_participacion);

ALTER TABLE public.refuerzo 
    ADD CONSTRAINT 
        fk_refuerzo_grupo 
    FOREIGN KEY 
        (fkidgrupo_refuerzo) 
    REFERENCES 
        public.grupo (pkid_grupo);

ALTER TABLE public.refuerzo 
    ADD CONSTRAINT 
        fk_refuerzo_modulo 
    FOREIGN KEY 
        (fkidmodulo_refuerzo) 
    REFERENCES 
        public.modulo (pkid_modulo);

ALTER TABLE public.enlace 
    ADD CONSTRAINT 
        fk_enlace_refuerzo 
    FOREIGN KEY 
        (fkidrefuerzo_enlace) 
    REFERENCES 
        public.refuerzo (pkid_refuerzo);

ALTER TABLE public.ingresorefuerzo 
    ADD CONSTRAINT 
        fk_ingresorefuerzo_participacion 
    FOREIGN KEY 
        (fkidestudianteparticipacion_ingresorefuerzo, 
    fkidgrupoparticipacion_ingresorefuerzo)
         REFERENCES public.participacion (pfkidestudiante_participacion, pfkidgrupo_participacion);

ALTER TABLE public.ingresorefuerzo 
    ADD CONSTRAINT 
        fk_ingresorefuerzo_refuerzo 
    FOREIGN KEY 
        (fkidrefuerzo_ingresorefuerzo) 
    REFERENCES 
        public.refuerzo (pkid_refuerzo);

ALTER TABLE public.ingresoenlace 
    ADD CONSTRAINT 
        fk_ingresoenlace_participacion 
    FOREIGN KEY 
        (fkidestudianteparticipacion_ingresoenlace, 
    fkidgrupoparticipacion_ingresoenlace)
         REFERENCES public.participacion (pfkidestudiante_participacion, pfkidgrupo_participacion);

ALTER TABLE public.ingresoenlace 
    ADD CONSTRAINT 
        fk_ingresoenlace_enlace 
    FOREIGN KEY 
        (fkidenlace_ingresoenlace) 
    REFERENCES 
        public.enlace (pkid_enlace);

ALTER TABLE public.modulo 
    ADD CONSTRAINT 
        fk_modulo_curso 
    FOREIGN KEY 
        (fkidcurso_modulo) 
    REFERENCES 
        public.curso (pkid_curso);

ALTER TABLE public.teoria 
    ADD CONSTRAINT 
        fk_teoria_modulo 
    FOREIGN KEY 
        (fkidmodulo_teoria) 
    REFERENCES 
        public.modulo (pkid_modulo);

ALTER TABLE public.actividad 
    ADD CONSTRAINT 
        fk_actividad_teoria 
    FOREIGN KEY 
        (fkidteoria_actividad) 
    REFERENCES 
        public.teoria (pkid_teoria);

ALTER TABLE public.juego 
    ADD CONSTRAINT 
        fk_juego_modulo 
    FOREIGN KEY 
        (fkidmodulo_juego) 
    REFERENCES 
        public.modulo (pkid_modulo);

ALTER TABLE public.juego 
    ADD CONSTRAINT 
        fk_juego_grupo 
    FOREIGN KEY 
        (fkidgrupo_juego) 
    REFERENCES 
        public.grupo (pkid_grupo);

ALTER TABLE public.juegoelegido 
    ADD CONSTRAINT 
        fk_juegoelegido_juego 
    FOREIGN KEY 
        (pfkidjuego_juegoelegido) 
    REFERENCES 
        public.juego (pkid_juego);

ALTER TABLE public.juegoelegido 
    ADD CONSTRAINT 
        fk_juegoelegido_grupo 
    FOREIGN KEY 
        (pfkidgrupo_juegoelegido) 
    REFERENCES 
        public.grupo (pkid_grupo);

ALTER TABLE public.ingresojuego 
    ADD CONSTRAINT 
        fk_ingresojuego_participacion 
    FOREIGN KEY 
        (fkidestudianteparticipacion_ingresojuego, 
    fkidgrupoparticipacion_ingresojuego)
         REFERENCES public.participacion (pfkidestudiante_participacion, pfkidgrupo_participacion);

ALTER TABLE public.ingresojuego 
    ADD CONSTRAINT 
        fk_ingresojuego_juegoelegido 
    FOREIGN KEY 
        (fkidjuegojuegoelegido_ingresojuego, 
    fkidgrupojuegoelegido_ingresojuego)
         REFERENCES public.juegoelegido (pfkidjuego_juegoelegido, pfkidgrupo_juegoelegido);

ALTER TABLE public.tipocomponente 
    ADD CONSTRAINT 
        fk_tipocomponente_modulo 
    FOREIGN KEY 
        (fkidmodulo_tipocomponente) 
    REFERENCES 
        public.modulo (pkid_modulo);

ALTER TABLE public.componente 
    ADD CONSTRAINT 
        fk_componente_tipocomponente 
    FOREIGN KEY 
        (fkidtipocomponente_componente) 
    REFERENCES 
        public.tipocomponente (pkid_tipocomponente);

ALTER TABLE public.componente 
    ADD CONSTRAINT 
        fk_componente_juego 
    FOREIGN KEY 
        (fkidjuego_componente) 
    REFERENCES 
        public.juego (pkid_juego);

ALTER TABLE public.componente 
    ADD CONSTRAINT 
        fk_componente_padre 
    FOREIGN KEY 
        (componentepadre_componente) 
    REFERENCES 
        public.componente (pkid_componente);


        -------------------------------------------------------------------
--                          AUDITORÍA                            --
-------------------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS auditoria;

CREATE TABLE auditoria.aud_universidad (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkcodigoies_universidad INT,
    nombre_universidad VARCHAR(20),
    tipo_universidad tipo_universidad
);

CREATE TABLE auditoria.aud_programa (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkcodigo_programa INT,
    nombre_programa VARCHAR(20),
    fkiduniversidad_programa INT
);

CREATE TABLE auditoria.aud_perfil (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkcc_perfil BIGINT,
    primernombre_perfil VARCHAR(15),
    segundonombre_perfil VARCHAR(30),
    primerapellido_perfil VARCHAR(15),
    segundoapellido_perfil VARCHAR(30),
    rol tipo_perfil,
    fechanacimiento_perfil TIMESTAMP,
    telefono_perfil BIGINT,
    email_perfil VARCHAR(30),
    contrasenia_perfil VARCHAR(10),
    fkcodigoprograma_perfil INT
);

CREATE TABLE auditoria.aud_curso (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkid_curso INT,
    nombre_curso VARCHAR(25),
    descripcion_curso VARCHAR(500),
    imagen_curso TEXT,
    fechacreacion_curso TIMESTAMP,
    pfkidadministrador_curso BIGINT
);

CREATE TABLE auditoria.aud_cursoimpartido (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pfkidcurso_cursoimpartido INT,
    pfkidprofesor_cursoimpartido BIGINT
);

CREATE TABLE auditoria.aud_grupo (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkid_grupo INT,
    fechacreacion_grupo TIMESTAMP,
    nombre_grupo VARCHAR(20),
    descripcion_grupo VARCHAR(500),
    fkidprofesorcursoimpartido_grupo BIGINT,
    fkidcursocursoimpartido_grupo INT
);

CREATE TABLE auditoria.aud_participacion (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pfkidestudiante_participacion BIGINT,
    pfkidgrupo_participacion INT,
    estado_participacion BOOLEAN,
    fecharegistro_participacion TIMESTAMP,
    puntuaciontotal_participacion INT,
    puntuaciontotalmaterial_participacion INT,
    puntuaciontotallink_participacion INT
);

CREATE TABLE auditoria.aud_certificado (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pfkidestudianteparticipacion_certificado BIGINT,
    pfkidgrupoparticipacion_certificado INT,
    titulo_certificado VARCHAR(20),
    fechaentregado_certificado TIMESTAMP
);

CREATE TABLE auditoria.aud_refuerzo (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkid_refuerzo INT,
    explicacion_refuerzo TEXT,
    puntuacion_refuerzo INT,
    fkidgrupo_refuerzo INT,
    fkidmodulo_refuerzo INT
);

CREATE TABLE auditoria.aud_enlace (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkid_enlace INT,
    tipo_enlace tipo_enlace,
    contenido_enlace TEXT,
    puntuacion_enlace INT,
    fkidrefuerzo_enlace INT
);

CREATE TABLE auditoria.aud_ingresorefuerzo (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkid_ingresorefuerzo INT,
    puntuacionobtenida_ingresorefuerzo INT,
    fecharegistro_ingresorefuerzo TIMESTAMP,
    fkidestudianteparticipacion_ingresorefuerzo BIGINT,
    fkidgrupoparticipacion_ingresorefuerzo INT,
    fkidrefuerzo_ingresorefuerzo INT
);

CREATE TABLE auditoria.aud_ingresoenlace (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkid_ingresoenlace INT,
    puntuacionobtenida_ingresoenlace INT,
    fecharegistro_ingresoenlace TIMESTAMP,
    fkidestudianteparticipacion_ingresoenlace BIGINT,
    fkidgrupoparticipacion_ingresoenlace INT,
    fkidenlace_ingresoenlace INT
);

CREATE TABLE auditoria.aud_modulo (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkid_modulo INT,
    numerorefuerzos_modulo INT,
    nombre_modulo VARCHAR(20),
    fkidcurso_modulo INT
);

CREATE TABLE auditoria.aud_teoria (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkid_teoria INT,
    nombre_teoria VARCHAR(20),
    contenido_teoria TEXT,
    orden_teoria INT,
    fkidmodulo_teoria INT
);

CREATE TABLE auditoria.aud_actividad (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkid_actividad INT,
    nombre_actividad VARCHAR(20),
    url_actividad TEXT,
    disponible_actividad BOOLEAN,
    fkidteoria_actividad INT
);

CREATE TABLE auditoria.aud_juego (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkid_juego INT,
    nombre_juego VARCHAR(20),
    descripcion_juego VARCHAR(500),
    puntuacion_juego INT,
    fkidmodulo_juego INT,
    fkidgrupo_juego INT
);

CREATE TABLE auditoria.aud_juegoelegido (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pfkidjuego_juegoelegido INT,
    pfkidgrupo_juegoelegido INT
);

CREATE TABLE auditoria.aud_ingresojuego (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkid_ingresojuego INT,
    puntuacionobtenida_ingresojuego INT,
    fecharegistro_ingresojuego TIMESTAMP,
    fkidestudianteparticipacion_ingresojuego BIGINT,
    fkidgrupoparticipacion_ingresojuego INT,
    fkidjuegojuegoelegido_ingresojuego INT,
    fkidgrupojuegoelegido_ingresojuego INT
);

CREATE TABLE auditoria.aud_tipocomponente (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkid_tipocomponente INT,
    nombre_tipocomponente VARCHAR(20),
    fkidmodulo_tipocomponente INT
);

CREATE TABLE auditoria.aud_componente (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkid_componente INT,
    nombre_componente VARCHAR(20),
    extra_componente JSON,
    componentepadre_componente INT,
    retroalimentacion_componente TEXT,
    fkidtipocomponente_componente INT,
    fkidjuego_componente INT
);

--------------------------------------------------------------------------
--                          SECUENCIAS                            --
--------------------------------------------------------------------------



CREATE SEQUENCE IF NOT EXISTS ingresojuego_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



-- Secuencia para módulos
CREATE SEQUENCE IF NOT EXISTS modulo_seq
  START WITH 1
  INCREMENT BY 1
  MAXVALUE 9900
  CACHE 1
  NO CYCLE;


-- Secuencia para teorias
CREATE SEQUENCE IF NOT EXISTS teoria_seq
  START WITH 1
  INCREMENT BY 1
  MAXVALUE 9900
  CACHE 1
  NO CYCLE;


-- Secuencia para actividades
CREATE SEQUENCE IF NOT EXISTS actividad_seq
  START WITH 1
  INCREMENT BY 1
  MAXVALUE 9900
  CACHE 1
  NO CYCLE;



--------------------------------------------------------------------------
--                          TRIGGERS                              --
--------------------------------------------------------------------------



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



--insert de pruebas

-- ============================================================
-- 1. universidad
-- ============================================================
 
INSERT INTO public.universidad (pkcodigoies_universidad, nombre_universidad, tipo_universidad) VALUES
(1, 'UniversidadAmazonia',    'publica'),
(2, 'UniAndes',       'privada'),
(3, 'UniCordoba',     'publica');
 
 
-- ============================================================
-- 2. programa
-- ============================================================
 
INSERT INTO public.programa (pkcodigo_programa, nombre_programa, fkiduniversidad_programa) VALUES
(101, 'Ing. Sistemas',   1),
(102, 'Medicina',        2),
(103, 'Derecho',         3);
 
 
-- ============================================================
-- 3. perfil
-- ============================================================
 
INSERT INTO public.perfil (
    pkcc_perfil, primernombre_perfil, segundonombre_perfil,
    primerapellido_perfil, segundoapellido_perfil, rol,
    fechanacimiento_perfil, telefono_perfil, email_perfil,
    contrasenia_perfil, fkcodigoprograma_perfil
) VALUES
(1001, 'Carlos',   'Andres',  'Perez',   'Lopez',   'administrador', '1980-03-15', 3001234567, 'caperez@uni.edu',   'admin123',  101),
(1002, 'Laura',    'Maria',   'Gomez',   'Torres',  'profesor',      '1985-07-22', 3109876543, 'lagomez@uni.edu',   'prof456',   102),
(1003, 'Santiago', NULL,      'Ramirez', 'Herrera', 'estudiante',    '2001-11-05', 3207654321, 'saramirez@uni.edu', 'est789',    101),
(1004, 'Valentina','Paola',   'Rios',    NULL,      'estudiante',    '2002-04-18', 3158887766, 'vrios@uni.edu',     'est321',    102),
(1005, 'Andres',   'Felipe',  'Mora',    'Castro',  'profesor',      '1990-09-30', 3001122334, 'afmora@uni.edu',    'prof789',   103);
 
 
-- ============================================================
-- 4. curso
-- ============================================================
 
INSERT INTO public.curso (
    pkid_curso, nombre_curso, descripcion_curso,
    imagen_curso, fechacreacion_curso, pfkidadministrador_curso
) VALUES
(1, 'Python Basico',   'Introduccion a la programacion con Python.',         'https://img.uni.edu/python.png',   '2024-01-10 08:00:00', 1001),
(2, 'Bases de Datos',  'Fundamentos de SQL y modelado relacional.',           'https://img.uni.edu/bd.png',       '2024-01-15 09:00:00', 1001),
(3, 'Redes I',         'Conceptos basicos de redes y telecomunicaciones.',   'https://img.uni.edu/redes.png',    '2024-02-01 10:00:00', 1001);
 
-- ============================================================
-- 5. CURSO IMPARTIDO
-- ============================================================

INSERT INTO public.cursoimpartido (pfkidcurso_cursoimpartido, pfkidprofesor_cursoimpartido) VALUES
(1, 1002),
(2, 1005),
(3, 1002);

 
-- ============================================================
-- 6. grupo
-- ============================================================
 
INSERT INTO public.grupo (
    pkid_grupo, fechacreacion_grupo, nombre_grupo,
    descripcion_grupo, fkidprofesorcursoimpartido_grupo, fkidcursocursoimpartido_grupo
) VALUES
(1, '2024-02-05 08:00:00', 'Grupo A',  'Grupo A de Python Basico semestre 2024-1.',   1002, 1),
(2, '2024-02-05 08:30:00', 'Grupo B',  'Grupo B de Bases de Datos semestre 2024-1.',  1005, 2),
(3, '2024-02-06 09:00:00', 'Grupo C',  'Grupo C de Redes I semestre 2024-1.',         1002, 3);
 
 
-- ============================================================
-- 7. participación
-- ============================================================
 
INSERT INTO public.participacion (
    pfkidestudiante_participacion, pfkidgrupo_participacion,
    estado_participacion, fecharegistro_participacion,
    puntuaciontotal_participacion, puntuaciontotalmaterial_participacion,
    puntuaciontotallink_participacion
) VALUES
(1003, 1, TRUE,  '2024-02-10 10:00:00', 85,  50, 35),
(1004, 2, TRUE,  '2024-02-10 10:30:00', 70,  40, 30),
(1003, 2, FALSE, '2024-02-11 08:00:00',  0,   0,  0),
(1004, 3, TRUE,  '2024-02-12 09:00:00', 60,  35, 25);
 
 
-- ============================================================
-- 8. certificado
-- ============================================================
 
INSERT INTO public.certificado (
    pfkidestudianteparticipacion_certificado,
    pfkidgrupoparticipacion_certificado,
    titulo_certificado, fechaentregado_certificado
) VALUES
(1003, 1, 'Cert. Python',  '2024-06-20 12:00:00'),
(1004, 2, 'Cert. BD',      '2024-06-21 12:00:00'),
(1004, 3, 'Cert. Redes',   '2024-06-22 12:00:00');
 
 
-- ============================================================
-- 9. modulo
-- ============================================================
 
INSERT INTO public.modulo (pkid_modulo, numerorefuerzos_modulo, nombre_modulo, fkidcurso_modulo) VALUES
(1, 3, 'Variables',    1),
(2, 2, 'Funciones',    1),
(3, 4, 'Modelo ER',    2),
(4, 2, 'SQL Basico',   2),
(5, 3, 'Capa Fisica',  3);
 
 
-- ============================================================
-- 10. refuerzo
-- ============================================================
 
INSERT INTO public.refuerzo (
    pkid_refuerzo, explicacion_refuerzo,
    puntuacion_refuerzo, fkidgrupo_refuerzo, fkidmodulo_refuerzo
) VALUES
(1, 'Repaso de tipos de datos en Python y ejemplos practicos.',     10, 1, 1),
(2, 'Ejercicios de funciones con parametros y retorno.',            15, 1, 2),
(3, 'Practica de diagramas entidad-relacion con casos reales.',     10, 2, 3),
(4, 'Consultas SELECT basicas con filtros WHERE y ORDER BY.',       20, 2, 4),
(5, 'Introduccion a medios de transmision y topologias de red.',    10, 3, 5);
 
 
-- ============================================================
-- 11. enlace
-- ============================================================
 
INSERT INTO public.enlace (
    pkid_enlace, tipo_enlace, contenido_enlace,
    puntuacion_enlace, fkidrefuerzo_enlace
) VALUES
(1, 'Video',      'https://youtube.com/python-variables',       5,  1),
(2, 'Documento',  'https://docs.uni.edu/python-variables.pdf',  5,  1),
(3, 'Sitio web',  'https://w3schools.com/python/functions',     5,  2),
(4, 'Video',      'https://youtube.com/modelo-er-intro',        5,  3),
(5, 'Documento',  'https://docs.uni.edu/sql-basico.pdf',        10, 4),
(6, 'Sitio web',  'https://cisco.com/redes-basico',             5,  5);
 
 
-- ============================================================
-- 12. ingresorefuerzo
-- ============================================================
 
INSERT INTO public.ingresorefuerzo (
    pkid_ingresorefuerzo, puntuacionobtenida_ingresorefuerzo,
    fecharegistro_ingresorefuerzo,
    fkidestudianteparticipacion_ingresorefuerzo,
    fkidgrupoparticipacion_ingresorefuerzo,
    fkidrefuerzo_ingresorefuerzo
) VALUES
(1, 10, '2024-03-05 10:00:00', 1003, 1, 1),
(2, 12, '2024-03-06 11:00:00', 1003, 1, 2),
(3,  8, '2024-03-07 09:30:00', 1004, 2, 3),
(4, 18, '2024-03-08 14:00:00', 1004, 2, 4),
(5,  7, '2024-03-09 10:00:00', 1004, 3, 5);
 
 
-- ============================================================
-- 13. ingresoenlace
-- ============================================================
 
INSERT INTO public.ingresoenlace (
    pkid_ingresoenlace, puntuacionobtenida_ingresoenlace,
    fecharegistro_ingresoenlace,
    fkidestudianteparticipacion_ingresoenlace,
    fkidgrupoparticipacion_ingresoenlace,
    fkidenlace_ingresoenlace
) VALUES
(1, 5,  '2024-03-05 10:30:00', 1003, 1, 1),
(2, 5,  '2024-03-05 11:00:00', 1003, 1, 2),
(3, 5,  '2024-03-06 09:00:00', 1004, 2, 4),
(4, 10, '2024-03-07 14:30:00', 1004, 2, 5),
(5, 5,  '2024-03-08 10:00:00', 1004, 3, 6);
 
 
-- ============================================================
-- 14. teoria
-- ============================================================
 
INSERT INTO public.teoria (
    pkid_teoria, nombre_teoria, contenido_teoria,
    orden_teoria, fkidmodulo_teoria
) VALUES
(1, 'Que es Python',     'Python es un lenguaje interpretado, dinamico y multiparadigma.',          1, 1),
(2, 'Tipos de datos',    'En Python los tipos principales son int, float, str, bool y list.',       2, 1),
(3, 'Def y Return',      'Las funciones se definen con def y pueden retornar valores con return.',   1, 2),
(4, 'Entidades',         'Una entidad representa un objeto del mundo real en el modelo ER.',        1, 3),
(5, 'Relaciones ER',     'Las relaciones conectan entidades con cardinalidad 1:1, 1:N o N:M.',      2, 3),
(6, 'SELECT basico',     'SELECT * FROM tabla WHERE condicion ORDER BY columna;',                   1, 4),
(7, 'Medios fisicos',    'Los medios de transmision pueden ser cableados o inalambricos.',          1, 5);
 
 
-- ============================================================
-- 15. actividad
-- ============================================================
 
INSERT INTO public.actividad (
    pkid_actividad, nombre_actividad, url_actividad,
    disponible_actividad, fkidteoria_actividad
) VALUES
(1, 'Quiz Variables',   'https://act.uni.edu/quiz-variables',   TRUE,  2),
(2, 'Ejerc Funciones',  'https://act.uni.edu/ejerc-funciones',  TRUE,  3),
(3, 'Quiz Entidades',   'https://act.uni.edu/quiz-entidades',   TRUE,  4),
(4, 'Taller ER',        'https://act.uni.edu/taller-er',        FALSE, 5),
(5, 'Quiz SELECT',      'https://act.uni.edu/quiz-select',      TRUE,  6),
(6, 'Lab Redes',        'https://act.uni.edu/lab-redes',        FALSE, 7);
 
 
-- ============================================================
-- 16. juego
-- ============================================================
 
INSERT INTO public.juego (
    pkid_juego, nombre_juego, descripcion_juego,
    puntuacion_juego, fkidmodulo_juego, fkidgrupo_juego
) VALUES
(1, 'Ahorcado Py',    'Adivina el termino de programacion en Python.',   20, 1, 1),
(2, 'Quiz ER',        'Preguntas de seleccion multiple sobre modelo ER.', 20, 3, 2),
(3, 'Crucigrama SQL', 'Crucigrama con comandos y clausulas SQL.',         20, 4, 2),
(4, 'Trivia Redes',   'Preguntas rapidas sobre topologias y protocolos.', 20, 5, 3);
 
 
-- ============================================================
-- 17. juegoelegido
-- ============================================================
 
INSERT INTO public.juegoelegido (pfkidjuego_juegoelegido, pfkidgrupo_juegoelegido) VALUES
(1, 1),
(2, 2),
(3, 2),
(4, 3);
 
 
-- ============================================================
-- 18. ingresojuego
-- ============================================================
 
INSERT INTO public.ingresojuego (
    pkid_ingresojuego, puntuacionobtenida_ingresojuego,
    fecharegistro_ingresojuego,
    fkidestudianteparticipacion_ingresojuego,
    fkidgrupoparticipacion_ingresojuego,
    fkidjuegojuegoelegido_ingresojuego,
    fkidgrupojuegoelegido_ingresojuego
) VALUES
(1, 18, '2024-04-10 10:00:00', 1003, 1, 1, 1),
(2, 15, '2024-04-11 11:00:00', 1004, 2, 2, 2),
(3, 20, '2024-04-12 09:00:00', 1004, 2, 3, 2),
(4, 12, '2024-04-13 14:00:00', 1004, 3, 4, 3);
 
 
-- ============================================================
-- 19. tipocomponente
-- Tipos para diagrama de clases UML (modulo 3 - Modelo ER/UML)
-- ============================================================

INSERT INTO public.tipocomponente (pkid_tipocomponente, nombre_tipocomponente, fkidmodulo_tipocomponente) VALUES
(1, 'Clase',    3),
(2, 'Atributo', 3),
(3, 'Metodo',   3),
(4, 'Relacion', 3);


-- ============================================================
-- 20. componente — Juego: "Producto y Carrito"  (pkid_juego = 1)
--
-- Jerarquia:
--   Clases (sin padre):
--     1  → Producto
--     2  → Carrito
--
--   Atributos de Producto (padre = 1):
--     3  → nombre    (private, string)
--     4  → precio    (private, number)
--     5  → stock     (private, number)
--
--   Metodos de Producto (padre = 1):
--     6  → aplicarDescuento()  (public)
--     7  → estaDisponible()    (public)
--
--   Atributos de Carrito (padre = 2):
--     8  → total     (private, number)
--     9  → cantidad  (private, number)
--
--   Metodos de Carrito (padre = 2):
--     10 → agregar() (public)
--     11 → vaciar()  (public)
-- ============================================================

-- Clases (raiz, sin padre)

INSERT INTO public.componente (
    pkid_componente, nombre_componente, extra_componente,
    componentepadre_componente, retroalimentacion_componente,
    fkidtipocomponente_componente, fkidjuego_componente
) VALUES
(1, 'Producto', '{"x": 100, "y": 150}', NULL, NULL, 1, 1),
(2, 'Carrito',  '{"x": 500, "y": 150}', NULL, NULL, 1, 1);

-- Atributos de Producto (padre = 1)

INSERT INTO public.componente (
    pkid_componente, nombre_componente, extra_componente,
    componentepadre_componente, retroalimentacion_componente,
    fkidtipocomponente_componente, fkidjuego_componente
) VALUES
(3, 'nombre', '{"visibilidad": "private", "tipo": "string"}', 1, 'nombre es un atributo de Producto, no de Carrito.', 2, 1),
(4, 'precio', '{"visibilidad": "private", "tipo": "number"}', 1, 'precio pertenece a Producto porque define su valor monetario.', 2, 1),
(5, 'stock',  '{"visibilidad": "private", "tipo": "number"}', 1, 'stock indica la cantidad disponible de un Producto.', 2, 1);

-- Metodos de Producto (padre = 1)

INSERT INTO public.componente (
    pkid_componente, nombre_componente, extra_componente,
    componentepadre_componente, retroalimentacion_componente,
    fkidtipocomponente_componente, fkidjuego_componente
) VALUES
(6, 'aplicarDescuento()', '{"visibilidad": "public", "tipo": "void"}',    1, 'aplicarDescuento() modifica el precio de un Producto.', 3, 1),
(7, 'estaDisponible()',   '{"visibilidad": "public", "tipo": "boolean"}',  1, 'estaDisponible() consulta el stock del Producto.', 3, 1);

-- Atributos de Carrito (padre = 2)

INSERT INTO public.componente (
    pkid_componente, nombre_componente, extra_componente,
    componentepadre_componente, retroalimentacion_componente,
    fkidtipocomponente_componente, fkidjuego_componente
) VALUES
(8,  'total',    '{"visibilidad": "private", "tipo": "number"}', 2, 'total es la suma de precios dentro del Carrito.', 2, 1),
(9,  'cantidad', '{"visibilidad": "private", "tipo": "number"}', 2, 'cantidad indica cuantos productos hay en el Carrito.', 2, 1);

-- Metodos de Carrito (padre = 2)

INSERT INTO public.componente (
    pkid_componente, nombre_componente, extra_componente,
    componentepadre_componente, retroalimentacion_componente,
    fkidtipocomponente_componente, fkidjuego_componente
) VALUES
(10, 'agregar()', '{"visibilidad": "public", "tipo": "void"}', 2, 'agregar() anade un producto al Carrito.', 3, 1),
(11, 'vaciar()',  '{"visibilidad": "public", "tipo": "void"}', 2, 'vaciar() elimina todos los productos del Carrito.', 3, 1);
(12, null, '{"claseOrigen": 1, "claseDestino": 2, "tipo": "Agregacion"} ', null, 'Carrito agrega Productos, ya que un Carrito puede contener múltiples Productos pero estos pueden existir de forma independiente.', 4, 1);





----------------------------------------------------------------
--               PROCEDIMIENTOS ALMACENADOS
----------------------------------------------------------------
--registrar curso

CREATE OR REPLACE PROCEDURE registrar_curso(
	IN codigocurso INT,
    IN descripcion VARCHAR,
    IN nombrecurso VARCHAR,
    IN administrador BIGINT,
    IN imagen TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
	--insertar
	INSERT INTO curso (
			pkid_curso,
    		descripcion_curso,
    		nombre_curso,
    		pfkidadministrador_curso,
    		imagen_curso
	) VALUES (
		codigocurso, descripcion, nombrecurso, administrador, imagen
	);
END;
$$;


--registrar profesor

CREATE OR REPLACE PROCEDURE registrar_profesor(
	IN cedula BIGINT,
	IN primernombre VARCHAR, 
	IN segundonombre VARCHAR, 
	IN primerapellido VARCHAR,
	IN segundoapellido VARCHAR,
	IN rol tipo_perfil,
	IN fechanacimiento TIMESTAMP,
	IN telefono BIGINT,
	IN email VARCHAR,
	IN contrasenia VARCHAR,
	IN codigoprograma INT
)
LANGUAGE plpgsql
AS $$
BEGIN
	--insertar
	INSERT INTO perfil (
		pkcc_perfil,
    		primernombre_perfil,
    		segundonombre_perfil,
    		primerapellido_perfil,
    		segundoapellido_perfil,
    		rol,
    		fechanacimiento_perfil,
    		telefono_perfil,
    		email_perfil,
    		contrasenia_perfil,
    		fkcodigoprograma_perfil
	) VALUES (
		cedula, primernombre, segundonombre, primerapellido, segundoapellido, rol,
        fechanacimiento, telefono, email, contrasenia, codigoprograma
	);
	
END;
$$;




--registrar estudiante

CREATE OR REPLACE PROCEDURE registrar_estudiante(
	IN cedula BIGINT,
	IN primernombre VARCHAR, 
	IN segundonombre VARCHAR, 
	IN primerapellido VARCHAR,
	IN segundoapellido VARCHAR,
	IN rol tipo_perfil,
	IN fechanacimiento TIMESTAMP,
	IN telefono BIGINT,
	IN email VARCHAR,
	IN contrasenia VARCHAR,
	IN codigoprograma INT
)
LANGUAGE plpgsql
AS $$
BEGIN
	--insertar
	INSERT INTO perfil (
		pkcc_perfil,
    		primernombre_perfil,
    		segundonombre_perfil,
    		primerapellido_perfil,
    		segundoapellido_perfil,
    		rol,
    		fechanacimiento_perfil,
    		telefono_perfil,
    		email_perfil,
    		contrasenia_perfil,
    		fkcodigoprograma_perfil
	) VALUES (
		cedula, primernombre, segundonombre, primerapellido, segundoapellido, rol,
        fechanacimiento, telefono, email, contrasenia, codigoprograma
	);
	
END;
$$;



----------------------------------------------------------------
--                   FUNCIONES 
----------------------------------------------------------------


CREATE OR REPLACE FUNCTION consultar_actividades(p_idteoría INT)
RETURNS TABLE (
    id          INT,
    nombre      VARCHAR,
    url         TEXT,
    disponible  BOOLEAN
)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT
        a.pkid_actividad        AS id,
        a.nombre_actividad      AS nombre,
        a.url_actividad         AS url,
        a.disponible_actividad  AS disponible
    FROM public.actividad a
    WHERE a.fkidteoria_actividad = p_idteoría;
END;
$$;



CREATE OR REPLACE FUNCTION editar_actividad(
    p_id         INT,
    p_nombre     VARCHAR,
    p_url        TEXT,
    p_disponible BOOLEAN
)
RETURNS BOOLEAN
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE actividad
    SET nombre_actividad     = p_nombre,
        url_actividad        = p_url,
        disponible_actividad = p_disponible
    WHERE pkid_actividad = p_id;

    RETURN FOUND;
END;
$$;



CREATE OR REPLACE FUNCTION eliminar_actividad(p_id INT)
RETURNS BOOLEAN
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM actividad WHERE pkid_actividad = p_id;
    RETURN FOUND;
END;
$$;




CREATE OR REPLACE FUNCTION registrar_actividad(
    p_nombre     VARCHAR,
    p_url        TEXT,
    p_disponible BOOLEAN,
    p_idteoría   INT
)
RETURNS INT
LANGUAGE plpgsql AS $$
DECLARE
    nuevo_id INT;
BEGIN
    nuevo_id := NEXTVAL('actividad_seq');

    INSERT INTO actividad (pkid_actividad, nombre_actividad, url_actividad, disponible_actividad, fkidteoria_actividad)
    VALUES (nuevo_id, p_nombre, p_url, p_disponible, p_idteoría);

    RETURN nuevo_id;
END;
$$;



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




-- traer los modulos de un curso
CREATE OR REPLACE FUNCTION consultar_modulos(p_idcurso INT)
RETURNS TABLE (
    id     INT,
    nombre VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        public.modulo.pkid_modulo AS id,
        public.modulo.nombre_modulo AS nombre
    FROM public.modulo
    WHERE public.modulo.fkidcurso_modulo = p_idcurso;
END;
$$;



-- editar el nombre de un modulo
CREATE OR REPLACE FUNCTION editar_modulo(
    p_id     INT,
    p_nombre VARCHAR
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE modulo
    SET nombre_modulo = p_nombre
    WHERE pkid_modulo = p_id;

    RETURN FOUND;
END;
$$;


-- eliminar un modulo
CREATE OR REPLACE FUNCTION eliminar_modulo(p_id INT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM modulo WHERE pkid_modulo = p_id;
    RETURN FOUND;
END;
$$;





CREATE OR REPLACE FUNCTION consultar_teorias(p_idmodulo INT)
RETURNS TABLE (
    id       INT,
    nombre   VARCHAR,
    contenido TEXT
)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.pkid_teoria   AS id,
        t.nombre_teoria AS nombre,
        t.contenido_teoria AS contenido
    FROM public.teoria t
    WHERE t.fkidmodulo_teoria = p_idmodulo
    ORDER BY t.orden_teoria;
END;
$$;




CREATE OR REPLACE FUNCTION editar_teoria(
    p_id        INT,
    p_nombre    VARCHAR,
    p_contenido TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE teoria
    SET nombre_teoria   = p_nombre,
        contenido_teoria = p_contenido
    WHERE pkid_teoria = p_id;

    RETURN FOUND;
END;
$$;




CREATE OR REPLACE FUNCTION eliminar_teoria(p_id INT)
RETURNS BOOLEAN
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM teoria WHERE pkid_teoria = p_id;
    RETURN FOUND;
END;
$$;




--traer los cursos registrados en el sistema
CREATE OR REPLACE FUNCTION consultar_curso()
RETURNS TABLE (
    id            INT,
    nombre        VARCHAR,
    descripcion   VARCHAR,
    fechacreacion TIMESTAMP
)
AS $$
BEGIN
	RETURN QUERY
	--consulta
	SELECT
        public.curso.pkid_curso as id,
        public.curso.nombre_curso as nombre,
        public.curso.descripcion_curso as descripcion,
        public.curso.fechacreacion_curso as fechacreacion
    FROM public.curso;
END;
$$
LANGUAGE plpgsql;



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




--editar nombre y descripcion de un curso
CREATE OR REPLACE FUNCTION editar_curso(
    p_id INT,
    p_nombre VARCHAR,
    p_descripcion VARCHAR
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE curso
    SET nombre_curso = p_nombre,
        descripcion_curso = p_descripcion
    WHERE pkid_curso = p_id;

    RETURN FOUND;
END;
$$;



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


--eliminar un curso registrado en el sistema
-- CREATE OR REPLACE FUNCTION eliminar_curso(
--     id INT
-- )
-- RETURNS BOOLEAN
-- AS $$ 
-- DECLARE
--     filas_afectadas INT;
-- BEGIN
--     --eliminar
--     DELETE FROM curso
--     WHERE pkid_curso = id; 
    
--     GET DIAGNOSTICS filas_afectadas = ROW_COUNT;

--     RETURN filas_afectadas > 0;
-- END;
-- $$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION eliminar_curso(
    id INT
)
RETURNS BOOLEAN
AS $$ 
BEGIN
    --eliminar
    DELETE FROM curso
    WHERE pkid_curso = id; 
    

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;


-- esta funcion se puede mejorar, que cuando no se hayan encontrados registros eliminados, se pueda mostrar un mensaje indicando que no se encontró el profesor con la cédula proporcionada. Esto se puede lograr utilizando RAISE NOTICE o RAISE EXCEPTION para proporcionar retroalimentación al usuario.



--eliminar un profesor registrado en el sistema
CREATE OR REPLACE FUNCTION eliminar_profesor(
    cedula BIGINT
)
RETURNS BOOLEAN
AS $$
BEGIN
    --eliminar
    DELETE FROM perfil
    WHERE pkcc_perfil = cedula AND rol = 'profesor';

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;


-- esta funcion se puede mejorar, que cuando no se hayan encontrados registros eliminados, se pueda mostrar un mensaje indicando que no se encontró el profesor con la cédula proporcionada. Esto se puede lograr utilizando RAISE NOTICE o RAISE EXCEPTION para proporcionar retroalimentación al usuario.



-- =====================================================================
-- FUNCIÓN: consultar_componentes_juego
-- Descripción: Retorna todos los componentes de un juego (clases,
--              atributos y métodos) junto con su tipo y datos extra.
--              Incluye clase_correcta (componentepadre_componente) que
--              es usado EXCLUSIVAMENTE por el server action de validación.
--              El frontend nunca recibe este campo.
-- Parámetros:
--   p_id_juego  INT  → ID del juego
-- Retorna:
--   id                     INT
--   nombre                 VARCHAR
--   extra                  JSON
--   retroalimentacion      TEXT
--   nombre_tipo_componente VARCHAR → 'Clase' | 'Atributo' | 'Metodo'
--   clase_correcta         INT     → padre correcto (solución); NULL para clases
-- =====================================================================

CREATE OR REPLACE FUNCTION consultar_componentes_juego(p_id_juego INT)
RETURNS TABLE (
    id                     INT,
    nombre                 VARCHAR,
    extra                  JSON,
    retroalimentacion      TEXT,
    nombre_tipo_componente VARCHAR,
    clase_correcta         INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.pkid_componente               AS id,
        c.nombre_componente             AS nombre,
        c.extra_componente              AS extra,
        c.retroalimentacion_componente  AS retroalimentacion,
        tc.nombre_tipocomponente        AS nombre_tipo_componente,
        c.componentepadre_componente    AS clase_correcta
    FROM public.componente c
    JOIN public.tipocomponente tc
        ON tc.pkid_tipocomponente = c.fkidtipocomponente_componente
    WHERE c.fkidjuego_componente = p_id_juego
    ORDER BY tc.nombre_tipocomponente, c.pkid_componente;
END;
$$
LANGUAGE plpgsql;

-- Prueba:
-- SELECT * FROM consultar_componentes_juego(1);


-- =====================================================================
-- FUNCIÓN: consultar_juego
-- Descripción: Retorna la metadata de un juego dado su ID.
-- Parámetros:
--   p_id_juego  INT  → ID del juego a consultar
-- Retorna:
--   id          INT
--   nombre      VARCHAR
--   descripcion VARCHAR
--   puntuacion  INT
-- =====================================================================

CREATE OR REPLACE FUNCTION consultar_juego(p_id_juego INT)
RETURNS TABLE (
    id          INT,
    nombre      VARCHAR,
    descripcion VARCHAR,
    puntuacion  INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        j.pkid_juego        AS id,
        j.nombre_juego      AS nombre,
        j.descripcion_juego AS descripcion,
        j.puntuacion_juego  AS puntuacion
    FROM public.juego j
    WHERE j.pkid_juego = p_id_juego;
END;
$$
LANGUAGE plpgsql;

-- Prueba:
-- SELECT * FROM consultar_juego(1);


-- =====================================================================
-- FUNCIÓN: registrar_ingresojuego
-- Descripción: Registra el resultado de un intento de juego por parte
--              de un estudiante. Retorna el ID generado.
-- Parámetros:
--   p_id_estudiante BIGINT → CC del estudiante
--   p_id_grupo      INT    → ID del grupo
--   p_id_juego      INT    → ID del juego
--   p_puntaje       INT    → Puntaje obtenido tras la validación
-- =====================================================================

CREATE OR REPLACE FUNCTION registrar_ingresojuego(
    p_id_estudiante BIGINT,
    p_id_grupo      INT,
    p_id_juego      INT,
    p_puntaje       INT
)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    nuevo_id INT;
BEGIN
    nuevo_id := NEXTVAL('ingresojuego_seq');

    INSERT INTO public.ingresojuego (
        pkid_ingresojuego,
        puntuacionobtenida_ingresojuego,
        fkidestudianteparticipacion_ingresojuego,
        fkidgrupoparticipacion_ingresojuego,
        fkidjuegojuegoelegido_ingresojuego,
        fkidgrupojuegoelegido_ingresojuego
    ) VALUES (
        nuevo_id,
        p_puntaje,
        p_id_estudiante,
        p_id_grupo,
        p_id_juego,
        p_id_grupo
    );

    RETURN nuevo_id;
END;
$$;

-- Prueba:
-- SELECT registrar_ingresojuego(123456, 1, 1, 45);




-- Traer todos los grupos a los que pertenece un estudiante
CREATE OR REPLACE FUNCTION consultar_grupos_estudiante(p_cedula BIGINT)
RETURNS TABLE (
    idgrupo       INT,
    nombregrupo   VARCHAR,
    descripcion   VARCHAR,
    fechaingreso  TIMESTAMP,
    nombrecurso   VARCHAR
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        g.pkid_grupo                       AS idgrupo,
        g.nombre_grupo                     AS nombregrupo,
        g.descripcion_grupo                AS descripcion,
        p.fecharegistro_participacion      AS fechaingreso,
        c.nombre_curso                     AS nombrecurso
    FROM public.participacion p
    JOIN public.grupo g
        ON  g.pkid_grupo = p.pfkidgrupo_participacion
    JOIN public.cursoimpartido ci
        ON  ci.pfkidcurso_cursoimpartido    = g.fkidcursocursoimpartido_grupo
        AND ci.pfkidprofesor_cursoimpartido = g.fkidprofesorcursoimpartido_grupo
    JOIN public.curso c
        ON  c.pkid_curso = ci.pfkidcurso_cursoimpartido
    WHERE p.pfkidestudiante_participacion = p_cedula;
END;
$$
LANGUAGE plpgsql;




--consultarusuario-inicio

CREATE OR REPLACE FUNCTION iniciar_sesion(email VARCHAR, contrasenia VARCHAR)
RETURNS TABLE (
	primernombre VARCHAR,
	correo VARCHAR,
	rol tipo_perfil,
	id BIGINT
)
AS $$
BEGIN
	RETURN QUERY
	--consulta
	SELECT  public.perfil.primernombre_perfil as primernombre,
		public.perfil.email_perfil as correo,
		public.perfil.rol as rol,
		public.perfil.pkcc_perfil as id
	FROM	public.perfil
	WHERE	public.perfil.email_perfil = email AND
		public.perfil.contrasenia_perfil = contrasenia;
END;
$$
LANGUAGE plpgsql;



-- Retorna todas las universidades con su ID y nombre
CREATE OR REPLACE FUNCTION retornar_universidad()
RETURNS TABLE(
	id          INT,
	nombre      VARCHAR
)
AS $$
BEGIN
	RETURN QUERY
	SELECT
		u.pkcodigoies_universidad AS id,
		u.nombre_universidad      AS nombre
	FROM public.universidad u
	ORDER BY u.pkcodigoies_universidad ASC;
END;
$$
LANGUAGE plpgsql;


-- Retorna todos los programas con su ID, nombre e ID de universidad
CREATE OR REPLACE FUNCTION retornar_programas()
RETURNS TABLE (
	id             INT,
	nombre         VARCHAR,
	id_universidad INT
)
AS $$
BEGIN
	RETURN QUERY
	SELECT
		p.pkcodigo_programa          AS id,
		p.nombre_programa            AS nombre,
		p.fkiduniversidad_programa   AS id_universidad
	FROM public.programa p
	ORDER BY p.pkcodigo_programa ASC;
END;
$$
LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION consultar_juegos_grupo_estudiante(
    p_idgrupo  INT,
    p_cedula   BIGINT
)
RETURNS TABLE (
    idjuego      INT,
    nombrejuego  VARCHAR,
    mejorpuntaje INT,
    ultimavez    TIMESTAMP
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        j.pkid_juego                                 AS idjuego,
        j.nombre_juego                               AS nombrejuego,
        MAX(ij.puntuacionobtenida_ingresojuego)::INT AS mejorpuntaje,
        MAX(ij.fecharegistro_ingresojuego)           AS ultimavez
    FROM public.participacion p
    JOIN public.juegoelegido je
        ON  je.pfkidgrupo_juegoelegido = p.pfkidgrupo_participacion
    JOIN public.juego j
        ON  j.pkid_juego = je.pfkidjuego_juegoelegido
    LEFT JOIN public.ingresojuego ij
        -- lado participacion
        ON  ij.fkidestudianteparticipacion_ingresojuego = p.pfkidestudiante_participacion
        AND ij.fkidgrupoparticipacion_ingresojuego      = p.pfkidgrupo_participacion
        -- lado juegoelegido
        AND ij.fkidjuegojuegoelegido_ingresojuego       = je.pfkidjuego_juegoelegido
        AND ij.fkidgrupojuegoelegido_ingresojuego       = je.pfkidgrupo_juegoelegido
    WHERE p.pfkidestudiante_participacion = p_cedula
      AND p.pfkidgrupo_participacion      = p_idgrupo
    GROUP BY j.pkid_juego, j.nombre_juego
    ORDER BY j.pkid_juego;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION unirse_grupo(p_cedula BIGINT, p_idgrupo INT)
RETURNS TABLE (
    idgrupo       INT,
    nombregrupo   VARCHAR,
    descripcion   VARCHAR,
    fechaingreso  TIMESTAMP,
    nombrecurso   VARCHAR
)
AS $$
BEGIN
    INSERT INTO public.participacion (
        pfkidestudiante_participacion,
        pfkidgrupo_participacion
    ) VALUES (p_cedula, p_idgrupo);

    RETURN QUERY
    SELECT
        g.pkid_grupo                       AS idgrupo,
        g.nombre_grupo                     AS nombregrupo,
        g.descripcion_grupo                AS descripcion,
        p.fecharegistro_participacion      AS fechaingreso,
        c.nombre_curso                     AS nombrecurso
    FROM public.participacion p
    JOIN public.grupo g
        ON  g.pkid_grupo = p.pfkidgrupo_participacion
    JOIN public.cursoimpartido ci
        ON  ci.pfkidcurso_cursoimpartido    = g.fkidcursocursoimpartido_grupo
        AND ci.pfkidprofesor_cursoimpartido = g.fkidprofesorcursoimpartido_grupo
    JOIN public.curso c
        ON  c.pkid_curso = ci.pfkidcurso_cursoimpartido
    WHERE p.pfkidestudiante_participacion = p_cedula
      AND p.pfkidgrupo_participacion      = p_idgrupo;
END;
$$

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
    JOIN public.universidad u ON u.pkcodigoies_universidad = pr.fkiduniversidad_programa
    WHERE p.pkcc_perfil = cedula;
END;
$$
LANGUAGE plpgsql;


-- Secuencia para grupos
CREATE SEQUENCE IF NOT EXISTS grupo_seq
  START WITH 1000
  INCREMENT BY 1
  MAXVALUE 99000
  CACHE 1
  NO CYCLE;


-- Traer los datos de un curso por su id
CREATE OR REPLACE FUNCTION consultar_curso_por_id(p_idcurso INT)
RETURNS TABLE (
    idcurso       INT,
    nombrecurso   VARCHAR,
    descripcion   VARCHAR,
    imagen        TEXT,
    fechacreacion TIMESTAMP
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.pkid_curso          AS idcurso,
        c.nombre_curso        AS nombrecurso,
        c.descripcion_curso   AS descripcion,
        c.imagen_curso        AS imagen,
        c.fechacreacion_curso AS fechacreacion
    FROM public.curso c
    WHERE c.pkid_curso = p_idcurso;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION consultar_grupos_profesor_curso(p_cedula BIGINT, p_idcurso INT)
RETURNS TABLE (
    idgrupo       INT,
    nombregrupo   VARCHAR,
    descripcion   VARCHAR,
    fechacreacion TIMESTAMP
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        g.pkid_grupo            AS idgrupo,
        g.nombre_grupo          AS nombregrupo,
        g.descripcion_grupo     AS descripcion,
        g.fechacreacion_grupo   AS fechacreacion
    FROM public.grupo g
    WHERE g.fkidprofesorcursoimpartido_grupo = p_cedula
      AND g.fkidcursocursoimpartido_grupo    = p_idcurso;
END;
$$
LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION crear_grupo(
    p_nombre      VARCHAR,
    p_descripcion VARCHAR,
    p_cedula      BIGINT,
    p_idcurso     INT
)
RETURNS TABLE (
    idgrupo       INT,
    nombregrupo   VARCHAR,
    descripcion   VARCHAR,
    fechacreacion TIMESTAMP
)
AS $$
DECLARE
    v_idgrupo INT := nextval('grupo_seq');
    v_fecha   TIMESTAMP := NOW();
BEGIN
    INSERT INTO public.grupo (
        pkid_grupo,
        fechacreacion_grupo,
        nombre_grupo,
        descripcion_grupo,
        fkidprofesorcursoimpartido_grupo,
        fkidcursocursoimpartido_grupo
    ) VALUES (
        v_idgrupo,
        v_fecha,
        p_nombre,
        p_descripcion,
        p_cedula,
        p_idcurso
    );

    RETURN QUERY
    SELECT
        v_idgrupo      AS idgrupo,
        p_nombre       AS nombregrupo,
        p_descripcion  AS descripcion,
        v_fecha        AS fechacreacion;
END;
$$
LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS refuerzo_seq
  START WITH 1
  INCREMENT BY 1
  NO MAXVALUE
  CACHE 1
  NO CYCLE;


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

--roles
--crear rol iniciador, estvbox, provbox
CREATE ROLE iniciador NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT;
CREATE ROLE estvbox NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT;
CREATE ROLE provbox NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT;
CREATE ROLE adminvbox NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT;

--usar grant para los esquemas
GRANT USAGE ON SCHEMA public TO iniciador;
GRANT USAGE ON SCHEMA public TO estvbox;
GRANT USAGE ON SCHEMA public TO provbox;
GRANT USAGE ON SCHEMA public to adminvbox;

--crear usuarios
CREATE USER visitante WITH PASSWORD '1234';
GRANT iniciador TO visitante;
GRANT estvbox TO visitante;
GRANT provbox TO visitante;
GRANT adminvbox TO visitante;

--acceso a tablas iniciador
GRANT INSERT ON TABLE public.perfil TO iniciador;
GRANT SELECT ON TABLE public.perfil, public.universidad, public.programa TO iniciador;

--acceso a tablas estvbox
GRANT SELECT ON TABLE
	public.universidad, 
	public.programa, 
	public.cursoimpartido, 
	public.curso, 
	public.grupo, 
	public.refuerzo, 
	public.enlace, 
	public.modulo, 
	public.teoria, 
	public.actividad, 
	public.juego,
	public.tipocomponente,
	public.componente
TO estvbox;

GRANT INSERT, SELECT ON TABLE
	public.certificado,
	public.ingresorefuerzo,
	public.ingresoenlace,
	public.ingresojuego
TO estvbox;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE
	public.perfil,
	public.participacion
TO estvbox;

--acceso a tablas provbox
GRANTE SELECT ON TABLE
	public.universidad,
	public.programa,
	public.curso,
	public.ingresorefuerzo,
	public.ingresoenlace,
	public.modulo,
	public.teoria,
	public.actividad,
	public.ingresojuego,
	public.tipocomponente
TO provbox;

GRANTE SELECT, INSERT, UPDATE, DELETE ON TABLE
	public.cursoimpartido,
	public.perfil,
	public.grupo,
	public.participacion,
	public.refuerzo,
	public.enlace,
	public.juego,
	public.juegoelegido,
	public.componente
TO provbox;

--acceso a tablas adminvbox
GRANT SELECT ON TABLE
	public.universidad,
	public.programa,
	public.participacion,
	public.certificado,
	public.refuerzo,
	public.enlace,
	public.ingresorefuerzo,
	public.ingresoenlace,
	public.ingresojuego,
	public.tipocomponente,
	public.componente,
	public.cursoimpartido
TO adminvbox;

GRANTE SELECT, INSERT, UPDATE, DELETE ON TABLE
	public.perfil,
	public.curso,
	public.modulo,
	public.teoria,
	public.actividad
TO adminbox;