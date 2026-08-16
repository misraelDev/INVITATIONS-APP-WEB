import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarPlus, MessageCircle, Palette, UsersRound } from "lucide-react"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { Reveal } from "./reveal"
import { TemplateRail } from "./template-rail"
import { templates } from "@/lib/invita"

const quickBenefits = [
  [Palette, "Personaliza en minutos"], [UsersRound, "Confirma con RSVP"], [MessageCircle, "Comparte por WhatsApp"], [CalendarPlus, "Ubicación y calendario"],
]

export function HomePage() {
  return (
    <main>
      <SiteHeader light />
      <section className="relative min-h-[100svh] overflow-hidden bg-black text-white">
        <Image src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=90" alt="Celebración de una boda al aire libre" fill priority sizes="100vw" className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/5" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-6 pb-16 pt-32 lg:items-center lg:pb-0">
          <div className="max-w-4xl">
            <p className="eyebrow text-white/70">Invitaciones digitales</p>
            <h1 className="mt-6 max-w-4xl font-serif text-[clamp(3.7rem,8vw,8.5rem)] leading-[.82] tracking-[-.055em]">Tu celebración comienza mucho antes del gran día.</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/78 md:text-lg">Crea una invitación única, confirma asistentes y comparte cada detalle desde un solo lugar.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/editor/jardin-eterno" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">Crear mi invitación</Link><Link href="/templates" className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold backdrop-blur">Explorar plantillas</Link></div>
          </div>
          <div className="absolute bottom-12 right-7 hidden rotate-3 rounded-[2rem] border border-white/25 bg-white/10 p-3 shadow-2xl backdrop-blur-md xl:block">
            <div className="relative h-[410px] w-[220px] overflow-hidden rounded-[1.45rem]"><Image src={templates[1].image} alt="Vista previa móvil de invitación" fill sizes="220px" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/><div className="absolute bottom-6 inset-x-4 text-center"><span className="text-[9px] uppercase tracking-[.25em]">Mis XV</span><p className="mt-2 font-serif text-3xl">Valentina</p></div></div>
          </div>
        </div>
      </section>

      <section className="grid border-b border-black/10 bg-[#fffdf8] sm:grid-cols-2 lg:grid-cols-4">
        {quickBenefits.map(([Icon, label]) => <div key={label as string} className="flex items-center gap-4 border-b border-black/10 p-6 last:border-0 sm:border-r lg:border-b-0"><Icon className="size-5 text-primary"/><span className="text-sm">{label as string}</span></div>)}
      </section>

      <section id="plantillas" className="overflow-hidden bg-[#f4f0e8] py-24 md:py-32">
        <Reveal className="mx-auto mb-12 max-w-7xl px-6"><div className="grid gap-6 md:grid-cols-2 md:items-end"><div><p className="eyebrow">Elige el comienzo</p><h2 className="mt-5 font-serif text-5xl leading-none md:text-7xl">Una plantilla.<br/>Infinitas historias.</h2></div><p className="max-w-md leading-7 text-muted-foreground md:justify-self-end">Diseños creados para sentirse personales desde el primer mensaje. Arrastra, desliza o usa las flechas para explorar.</p></div></Reveal>
        <TemplateRail templates={templates} />
      </section>

      <section className="bg-[#fffdf8] px-6 py-24 md:py-32">
        <Reveal className="mx-auto max-w-7xl"><p className="eyebrow">Colecciones editoriales</p><div className="mt-8 grid auto-rows-[240px] gap-4 md:grid-cols-4">
          {[{name:"Elegante",img:templates[0].image,cls:"md:col-span-2 md:row-span-2"},{name:"Floral",img:templates[1].image,cls:"md:col-span-2"},{name:"Minimalista",img:templates[3].image,cls:""},{name:"Moderno",img:templates[4].image,cls:""}].map((item)=><Link key={item.name} href={`/templates?estilo=${item.name}`} className={`group relative overflow-hidden rounded-[1.75rem] ${item.cls}`}><Image src={item.img} alt={`Colección ${item.name}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"/><span className="absolute bottom-5 left-5 font-serif text-3xl text-white">{item.name}</span></Link>)}
        </div></Reveal>
      </section>

      <section id="precios" className="relative overflow-hidden bg-[#6d2f3f] px-6 py-24 text-white md:py-32"><div className="mx-auto max-w-7xl"><p className="eyebrow text-white/55">Desde $350 MXN · Pago único</p><h2 className="mt-6 max-w-5xl font-serif text-5xl leading-[.95] md:text-8xl">Haz que tu evento comience desde la invitación.</h2><div className="mt-10 flex flex-wrap gap-3"><Link href="/editor/jardin-eterno" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">Crear mi invitación</Link><Link href="/templates" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm">Ver plantillas <ArrowRight className="size-4"/></Link></div></div></section>
      <SiteFooter />
    </main>
  )
}
