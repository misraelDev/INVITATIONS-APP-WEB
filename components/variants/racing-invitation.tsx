"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faFlagCheckered, faGaugeHigh, faLocationDot, faStopwatch, faTrophy } from "@fortawesome/free-solid-svg-icons"
import { faCalendarDays, faClock, faCopy } from "@fortawesome/free-regular-svg-icons"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { useEffect, useState } from "react"
import { RACING_EVENT as EVENT } from "./racing-data"

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

export function RacingInvitation() {
  const reduceMotion = useReducedMotion()
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [addressCopied, setAddressCopied] = useState(false)

  useEffect(() => {
    const update = () => setCountdown(getCountdown())
    update()
    const timer = window.setInterval(update, 1_000)
    return () => window.clearInterval(timer)
  }, [])

  const copyAddress = async () => {
    await navigator.clipboard.writeText(`${EVENT.venue}, ${EVENT.address}`)
    setAddressCopied(true)
    window.setTimeout(() => setAddressCopied(false), 2_000)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f2d9b5_0%,#f2d9b5_22%,#d91a16_34%,#d91a16_52%,#f2d9b5_63%,#f2d9b5_78%,#d91a16_90%,#d91a16_100%)] text-[#171717]">
      <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-20 lg:py-12">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(125deg,transparent_64%,#d9a8a0_65%,transparent_78%)]" />
        <div className="absolute -bottom-20 -left-[20%] h-[48%] w-[140%] rotate-3 bg-[#d91a16] lg:-right-[12%] lg:-top-[10%] lg:bottom-auto lg:left-auto lg:h-[120%] lg:w-[62%] lg:-rotate-6" />
        <FontAwesomeIcon icon={faGaugeHigh} className="absolute -left-12 top-20 -rotate-12 text-[11rem] text-[#d91a16]/5 lg:left-[42%] lg:top-12 lg:text-[16rem] lg:text-white/8" aria-hidden="true" />
        <FontAwesomeIcon icon={faFlagCheckered} className="absolute right-[8%] top-[10%] hidden rotate-12 text-[5rem] text-white/10 lg:block" aria-hidden="true" />
        <FontAwesomeIcon icon={faTrophy} className="absolute bottom-[12%] right-[4%] hidden -rotate-6 text-[4rem] text-[#ffbf19]/25 lg:block" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-[url('/variants/racing/checker.svg')] bg-[length:64px_64px]" />
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative z-20 pt-6 lg:py-16">
            <p className="text-[10px] font-black uppercase tracking-[.3em] text-[#d91a16]">Invitación oficial · Piloto Nº {EVENT.age}</p>
            <div className="relative -ml-3 mt-5 w-full max-w-[500px]">
              <Image src="/variants/racing/name-plate.svg" alt="Placa de piloto" width={760} height={270} priority className="w-full" />
              <h1 className="absolute inset-x-0 top-[22%] text-center font-serif text-[clamp(2.8rem,8vw,5.2rem)] italic leading-none text-white drop-shadow-md">{EVENT.name}</h1>
            </div>
            <h2 className="mt-3 max-w-xl text-5xl font-black italic uppercase leading-[.82] tracking-[-.06em] sm:text-7xl lg:text-8xl">Seis años a toda velocidad.</h2>
            <a href="#fecha" className="mt-12 inline-flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-lg transition-transform hover:-translate-y-1">Ver pase de carrera <FontAwesomeIcon icon={faFlagCheckered} size="lg" widthAuto /></a>
          </div>

          <div className="relative z-10 flex min-h-[380px] items-end justify-center lg:min-h-[680px] lg:items-center">
            <span className="absolute right-0 top-2 text-[13rem] font-black italic leading-none tracking-[-.12em] text-white/10 sm:text-[18rem] lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:text-[25rem]" aria-hidden="true">06</span>
            <div className="relative w-full max-w-[760px] lg:translate-x-10">
              <div className="absolute bottom-[12%] left-[10%] right-[5%] h-10 rounded-[50%] bg-black/25 blur-xl" />
              <Image src="/variants/racing/race-car.svg" alt={`Auto de carreras número ${EVENT.age}`} width={900} height={380} priority className="relative w-full -rotate-2 drop-shadow-2xl transition-transform duration-700 hover:rotate-0 hover:scale-[1.02]" />
              <span className="absolute bottom-[12%] right-[8%] -rotate-3 rounded-md bg-[#ffbf19] px-4 py-2 text-[10px] font-black uppercase tracking-[.16em] text-[#171717] shadow-lg">Piloto oficial</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="fecha" className="relative px-5 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.28em] text-[#ffcf3f]"><FontAwesomeIcon icon={faStopwatch} size="xl" widthAuto/>La carrera comienza en</p>
          <div className="mt-9 grid grid-cols-4 gap-2 sm:gap-4">
            {Object.entries(countdown).map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/20 bg-[#b70f0c] p-3 shadow-inner sm:p-6">
                <strong className="block text-3xl font-black italic tabular-nums sm:text-6xl">{String(value).padStart(2, "0")}</strong>
                <span className="mt-2 block text-[9px] uppercase tracking-wider text-white/65 sm:text-xs">{{ days: "días", hours: "horas", minutes: "min", seconds: "seg" }[label as keyof Countdown]}</span>
              </div>
            ))}
          </div>
          <div className="mt-14 grid gap-3 text-left md:grid-cols-3">
            {[
              { icon: faCalendarDays, number: "01", label: "Fecha de carrera", code: EVENT.day, title: EVENT.weekday, detail: EVENT.month, serial: "FECHA 0013 2027" },
              { icon: faClock, number: "02", label: "Hora de salida", code: "GO", title: EVENT.time, detail: "Llega 15 minutos antes", serial: "SALIDA 1530 BOX A" },
              { icon: faLocationDot, number: "03", label: "Circuito", code: "P1", title: EVENT.venue, detail: EVENT.address, serial: "PISTA TURBO ACCESO" },
            ].map((card) => (
              <div key={card.number} className="relative min-h-72 overflow-hidden rounded-[2rem] border-4 border-[#d91a16] bg-[#fff7e8] p-6 text-[#171717] shadow-2xl">
                <div className="absolute -right-10 -top-10 size-28 rotate-12 bg-[#ffbf19]" />
                <div className="relative flex items-center justify-between"><div className="flex items-center gap-2"><span className="grid size-9 place-items-center rounded-lg bg-[#d91a16] text-white"><FontAwesomeIcon icon={card.icon} size="lg" widthAuto/></span><div><span className="text-[8px] font-black text-[#d91a16]">{card.number}</span><p className="text-[10px] font-black uppercase tracking-[.16em] text-black/45">{card.label}</p></div></div><span className="relative z-10 text-xl font-black italic">Nº {EVENT.age}</span></div>
                <div className="relative mt-9 grid grid-cols-[68px_1fr] gap-4">
                  <div className="grid h-24 place-items-center rounded-xl bg-[#d91a16] text-4xl font-black italic text-white">{card.code}</div>
                  <div className="self-center"><p className={`font-black uppercase leading-tight ${card.number === "03" ? "text-lg" : "text-2xl"}`}>{card.title}</p><p className="mt-2 text-xs font-bold leading-5 text-black/45">{card.detail}</p></div>
                </div>
                <div className="absolute bottom-6 left-6 right-6"><div className="h-8 opacity-75 [background:repeating-linear-gradient(90deg,#171717_0_2px,transparent_2px_5px,#171717_5px_9px,transparent_9px_12px)]"/><p className="mt-1 text-center text-[8px] font-bold tracking-[.28em] text-black/40">{card.serial}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 text-[#171717]">
        <div className="absolute -right-20 -top-20 size-72 rounded-full border-[45px] border-[#d91a16]/5" />
        <div className="relative mx-auto max-w-5xl">
          <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border-4 border-[#d91a16] bg-white shadow-2xl">
            <iframe
              title={`Mapa de ${EVENT.venue}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${EVENT.venue}, ${EVENT.address}`)}&output=embed`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={copyAddress} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#d91a16] bg-white px-6 py-4 text-sm font-black text-[#d91a16] transition hover:bg-[#d91a16]/5">
              <FontAwesomeIcon icon={addressCopied ? faCheck : faCopy} size="lg" widthAuto />
              {addressCopied ? "Dirección copiada" : "Copiar dirección"}
            </button>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${EVENT.venue}, ${EVENT.address}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d91a16] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5">
              <FontAwesomeIcon icon={faLocationDot} size="lg" widthAuto /> Abrir Maps
            </a>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-12 bg-[url('/variants/racing/checker.svg')] bg-[length:64px_64px]" />
      </section>

      <footer className="relative px-5 pb-16 pt-24 text-center text-white">
        <Image src="/variants/racing/race-car.svg" alt="" width={900} height={380} className="mx-auto w-56" aria-hidden="true" />
        <FontAwesomeIcon icon={faTrophy} size="2xl" className="mx-auto mt-2 text-[#ffcf3f]"/>
        <p className="mt-3 text-4xl font-black italic uppercase text-[#ffcf3f]">¡Nos vemos en la meta!</p>
        <a href={`https://wa.me/?text=${encodeURIComponent(`Hola, confirmo mi asistencia al Gran Premio de ${EVENT.name} el ${EVENT.date} a las ${EVENT.time}.`)}`} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#1f9f59] px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1"><FontAwesomeIcon icon={faWhatsapp} size="xl" widthAuto/>Confirmar por WhatsApp</a>
      </footer>
    </main>
  )
}
