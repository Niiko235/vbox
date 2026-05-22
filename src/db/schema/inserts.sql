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
(11, 'vaciar()',  '{"visibilidad": "public", "tipo": "void"}', 2, 'vaciar() elimina todos los productos del Carrito.', 3, 1),
(12, null, '{"claseOrigen": 1, "claseDestino": 2, "tipo": "Agregacion"} ', null, 'Carrito agrega Productos, ya que un Carrito puede contener múltiples Productos pero estos pueden existir de forma independiente.', 4, 1);

