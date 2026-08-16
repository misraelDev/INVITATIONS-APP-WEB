"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faCloud, faLocationDot, faRainbow, faStar, faStopwatch, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons"
import { faCalendarDays, faClock, faCopy } from "@fortawesome/free-regular-svg-icons"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { UNICORN_EVENT as EVENT } from "./unicorn-data"

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

export function UnicornInvitation() {
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
    <main className="min-h-screen overflow-hidden bg-[#fdf8ff] text-[#211a45]">
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[linear-gradient(150deg,#211a45_0%,#6557c7_60%,#d47eb1_100%)] px-5 py-20 text-white">
        {Array.from({ length: 14 }, (_, index) => <FontAwesomeIcon key={index} icon={faStar} className="absolute text-white/25" style={{ left: `${4 + ((index * 29) % 92)}%`, top: `${5 + ((index * 37) % 86)}%`, fontSize: `${8 + (index % 4) * 4}px` }} aria-hidden="true"/>)}
        <FontAwesomeIcon icon={faCloud} className="absolute -bottom-16 -left-16 text-[14rem] text-white/10" aria-hidden="true"/>
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">
          <motion.div initial={reduceMotion ? false : { opacity: 0, x: -35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#91e3db]/40 bg-[#91e3db]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.25em] text-[#bff6ef]"><FontAwesomeIcon icon={faWandMagicSparkles} size="lg" widthAuto/>Invitación mágica</span>
            <p className="mt-8 text-sm font-black uppercase tracking-[.3em] text-white/45">Nivel mágico 07</p>
            <h1 className="mt-4 text-[clamp(5rem,13vw,10rem)] font-black leading-[.72] tracking-[-.08em]">MÍA<br/><span className="text-[#91e3db]">BRILLA</span></h1>
            <p className="mt-8 max-w-lg text-xl font-bold leading-snug text-white/70">Siete años de sueños, colores y aventuras comienzan al otro lado del arcoíris.</p>
            <a href="#magia" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#91e3db] px-7 py-4 text-xs font-black uppercase tracking-[.15em] text-[#211a45] shadow-lg transition hover:-translate-y-1"><FontAwesomeIcon icon={faRainbow} size="xl" widthAuto/>Descubrir la magia</a>
          </motion.div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} className="relative mx-auto w-full max-w-[520px]">
            <div className="relative mx-auto h-64 w-full max-w-[480px] overflow-hidden rounded-t-full border-[28px] border-b-0 border-[#ff9ac2] before:absolute before:inset-[18px] before:rounded-t-full before:border-[28px] before:border-b-0 before:border-[#ffd68a] after:absolute after:inset-[64px] after:rounded-t-full after:border-[28px] after:border-b-0 after:border-[#91e3db] sm:h-80" />
            <div className="relative -mt-3 rounded-[3rem] bg-white/10 p-8 text-center backdrop-blur-md"><FontAwesomeIcon icon={faWandMagicSparkles} className="text-5xl text-[#ffcfdf]"/><p className="mt-5 text-[10px] font-bold uppercase tracking-[.32em] text-white/55">La magia cumple</p><strong className="mt-2 block text-8xl font-black text-white">07</strong></div>
          </motion.div>
        </div>
      </section>

      <section id="magia" className="bg-[#91e3db] px-5 py-20 text-[#211a45]">
        <div className="mx-auto max-w-5xl text-center"><p className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[.3em]"><FontAwesomeIcon icon={faStopwatch} size="xl" widthAuto/>El portal se abre en</p><div className="mt-9 grid grid-cols-4 gap-2 sm:gap-4">{Object.entries(countdown).map(([label, value]) => <div key={label} className="rounded-[2rem] bg-white/55 px-2 py-5 shadow-[0_12px_35px_rgba(33,26,69,.1)] sm:py-7"><strong className="block text-4xl font-black tabular-nums sm:text-6xl">{String(value).padStart(2, "0")}</strong><span className="mt-2 block text-[8px] font-bold uppercase tracking-[.16em] text-[#211a45]/50 sm:text-[10px]">{{ days: "días", hours: "horas", minutes: "min", seconds: "seg" }[label as keyof Countdown]}</span></div>)}</div></div>
      </section>

      <section className="bg-[#fdf8ff] px-5 py-24">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">{[
          { icon: faCalendarDays, color: "bg-[#ff9ac2]", label: "Día mágico", title: EVENT.day, detail: EVENT.month },
          { icon: faClock, color: "bg-[#ffd68a]", label: "Hora del hechizo", title: EVENT.time, detail: "Llega 15 minutos antes" },
          { icon: faLocationDot, color: "bg-[#91e3db]", label: "Reino secreto", title: EVENT.venue, detail: EVENT.address },
        ].map((item) => <article key={item.label} className="relative min-h-72 overflow-hidden rounded-[2.5rem] border border-[#6557c7]/15 bg-white p-7 shadow-[0_20px_55px_rgba(101,87,199,.1)]"><span className={`grid size-14 place-items-center rounded-2xl ${item.color}`}><FontAwesomeIcon icon={item.icon} size="xl" widthAuto/></span><p className="mt-7 text-[9px] font-black uppercase tracking-[.25em] text-[#6557c7]">{item.label}</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em]">{item.title}</h2><p className="mt-4 text-sm leading-6 text-[#211a45]/50">{item.detail}</p><FontAwesomeIcon icon={faStar} className="absolute -bottom-5 -right-3 text-[6rem] text-[#6557c7]/5" aria-hidden="true"/></article>)}</div>
      </section>

      <section className="bg-[#6557c7] px-5 py-24">
        <div className="mx-auto max-w-5xl"><div className="relative min-h-[460px] overflow-hidden rounded-[3rem] border-4 border-white/30 bg-white shadow-2xl"><iframe title={`Mapa de ${EVENT.venue}`} src={`https://www.google.com/maps?q=${encodeURIComponent(`${EVENT.venue}, ${EVENT.address}`)}&output=embed`} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><button type="button" onClick={copyAddress} className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold text-white"><FontAwesomeIcon icon={copied ? faCheck : faCopy} size="lg" widthAuto/>{copied ? "Dirección copiada" : "Copiar dirección"}</button><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${EVENT.venue}, ${EVENT.address}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#91e3db] px-6 py-4 text-sm font-black text-[#211a45]"><FontAwesomeIcon icon={faLocationDot} size="lg" widthAuto/>Abrir Maps</a></div></div>
      </section>

      <footer className="relative overflow-hidden bg-[#211a45] px-5 py-20 text-center text-white"><FontAwesomeIcon icon={faRainbow} className="text-5xl text-[#91e3db]"/><p className="mt-5 text-4xl font-black tracking-[-.04em]">Nos vemos en las nubes</p><a href={`https://wa.me/?text=${encodeURIComponent(`Hola, confirmo mi asistencia al cumpleaños de ${EVENT.name} el ${EVENT.date} a las ${EVENT.time}.`)}`} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#1f9f59] px-7 py-4 text-sm font-black text-white shadow-lg"><FontAwesomeIcon icon={faWhatsapp} size="xl" widthAuto/>Confirmar por WhatsApp</a></footer>
    </main>
  )
}
