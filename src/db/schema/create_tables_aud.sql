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

CREATE TABLE auditoria.aud_grupo (
    fecha_aud TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_aud TEXT NOT NULL,
    operacion_aud tipooperacion_auditoria NOT NULL,
    pkid_grupo INT,
    fechacreacion_grupo TIMESTAMP,
    nombre_grupo VARCHAR(20),
    descripcion_grupo VARCHAR(500),
    fkidprofesor_grupo BIGINT,
    fkidcurso_grupo INT
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