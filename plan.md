Analiza cuidadosamente esta referencia visual antes de comenzar:

Quiero crear una plataforma web de invitaciones digitales reutilizando su lenguaje visual, composición, ritmo editorial y estilo de interacción, pero sin copiar su marca, textos, fotografías, productos ni recursos protegidos.

No quiero una tienda de cosméticos con palabras reemplazadas. Quiero una reinterpretación completa y original enfocada en crear, personalizar, publicar y compartir invitaciones digitales.

OBJETIVO

Construye una plataforma elegante de invitaciones digitales para eventos como:

* Bodas
* XV años
* Cumpleaños
* Bautizos
* Baby showers
* Graduaciones
* Aniversarios
* Eventos empresariales

Usa provisionalmente el nombre de marca “INVITA”, pero centralízalo en una constante para poder cambiarlo fácilmente.

DIRECCIÓN VISUAL

Conserva de la referencia:

* Estética editorial, minimalista y sofisticada.
* Hero de pantalla completa con fotografía emocional.
* Tipografía serif elegante para títulos, similar a Playfair Display.
* Tipografía sans serif limpia para interfaz y textos, similar a DM Sans.
* Paleta cálida y neutral: marfil, blanco roto, arena, gris humo y negro.
* Navegación flotante con fondo translúcido, desenfoque, borde sutil y esquinas redondeadas.
* Títulos de gran tamaño con buen uso del espacio negativo.
* Tarjetas grandes con fotografía, degradado inferior y texto superpuesto.
* Secciones sticky y animaciones vinculadas al desplazamiento.
* Carruseles horizontales suaves.
* Galerías editoriales tipo bento.
* Bloques fotográficos de ancho completo.
* Bordes redondeados, sombras suaves y transiciones refinadas.
* Apariciones mediante fade, blur y desplazamientos ligeros.

No reutilices las fotografías, productos, textos ni logotipo de AMBER. Utiliza imágenes originales o placeholders relacionados con celebraciones reales.

PÁGINA PRINCIPAL

1. Navegación flotante

Incluye:

* Logo INVITA
* Plantillas
* Cómo funciona
* Características
* Opiniones
* Precios
* Botón “Crear invitación”

En móvil, conviértela en un menú compacto accesible.

2. Hero principal

Usa una fotografía de celebración a pantalla completa y un degradado sutil para mantener la legibilidad.

Contenido sugerido:

Etiqueta:
“INVITACIONES DIGITALES”

Título:
“Tu celebración comienza mucho antes del gran día.”

Descripción:
“Crea una invitación única, confirma asistentes y comparte cada detalle desde un solo lugar.”

Botones:

* “Crear mi invitación”
* “Explorar plantillas”

Agrega una vista previa flotante de una invitación mostrada en un teléfono.

3. Beneficios rápidos

Crea cuatro bloques:

* Personaliza en minutos
* Confirma asistencia con RSVP
* Comparte directamente por WhatsApp
* Integra ubicación y calendario

4. Catálogo de plantillas

Reinterpreta el carrusel horizontal sticky de productos de la referencia como un catálogo de invitaciones.

Cada tarjeta debe mostrar:

* Imagen de portada
* Nombre de la plantilla
* Tipo de evento
* Estilo visual
* Etiquetas como “Nueva”, “Popular” o “Premium”
* Botón o enlace “Ver plantilla”

Incluye categorías como bodas, XV años, cumpleaños, baby shower y graduaciones.

El carrusel debe funcionar con scroll, arrastre, teclado y gestos táctiles.

5. Galería editorial

Usa una composición tipo bento con fotografías de diferentes celebraciones.

Incluye estilos como:

* Elegante
* Floral
* Minimalista
* Infantil
* Moderno
* Vintage

Cada bloque debe tener una animación suave y permitir abrir la colección correspondiente.

6. Cómo funciona

Presenta tres pasos:

1. Elige una plantilla.
2. Personaliza textos, colores, fotos y música.
3. Publica y comparte el enlace con tus invitados.

Mantén fotografías grandes, tarjetas superpuestas y una narrativa visual similar a la referencia.

7. Características

Incluye:

* Confirmación de asistencia
* Número de acompañantes
* Google Maps
* Agregar evento al calendario
* Música opcional
* Cuenta regresiva
* Mesa de regalos
* Galería de fotografías
* Código de vestimenta
* Mensajes para los anfitriones
* Enlace personalizado

8. Demostración inmersiva

Reinterpreta la sección sticky de pantalla completa como una demostración de una invitación publicada.

Mientras el usuario hace scroll, muestra:

* Portada del evento
* Cuenta regresiva
* Datos de fecha y ubicación
* Galería
* Formulario RSVP

Debe sentirse como una vista previa real, no como una imagen estática.

9. Testimonios

Reutiliza el estilo editorial del carrusel de opiniones, mostrando testimonios de personas que crearon invitaciones.

10. CTA final

Reemplaza “Join the ritual” por:

“Haz que tu evento comience desde la invitación.”

Incluye:

* Botón principal “Crear mi invitación”
* Botón secundario “Ver plantillas”

PÁGINA DE DETALLE DE PLANTILLA

Reinterpreta la página de producto de la referencia.

Distribución:

* Izquierda: mockup grande y galería de la plantilla.
* Derecha: nombre, categoría, calificación, precio y descripción.
* CTA principal: “Usar esta plantilla”.
* CTA secundario: “Ver demostración”.
* Selector de paleta de colores.
* Vista móvil y escritorio.
* Tarjetas de beneficios: RSVP, mapas, música y diseño responsivo.
* Acordeones: secciones incluidas, personalización, publicación y soporte.

RUTAS

Crea las siguientes rutas:

* `/` — página principal
* `/templates` — catálogo completo
* `/templates/[slug]` — detalle de plantilla
* `/editor/[slug]` — personalizador
* `/invitation/[slug]` — invitación publicada

REQUISITOS FUNCIONALES

* Usa Next.js, TypeScript, Tailwind CSS y Framer Motion.
* Crea componentes reutilizables.
* Usa datos simulados centralizados y fáciles de reemplazar.
* Implementa filtros por evento, estilo, color y precio.
* Incluye una vista previa funcional.
* El formulario RSVP debe validar campos y mostrar confirmación.
* Permite compartir mediante WhatsApp y copiar el enlace.
* No es necesario conectar un backend inicialmente; utiliza estado local y datos mock.
* La aplicación debe ser completamente responsiva.
* Respeta `prefers-reduced-motion`.
* Garantiza contraste legible sobre fotografías.
* Evita animaciones que dejen contenido invisible o grandes áreas vacías.
* Optimiza imágenes y evita cambios bruscos de diseño durante la carga.
* Añade estados hover, focus, loading, vacío y error.
* Mantén una accesibilidad correcta mediante HTML semántico y navegación por teclado.

ENTREGABLE

Entrega una experiencia terminada y navegable, no solamente un mockup estático. Primero define el sistema visual y los componentes compartidos; después construye las páginas y verifica las interacciones principales.

El resultado debe recordar la elegancia y el ritmo editorial de la referencia, pero debe sentirse como una marca original dedicada completamente a invitaciones digitales.
