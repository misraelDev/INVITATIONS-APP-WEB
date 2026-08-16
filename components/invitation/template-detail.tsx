"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, MapPin, Monitor, Music2, Smartphone, UsersRound } from "lucide-react"
import { formatPrice, type InvitationTemplate } from "@/lib/invita"

const palettes = ["#6d2f3f", "#786b52", "#56645c", "#37343f"]

export function TemplateDetail({ template }: { template: InvitationTemplate }) {
  const [color, setColor] = useState(template.color)
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile")

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className={`relative mx-auto overflow-hidden bg-black shadow-2xl transition-all duration-500 ${device === "mobile" ? "h-[680px] max-w-[390px] rounded-[3rem] border-[10px] border-black" : "aspect-[16/10] w-full rounded-[2rem] border-[8px] border-black"}`} style={{ boxShadow: `0 35px 90px ${color}35` }}>
          <Image src={template.image} alt={`Vista de ${template.name}`} fill priority sizes="(max-width: 1024px) 390px, 55vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-center text-white"><p className="text-[10px] uppercase tracking-[.28em]">{template.event}</p><h2 className="mt-3 font-serif text-5xl">{template.hosts}</h2><p className="mt-5 text-xs tracking-[.18em]">{template.date}</p></div>
          <div className="absolute right-4 top-20 rounded-full px-2 py-5 text-[9px] uppercase tracking-[.2em] text-white [writing-mode:vertical-rl]" style={{ backgroundColor: color }}>{template.name}</div>
        </div>
        <div className="mt-5 flex justify-center gap-2"><button type="button" onClick={()=>setDevice("mobile")} className={`rounded-full p-3 ${device === "mobile" ? "bg-foreground text-background" : "border"}`} aria-label="Vista móvil"><Smartphone className="size-4"/></button><button type="button" onClick={()=>setDevice("desktop")} className={`rounded-full p-3 ${device === "desktop" ? "bg-foreground text-background" : "border"}`} aria-label="Vista de escritorio"><Monitor className="size-4"/></button></div>
      </div>
      <div className="py-4 lg:py-10">
        <p className="eyebrow">{template.event} · {template.style}</p><h1 className="mt-5 font-serif text-6xl leading-none md:text-7xl">{template.name}</h1>
        <div className="mt-5 flex items-center gap-3"><span className="text-lg font-semibold">{formatPrice(template.price)}</span><span className="text-xs text-muted-foreground">Pago único</span></div>
        <p className="mt-7 max-w-xl leading-7 text-muted-foreground">{template.description}</p>
        <div className="mt-9"><p className="mb-3 text-xs font-bold uppercase tracking-[.14em]">Paleta de color</p><div className="flex gap-3">{palettes.map((item)=><button type="button" key={item} onClick={()=>setColor(item)} className="grid size-10 place-items-center rounded-full border border-black/15" aria-label={`Usar color ${item}`}><span className="size-7 rounded-full" style={{backgroundColor:item}}>{color === item && <Check className="m-1.5 size-4 text-white"/>}</span></button>)}</div></div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2"><Link href={`/editor/${template.slug}`} className="rounded-full bg-foreground px-6 py-4 text-center text-sm font-semibold text-background">Usar esta plantilla</Link><Link href={`/invitation/${template.slug}`} className="rounded-full border border-black/15 px-6 py-4 text-center text-sm font-semibold">Ver demostración</Link></div>
        <div className="mt-12 grid grid-cols-2 gap-3">{[[UsersRound,"RSVP"],[MapPin,"Mapas"],[Music2,"Música"],[Smartphone,"Responsiva"]].map(([Icon,label])=><div key={label as string} className="rounded-2xl bg-white p-5"><Icon className="size-5 text-primary"/><p className="mt-7 text-sm font-medium">{label as string}</p></div>)}</div>
        <div className="mt-12 border-t border-black/10">{[["Secciones incluidas","Portada, historia, cuenta regresiva, agenda, ubicación, galería, regalos y RSVP."],["Personalización","Edita textos, colores, fotografías, música y orden de las secciones."],["Publicación","Obtén un enlace personal listo para compartir por WhatsApp o cualquier red."],["Soporte","Incluye guía de publicación y asistencia durante la configuración."]].map(([title,text])=><details key={title} className="group border-b border-black/10 py-5"><summary className="cursor-pointer list-none font-medium">{title}<span className="float-right transition group-open:rotate-45">+</span></summary><p className="pt-4 text-sm leading-6 text-muted-foreground">{text}</p></details>)}</div>
      </div>
    </div>
  )
}
