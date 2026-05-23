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