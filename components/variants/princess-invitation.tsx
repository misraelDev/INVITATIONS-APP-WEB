"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faCrown, faLocationDot, faStopwatch } from "@fortawesome/free-solid-svg-icons"
import { faCalendarDays, faClock, faCopy } from "@fortawesome/free-regular-svg-icons"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { PRINCESS_EVENT as EVENT } from "./princess-data"

type Countdown = { days: number; hours: number; minutes: number; seconds: number }

function getCountdown(): Countdown {
  const distance = Math.max(0, new Date(EVENT.target).getTime() - Date.now())
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  }
}

export function PrincessInvitation() {
  const reduceMotion = useReducedMotion()
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const update = () => setCountdown(getCountdown())
    update()
    const timer = window.setInterval(update, 1_000)
    return () => window.clearInterval(timer)
  }, [])

  const copyAddress = async () => {
    await navigator.clipboard.writeText(`${EVENT.venue}, ${EVENT.address}`)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2_000)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff8f3] text-[#522035]">
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[linear-gradient(135deg,#fff8f3_0%,#f3d5df_62%,#ddb7c5_100%)] px-5 py-20">
        <FontAwesomeIcon icon={faCrown} className="absolute -right-10 top-5 text-[15rem] text-white/25" aria-hidden="true" />
        <div className="absolute -left-24 bottom-16 size-72 rounded-full border-[55px] border-[#c29a52]/10" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-2">
          <motion.div initial={reduceMotion ? false : { opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[10px] font-bold uppercase tracking-[.42em] text-[#9a6178]">El reino está de fiesta</p>
            <h1 className="mt-6 font-serif text-[clamp(4.5rem,11vw,8.5rem)] italic leading-[.75] tracking-[-.05em]">Emilia</h1>
            <p className="mt-7 max-w-lg font-serif text-3xl italic leading-tight text-[#6b2742]/75">Una tarde encantada para celebrar cinco años de magia.</p>
            <a href="#fecha" className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#6b2742] px-7 py-4 text-xs font-bold uppercase tracking-[.16em] text-white shadow-lg transition hover:-translate-y-1"><FontAwesomeIcon icon={faCrown} size="lg" widthAuto/>Ver invitación real</a>
          </motion.div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }} className="relative mx-auto grid aspect-[4/5] w-full max-w-[440px] place-items-center overflow-hidden rounded-t-[14rem] rounded-b-[2.5rem] border-2 border-[#c29a52]/60 bg-[#6b2742] text-center text-white shadow-[0_35px_80px_rgba(82,32,53,.3)]">
            <div className="absolute inset-5 rounded-t-[13rem] rounded-b-[1.8rem] border border-[#c29a52]/45" />
            <div><FontAwesomeIcon icon={faCrown} className="text-5xl text-[#d9b66f]"/><p className="mt-8 text-[10px] uppercase tracking-[.45em] text-white/55">Princesa por un día</p><strong className="mt-3 block font-serif text-[9rem] font-light italic leading-none text-[#f3d5df]">05</strong><p className="mt-4 font-serif text-2xl italic">{EVENT.date}</p></div>
          </motion.div>
        </div>
      </section>

      <section id="fecha" className="bg-[#6b2742] px-5 py-20 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.35em] text-[#d9b66f]"><FontAwesomeIcon icon={faStopwatch} size="xl" widthAuto/>El carruaje parte en</p>
          <div className="mt-9 grid grid-cols-4 gap-2 sm:gap-4">
            {Object.entries(countdown).map(([label, value]) => <div key={label} className="border border-white/15 bg-white/5 px-2 py-5 sm:py-7"><strong className="block font-serif text-4xl italic tabular-nums sm:text-6xl">{String(value).padStart(2, "0")}</strong><span className="mt-2 block text-[8px] uppercase tracking-[.16em] text-white/50 sm:text-[10px]">{{ days: "días", hours: "horas", minutes: "min", seconds: "seg" }[label as keyof Countdown]}</span></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#fff8f3] px-5 py-24">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            { icon: faCalendarDays, label: "Día del baile", title: EVENT.day, detail: EVENT.month },
            { icon: faClock, label: "Hora de llegada", title: EVENT.time, detail: "El palacio abre 15 minutos antes" },
            { icon: faLocationDot, label: "El palacio", title: EVENT.venue, detail: EVENT.address },
          ].map((item) => <article key={item.label} className="relative min-h-72 overflow-hidden rounded-t-[7rem] border border-[#c29a52]/45 bg-[#f8e8ed] px-7 pb-8 pt-16 text-center"><FontAwesomeIcon icon={item.icon} size="2xl" className="text-[#c29a52]"/><p className="mt-6 text-[9px] font-bold uppercase tracking-[.28em] text-[#9a6178]">{item.label}</p><h2 className="mt-4 font-serif text-3xl italic">{item.title}</h2><p className="mt-4 text-sm leading-6 text-[#522035]/55">{item.detail}</p></article>)}
        </div>
      </section>

      <section className="bg-[#f3d5df] px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative min-h-[460px] overflow-hidden rounded-t-[10rem] rounded-b-[2rem] border-2 border-[#6b2742] bg-white shadow-2xl"><iframe title={`Mapa de ${EVENT.venue}`} src={`https://www.google.com/maps?q=${encodeURIComponent(`${EVENT.venue}, ${EVENT.address}`)}&output=embed`} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2"><button type="button" onClick={copyAddress} className="inline-flex items-center justify-center gap-3 rounded-full border border-[#6b2742] bg-white px-6 py-4 text-sm font-bold text-[#6b2742]"><FontAwesomeIcon icon={copied ? faCheck : faCopy} size="lg" widthAuto/>{copied ? "Dirección copiada" : "Copiar dirección"}</button><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${EVENT.venue}, ${EVENT.address}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#6b2742] px-6 py-4 text-sm font-bold text-white"><FontAwesomeIcon icon={faLocationDot} size="lg" widthAuto/>Abrir Maps</a></div>
        </div>
      </section>

      <footer className="bg-[#522035] px-5 py-20 text-center text-white"><FontAwesomeIcon icon={faCrown} size="2xl" className="text-[#d9b66f]"/><p className="mt-5 font-serif text-5xl italic">Te esperamos, princesa</p><a href={`https://wa.me/?text=${encodeURIComponent(`Hola, confirmo mi asistencia al cumpleaños de ${EVENT.name} el ${EVENT.date} a las ${EVENT.time}.`)}`} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#1f9f59] px-7 py-4 text-sm font-bold text-white shadow-lg"><FontAwesomeIcon icon={faWhatsapp} size="xl" widthAuto/>Confirmar por WhatsApp</a></footer>
    </main>
  )
}
