"use client"

import { useState } from "react"
import { CalendarDays, Check, Clock3, MapPin } from "lucide-react"

const views = ["Portada", "Detalles", "Galería", "RSVP"] as const

export function InvitationDemo() {
  const [view, setView] = useState<(typeof views)[number]>("Portada")
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
      <div>
        <p className="eyebrow text-white/55">Vista publicada</p>
        <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[.95] text-white md:text-7xl">No solo se mira. Se vive.</h2>
        <p className="mt-6 max-w-md leading-7 text-white/60">Recorre una invitación como lo harán tus invitados. Cada detalle permanece cerca, sin perder la emoción.</p>
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Secciones de la demostración">
          {views.map((item) => <button key={item} type="button" role="tab" aria-selected={view === item} onClick={() => setView(item)} className={`rounded-full px-4 py-2 text-xs transition ${view === item ? "bg-white text-black" : "border border-white/20 text-white/65 hover:border-white/50"}`}>{item}</button>)}
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-[390px] rounded-[3rem] border-[10px] border-[#171615] bg-[#f5f0e8] p-3 shadow-2xl">
        <div className="min-h-[620px] overflow-hidden rounded-[2.25rem] bg-[#f8f4ed]">
          {view === "Portada" && <div className="relative min-h-[620px] bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85')] bg-cover bg-center"><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/15"/><div className="absolute inset-x-0 bottom-0 p-8 text-center text-white"><p className="text-[10px] uppercase tracking-[.3em]">Nos casamos</p><h3 className="mt-3 font-serif text-5xl">Elena<br/>& Mateo</h3><p className="mt-5 text-xs tracking-[.18em]">18 · 10 · 2026</p></div></div>}
          {view === "Detalles" && <div className="grid min-h-[620px] place-content-center p-8 text-center"><p className="eyebrow">El gran día</p><h3 className="mt-5 font-serif text-4xl">Todo lo que necesitas saber</h3><div className="mt-10 space-y-5 text-left"><p className="flex gap-3"><CalendarDays className="size-5 text-primary"/>18 de octubre de 2026</p><p className="flex gap-3"><Clock3 className="size-5 text-primary"/>Ceremonia · 16:30 h</p><p className="flex gap-3"><MapPin className="size-5 text-primary"/>Hacienda San Gabriel</p></div></div>}
          {view === "Galería" && <div className="grid min-h-[620px] grid-cols-2 grid-rows-3 gap-2 p-3"><div className="row-span-2 rounded-2xl bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=500&q=80')] bg-cover bg-center"/><div className="rounded-2xl bg-[url('https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=500&q=80')] bg-cover bg-center"/><div className="rounded-2xl bg-[url('https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=500&q=80')] bg-cover bg-center"/><div className="col-span-2 rounded-2xl bg-[url('https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=700&q=80')] bg-cover bg-center"/></div>}
          {view === "RSVP" && <div className="grid min-h-[620px] place-content-center p-8 text-center">{confirmed ? <div><Check className="mx-auto size-12 text-primary"/><h3 className="mt-5 font-serif text-4xl">¡Nos vemos ahí!</h3><p className="mt-3 text-sm text-muted-foreground">Tu asistencia quedó confirmada.</p></div> : <div><p className="eyebrow">RSVP</p><h3 className="mt-4 font-serif text-4xl">¿Nos acompañas?</h3><input className="mt-8 w-full rounded-full border bg-white px-5 py-3 text-sm" placeholder="Tu nombre" aria-label="Tu nombre"/><button type="button" onClick={() => setConfirmed(true)} className="mt-3 w-full rounded-full bg-foreground px-5 py-3 text-sm text-background">Confirmar asistencia</button></div>}</div>}
        </div>
      </div>
    </div>
  )
}
