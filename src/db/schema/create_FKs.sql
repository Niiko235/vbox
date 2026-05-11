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
        fk_grupo_profesor 
    FOREIGN KEY 
        (fkidprofesor_grupo) 
    REFERENCES 
        public.perfil (pkcc_perfil);

ALTER TABLE public.grupo 
    ADD CONSTRAINT 
        fk_grupo_curso 
    FOREIGN KEY 
        (fkidcurso_grupo) 
    REFERENCES 
        public.curso (pkid_curso);

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