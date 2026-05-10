-------------------------------------------------------------------
--                      TIPOS ENUMERADOS                         --
-------------------------------------------------------------------
CREATE TYPE tipo_universidad AS ENUM ('privada', 'publica');
CREATE TYPE tipo_enlace AS ENUM ('Sitio web', 'Documento', 'Video', 'Otro');
CREATE TYPE tipooperacion_auditoria AS ENUM ('INSERT', 'UPDATE', 'DELETE');
CREATE TYPE tipo_perfil AS ENUM ('estudiante', 'profesor', 'administrador');

-------------------------------------------------------------------
--                         TABLAS PRINCIPALES                     --
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
    fkidprofesor_grupo BIGINT NOT NULL,
    fkidcurso_grupo INT NOT NULL
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
    orden_teoria INT NOT NULL,
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
    nombre_tipocomponente VARCHAR(20) NOT NULL
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