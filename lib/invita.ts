export const BRAND_NAME = "INVITA"

export type EventType = "Boda" | "XV años" | "Cumpleaños" | "Baby shower" | "Graduación"
export type TemplateStyle = "Elegante" | "Floral" | "Minimalista" | "Infantil" | "Moderno" | "Vintage"

export type InvitationTemplate = {
  slug: string
  name: string
  event: EventType
  style: TemplateStyle
  color: string
  colorName: string
  price: number
  badge?: "Nueva" | "Popular" | "Premium"
  image: string
  description: string
  hosts: string
  date: string
  location: string
}

export const templates: InvitationTemplate[] = [
  {
    slug: "jardin-eterno",
    name: "Jardín eterno",
    event: "Boda",
    style: "Floral",
    color: "#6d2f3f",
    colorName: "Vino",
    price: 690,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
    description: "Flores profundas, tipografía ceremonial y una narrativa íntima para bodas al aire libre.",
    hosts: "Elena & Mateo",
    date: "18 · 10 · 2026",
    location: "Hacienda San Gabriel, Querétaro",
  },
  {
    slug: "luz-de-luna",
    name: "Luz de luna",
    event: "XV años",
    style: "Elegante",
    color: "#7a718e",
    colorName: "Lavanda",
    price: 790,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85",
    description: "Una invitación nocturna con destellos sutiles, agenda y galería para una celebración inolvidable.",
    hosts: "Valentina",
    date: "06 · 12 · 2026",
    location: "Casa de la Cultura, Puebla",
  },
  {
    slug: "confeti",
    name: "Confeti",
    event: "Cumpleaños",
    style: "Moderno",
    color: "#d06f4f",
    colorName: "Coral",
    price: 390,
    badge: "Nueva",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=85",
    description: "Color, ritmo y una cuenta regresiva enérgica para reunir a todos en un solo enlace.",
    hosts: "Mariana cumple 30",
    date: "22 · 08 · 2026",
    location: "Terraza Central, CDMX",
  },
  {
    slug: "pequeno-cielo",
    name: "Pequeño cielo",
    event: "Baby shower",
    style: "Minimalista",
    color: "#8ba0a0",
    colorName: "Niebla",
    price: 490,
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1400&q=85",
    description: "Una composición serena con mensajes para la familia, mesa de regalos y confirmación de asistencia.",
    hosts: "Baby Emilia",
    date: "14 · 11 · 2026",
    location: "Jardín Magnolia, Mérida",
  },
  {
    slug: "nuevo-capitulo",
    name: "Nuevo capítulo",
    event: "Graduación",
    style: "Moderno",
    color: "#263a45",
    colorName: "Azul tinta",
    price: 490,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=85",
    description: "Editorial y directa, diseñada para compartir ceremonia, recepción y ubicación sin fricción.",
    hosts: "Generación 2026",
    date: "28 · 06 · 2026",
    location: "Auditorio Metropolitano, León",
  },
  {
    slug: "papel-de-seda",
    name: "Papel de seda",
    event: "Boda",
    style: "Minimalista",
    color: "#aa9275",
    colorName: "Arena",
    price: 590,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=85",
    description: "Espacio, textura y precisión tipográfica para una boda contemporánea y cálida.",
    hosts: "Julia & Andrés",
    date: "04 · 04 · 2027",
    location: "Museo Casa de la Bola, CDMX",
  },
  {
    slug: "erase-una-vez",
    name: "Érase una vez",
    event: "Cumpleaños",
    style: "Infantil",
    color: "#d9a441",
    colorName: "Miel",
    price: 350,
    badge: "Nueva",
    image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1400&q=85",
    description: "Una historia alegre y fácil de compartir para cumpleaños infantiles llenos de imaginación.",
    hosts: "Leo cumple 6",
    date: "09 · 05 · 2026",
    location: "Parque del Lago, Guadalajara",
  },
  {
    slug: "archivo-romance",
    name: "Archivo romance",
    event: "Boda",
    style: "Vintage",
    color: "#7b684f",
    colorName: "Sepia",
    price: 790,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85",
    description: "Inspiración de archivo, detalles clásicos y una experiencia pausada para contar su historia.",
    hosts: "Sofía & Nicolás",
    date: "21 · 02 · 2027",
    location: "Finca La Concordia, San Miguel",
  },
]

export const testimonials = [
  { quote: "Nuestros invitados confirmaron en dos días. Todo se sintió nuestro desde el primer vistazo.", author: "Ana y Diego", event: "Boda en Valle de Bravo" },
  { quote: "Pude cambiar colores, música y fotos desde el teléfono. Compartirla fue literalmente un mensaje.", author: "Marcela R.", event: "XV años de Renata" },
  { quote: "Dejamos de responder las mismas preguntas: mapa, horario y regalos estaban en un solo lugar.", author: "Paola y Luis", event: "Baby shower" },
]

export function getTemplate(slug: string) {
  return templates.find((template) => template.slug === slug)
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(price)
}
