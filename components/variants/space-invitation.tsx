"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Check, Copy, MapPin, MessageCircle, Orbit, Satellite, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const MISSION = {
  commander: "Lía",
  age: 8,
  date: "Sábado 24 de julio",
  day: "24",
  month: "Julio 2027",
  time: "17:00 h",
  target: "2027-07-24T17:00:00-06:00",
  venue: "Centro Cosmos",
  address: "Av. de las Estrellas 108, Ciudad de México",
}

type Countdown = { days: number; hours: number; minutes: number; seconds: number }

function calculateCountdown(): Countdown {
  const distance = Math.max(0, new Date(MISSION.target).getTime() - Date.now())
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  }
}

export function SpaceInvitation() {
  const reduceMotion = useReducedMotion()
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [addressCopied, setAddressCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  useEffect(() => {
    const update = () => setCountdown(calculateCountdown())
    update()
    const timer = window.setInterval(update, 1_000)
    return () => window.clearInterval(timer)
  }, [])

  const copyAddress = async () => {
    await navigator.clipboard.writeText(`${MISSION.venue}, ${MISSION.address}`)
    setAddressCopied(true)
    window.setTimeout(() => setAddressCopied(false), 2_000)
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setLinkCopied(true)
    window.setTimeout(() => setLinkCopied(false), 2_000)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#071426_0%,#071426_24%,#5a3de2_52%,#071426_78%,#5a3de2_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[url('/variants/space/stars.svg')] bg-[length:240px_240px] opacity-20" aria-hidden="true" />

      <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-24">
        <div className="absolute left-[-12rem] top-[15%] size-[30rem] rounded-full bg-[#5a3de2]/20 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1fr_.85fr]">
          <motion.div initial={reduceMotion ? false : { opacity: 0, x: -35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#a99cff]/25 bg-[#a99cff]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#a99cff]"><Satellite className="size-3.5" />Transmisión entrante</span>
            <p className="mt-8 text-sm font-bold uppercase tracking-[.32em] text-white/50">Misión 08 · Órbita de cumpleaños</p>
            <h1 className="mt-5 max-w-4xl text-[clamp(4.3rem,11vw,9.5rem)] font-black leading-[.76] tracking-[-.075em]">LÍA<br/><span className="text-[#a99cff]">AL ESPACIO</span></h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/65">La comandante Lía cumple {MISSION.age} años y necesita una tripulación extraordinaria para despegar.</p>
            <a href="#launch" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#5a3de2] px-6 py-3.5 text-sm font-black uppercase tracking-wide transition-transform hover:-translate-y-1">Consultar coordenadas <Orbit className="size-5" /></a>
          </motion.div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute inset-12 rounded-full border border-dashed border-[#a99cff]/30" />
            <motion.div animate={reduceMotion ? undefined : { rotate: [0, 2, 0, -2, 0] }} transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}><Image src="/variants/space/rocket.svg" alt="Cohete de la misión de Lía" width={620} height={760} priority className="relative w-full drop-shadow-[0_30px_35px_rgba(90,61,226,.25)]" /></motion.div>
          </motion.div>
        </div>
      </section>

      <section id="launch" className="relative px-5 py-24 text-white">
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="text-xs font-black uppercase tracking-[.3em] text-[#a99cff]">Próximo lanzamiento</p>
          <h2 className="mt-5 text-5xl font-black tracking-[-.05em] sm:text-7xl">24 JULIO 2027</h2>
          <div className="mt-12 flex items-start justify-center gap-2 sm:gap-5">
            {Object.entries(countdown).map(([label, value], index) => <div key={label} className="flex items-start gap-2 sm:gap-5"><div className="min-w-14 sm:min-w-24"><strong className="block text-3xl font-black tabular-nums text-white sm:text-7xl">{String(value).padStart(2, "0")}</strong><span className="mt-2 block text-[8px] font-bold uppercase tracking-[.18em] text-white/40 sm:text-[10px]">{{days:"días",hours:"horas",minutes:"min",seconds:"seg"}[label as keyof Countdown]}</span></div>{index < 3 && <span className="text-2xl font-light text-[#a99cff]/50 sm:text-5xl">:</span>}</div>)}
          </div>

        </div>
      </section>

      <section className="relative px-5 py-24">
        <div className="relative mx-auto max-w-5xl">
          <div className="relative min-h-[460px] overflow-hidden rounded-[2.5rem] border-4 border-white/20 bg-white shadow-2xl"><iframe title={`Mapa de ${MISSION.venue}`} src={`https://www.google.com/maps?q=${encodeURIComponent(`${MISSION.venue}, ${MISSION.address}`)}&output=embed`} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2"><button type="button" onClick={copyAddress} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold backdrop-blur hover:bg-white/15">{addressCopied ? <Check className="size-4 text-[#a99cff]"/> : <Copy className="size-4"/>}{addressCopied ? "Coordenadas copiadas" : "Copiar dirección"}</button><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${MISSION.venue}, ${MISSION.address}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#09162c] transition-transform hover:-translate-y-0.5"><MapPin className="size-4"/>Abrir Maps</a></div>
        </div>
      </section>

      <footer className="relative overflow-hidden px-5 py-20 text-center text-white">
        <div className="relative"><Image src="/variants/space/mission-badge.svg" alt="" width={520} height={520} className="mx-auto w-32" aria-hidden="true"/><Sparkles className="mx-auto mt-5 size-6 text-[#a99cff]"/><p className="mt-4 text-4xl font-black">NOS VEMOS EN ÓRBITA</p><p className="mt-3 text-sm text-white/55">Comparte la transmisión con tu tripulación.</p><div className="mt-7 flex justify-center gap-2"><a href={`https://wa.me/?text=${encodeURIComponent(`¡Acompáñanos a la Misión Espacial de ${MISSION.commander}! ${MISSION.date} a las ${MISSION.time}.`)}`} target="_blank" rel="noreferrer" className="grid size-12 place-items-center rounded-full border border-white/20 bg-white/10" aria-label="Compartir por WhatsApp"><MessageCircle className="size-5"/></a><button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 text-xs"><Copy className="size-4"/>{linkCopied ? "Enlace copiado" : "Copiar enlace"}</button></div></div>
      </footer>
    </main>
  )
}
