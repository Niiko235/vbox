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