"use client"

import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Check, Copy, Flag, Gift, MapPin, MessageCircle, Users } from "lucide-react"
import { useEffect, useState, type FormEvent } from "react"

const EVENT = {
  name: "Noah",
  age: 6,
  date: "Sábado 13 de marzo",
  weekday: "Sábado",
  day: "13",
  month: "Marzo 2027",
  time: "15:30 h",
  target: "2027-03-13T15:30:00-06:00",
  venue: "Pista Turbo Kids",
  address: "Av. de la Velocidad 95, Ciudad de México",
}

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
  const [opened, setOpened] = useState(false)
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [guest, setGuest] = useState("")
  const [companions, setCompanions] = useState("0")
  const [error, setError] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [addressCopied, setAddressCopied] = useState(false)

  useEffect(() => {
    const update = () => setCountdown(getCountdown())
    update()
    const timer = window.setInterval(update, 1_000)
    return () => window.clearInterval(timer)
  }, [])

  const confirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (guest.trim().length < 2) {
      setError("Escribe tu nombre para apartar tu lugar en la parrilla.")
      return
    }
    setError("")
    setConfirmed(true)
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2_000)
  }

  const copyAddress = async () => {
    await navigator.clipboard.writeText(`${EVENT.venue}, ${EVENT.address}`)
    setAddressCopied(true)
    window.setTimeout(() => setAddressCopied(false), 2_000)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f0df] text-[#171717]">
      <AnimatePresence>
        {!opened && (
          <motion.section
            className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#f5dfb6] px-5"
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(115deg,transparent_45%,#e1b7a5_46%,transparent_49%),linear-gradient(25deg,transparent_45%,#c8d7d2_46%,transparent_49%)] [background-size:180px_180px]" />
            <div className="relative w-full max-w-[430px] pt-28 text-center">
              <motion.div initial={reduceMotion ? false : { y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-x-8 top-0 z-0 rounded-t-[2rem] bg-[#fff7e8] px-6 pb-24 pt-7 shadow-xl">
                <p className="text-[10px] font-black uppercase tracking-[.28em] text-[#be1713]">Pase de piloto</p>
                <p className="mt-2 text-2xl font-black italic uppercase">Gran Premio de {EVENT.name}</p>
              </motion.div>
              <div className="relative z-10 h-[285px] rounded-[1.8rem] bg-[#d91a16] shadow-[0_30px_70px_rgba(100,12,8,.35)]">
                <div className="absolute inset-x-0 top-0 h-0 border-l-[195px] border-r-[195px] border-t-[145px] border-l-transparent border-r-transparent border-t-[#f23827] drop-shadow-lg sm:border-l-[215px] sm:border-r-[215px]" />
                <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/25 bg-black/10 px-5 py-5 text-white backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[.3em] text-white/70">Invitación especial</p>
                  <p className="mt-2 text-sm">Haz clic para encender motores</p>
                </div>
              </div>
              <motion.button whileHover={reduceMotion ? undefined : { scale: 1.04 }} whileTap={{ scale: 0.97 }} type="button" onClick={() => setOpened(true)} className="relative z-20 -mt-8 inline-flex items-center gap-3 rounded-full border-4 border-[#f7f0df] bg-[#ffbf19] px-7 py-4 text-sm font-black uppercase tracking-[.08em] shadow-xl">
                <Flag className="size-5" /> Abrir invitación
              </motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#f2d9b5] px-5 py-20">
        <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_20%_20%,#fff_0_7%,transparent_8%),linear-gradient(125deg,transparent_60%,#d9a8a0_61%,transparent_75%)] [background-size:260px_260px,100%_100%]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[url('/variants/racing/checker.svg')] bg-[length:80px_80px] opacity-20" />
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 40 }} animate={opened || reduceMotion ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="relative mx-auto w-full max-w-5xl text-center">
          <div className="relative mx-auto max-w-2xl">
            <Image src="/variants/racing/name-plate.svg" alt="Placa de piloto" width={760} height={270} priority className="w-full" />
            <h1 className="absolute inset-x-0 top-[23%] font-serif text-[clamp(3rem,11vw,6rem)] italic leading-none text-white drop-shadow-md">{EVENT.name}</h1>
          </div>
          <div className="relative z-10 -mt-10">
            <p className="mx-auto w-fit -rotate-2 rounded-lg bg-[#171717] px-5 py-2 text-sm font-black uppercase tracking-[.15em] text-white shadow-lg">Cumple {EVENT.age} años</p>
            <Image src="/variants/racing/race-car.svg" alt={`Auto de carreras número ${EVENT.age}`} width={900} height={380} priority className="mx-auto mt-2 w-full max-w-4xl" />
          </div>
          <p className="mx-auto -mt-4 max-w-lg text-balance text-lg font-medium">Ajusta tu casco. Tenemos una misión: celebrar a toda velocidad.</p>
          <a href="#fecha" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#d91a16] px-6 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg transition-transform hover:-translate-y-1">Ver pase de carrera <Flag className="size-4" /></a>
        </motion.div>
      </section>

      <section id="fecha" className="relative bg-[#d91a16] px-5 py-20 text-white">
        <div className="absolute inset-x-0 top-0 h-5 bg-[url('/variants/racing/checker.svg')] bg-[length:40px_40px]" />
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-black uppercase tracking-[.28em] text-[#ffcf3f]">La carrera comienza en</p>
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
              { number: "01", label: "Fecha de carrera", code: EVENT.day, title: EVENT.weekday, detail: EVENT.month, serial: "FECHA 0013 2027" },
              { number: "02", label: "Hora de salida", code: "GO", title: EVENT.time, detail: "Llega 15 minutos antes", serial: "SALIDA 1530 BOX A" },
              { number: "03", label: "Circuito", code: "P1", title: EVENT.venue, detail: EVENT.address, serial: "PISTA TURBO ACCESO" },
            ].map((card) => (
              <div key={card.number} className="relative min-h-72 overflow-hidden rounded-[2rem] border-4 border-[#d91a16] bg-[#fff7e8] p-6 text-[#171717] shadow-2xl">
                <div className="absolute -right-10 -top-10 size-28 rotate-12 bg-[#ffbf19]" />
                <div className="relative flex items-center justify-between"><div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg bg-[#d91a16] text-[10px] font-black text-white">{card.number}</span><p className="text-[10px] font-black uppercase tracking-[.2em] text-black/45">{card.label}</p></div><span className="relative z-10 text-xl font-black italic">Nº {EVENT.age}</span></div>
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

      <section className="relative overflow-hidden bg-[#f7f0df] px-5 py-24 text-[#171717]">
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
              {addressCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {addressCopied ? "Dirección copiada" : "Copiar dirección"}
            </button>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${EVENT.venue}, ${EVENT.address}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d91a16] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5">
              <MapPin className="size-4" /> Abrir Maps
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#ffbf19] px-5 py-20">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border-4 border-[#171717] bg-[#f7f0df] p-7 shadow-[12px_12px_0_#171717] sm:p-12">
          <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-center">
            <div><Gift className="size-9 text-[#d91a16]"/><h2 className="mt-5 text-4xl font-black italic uppercase">Regalos de alto octanaje</h2><p className="mt-4 text-sm leading-6 text-black/60">Tu presencia es el mejor regalo. Si quieres tener un detalle, a Noah le encantan los bloques, cuentos y aventuras sobre ruedas.</p></div>
            <div className="rounded-[2rem] bg-[#d91a16] p-7 text-white">
              {confirmed ? (
                <div className="py-10 text-center" role="status"><Check className="mx-auto size-12 text-[#ffbf19]"/><h3 className="mt-5 text-3xl font-black italic uppercase">¡Lugar en la parrilla!</h3><p className="mt-3 text-sm text-white/70">{guest}, registramos tu asistencia con {companions} acompañante{companions === "1" ? "" : "s"}.</p></div>
              ) : (
                <form onSubmit={confirm} noValidate>
                  <p className="text-xs font-black uppercase tracking-[.2em] text-[#ffcf3f]">Confirmar asistencia</p>
                  <label className="mt-6 block text-xs font-bold">Nombre del piloto<input value={guest} onChange={(event) => setGuest(event.target.value)} className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:bg-white/15" placeholder="Tu nombre" aria-invalid={!!error} /></label>
                  {error && <p role="alert" className="mt-2 text-xs text-[#ffcf3f]">{error}</p>}
                  <label className="mt-4 block text-xs font-bold">Acompañantes<select value={companions} onChange={(event) => setCompanions(event.target.value)} className="mt-2 w-full rounded-xl border border-white/20 bg-[#a90e0b] px-4 py-3 text-sm text-white"><option>0</option><option>1</option><option>2</option><option>3</option></select></label>
                  <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ffbf19] px-5 py-3.5 text-sm font-black uppercase text-black"><Users className="size-4"/>Confirmar lugar</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-[#d91a16] px-5 pb-16 pt-24 text-center text-white">
        <div className="absolute inset-x-0 top-0 h-8 bg-[url('/variants/racing/checker.svg')] bg-[length:64px_64px]" />
        <Image src="/variants/racing/race-car.svg" alt="" width={900} height={380} className="mx-auto w-56" aria-hidden="true" />
        <p className="mt-3 text-4xl font-black italic uppercase text-[#ffcf3f]">¡Nos vemos en la meta!</p>
        <p className="mt-3 text-sm text-white/70">Comparte este pase con tu copiloto.</p>
        <div className="mt-6 flex justify-center gap-2">
          <a href={`https://wa.me/?text=${encodeURIComponent(`¡Acompáñanos al Gran Premio de ${EVENT.name}! ${EVENT.date} a las ${EVENT.time}.`)}`} target="_blank" rel="noreferrer" className="grid size-12 place-items-center rounded-full bg-[#1f9f59]" aria-label="Compartir por WhatsApp"><MessageCircle className="size-5"/></a>
          <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 text-xs"><Copy className="size-4"/>{copied ? "Enlace copiado" : "Copiar enlace"}</button>
        </div>
      </footer>
    </main>
  )
}
