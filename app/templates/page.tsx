import { SiteHeader } from "@/components/invitation/site-header"
import { SiteFooter } from "@/components/invitation/site-footer"
import { TemplateCatalog } from "@/components/invitation/template-catalog"

export default function TemplatesPage() {
  return <main><SiteHeader/><section className="bg-[#f4f0e8] px-6 pb-24 pt-36 md:pt-44"><div className="mx-auto max-w-7xl"><p className="eyebrow">Catálogo completo</p><h1 className="mt-5 max-w-4xl font-serif text-6xl leading-[.9] md:text-8xl">Encuentra el tono de tu celebración.</h1><p className="mt-7 max-w-xl leading-7 text-muted-foreground">Filtra por evento, estilo y precio. Cada diseño incluye una vista móvil, RSVP y herramientas para compartir.</p><div className="mt-14"><TemplateCatalog/></div></div></section><SiteFooter/></main>
}
