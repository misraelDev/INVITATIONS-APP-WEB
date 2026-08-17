"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Check, Copy, MapPin, MessageCircle, Users } from "lucide-react"
import { useEffect, useState, type FormEvent } from "react"
import { GRADUATION_EVENT as EVENT } from "./graduation-data"
import { GraduationSeal } from "./graduation-seal"

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

function Tag({ index, label }: { index: string; label: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.3em] text-[#6b6b66]">
      <span className="text-[#0a0a0a]">{index}</span>
      <span className="h-px w-8 bg-[#0a0a0a]/30" />
      {label}
    </p>
  )
}

export function GraduationInvitation() {
  const reduceMotion = useReducedMotion()
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [guest, setGuest] = useState("")
  const [companions, setCompanions] = useState("0")
  const [error, setError] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [addressCopied, setAddressCopied] = useState<string | null>(null)

  useEffect(() => {
    const update = () => setCountdown(getCountdown())
    update()
    const timer = window.setInterval(update, 1_000)
    return () => window.clearInterval(timer)
  }, [])

  const confirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (guest.trim().length < 2) {
      setError("Escribe tu nombre para confirmar tu asistencia.")
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

  const copyAddress = async (key: string, venue: string, address: string) => {
    await navigator.clipboard.writeText(`${venue}, ${address}`)
    setAddressCopied(key)
    window.setTimeout(() => setAddressCopied(null), 2_000)
  }

  return (
    <main className="min-h-screen bg-[#f2f1ec] text-[#0a0a0a]">
      <section className="relative overflow-hidden border-b border-[#0a0a0a]/10 px-6 pb-16 pt-28 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-start justify-between">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Tag index="N.º 01" label="Invitación de graduación" />
            </motion.div>
            <GraduationSeal size={104} className="hidden sm:block" />
          </div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 text-[clamp(3rem,10vw,7.5rem)] font-black uppercase leading-[.85] tracking-[-.04em]"
          >
            {EVENT.name}
          </motion.h1>

          <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="max-w-lg text-lg leading-7 text-[#0a0a0a]/70"
            >
              {EVENT.school} · {EVENT.program}
            </motion.p>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-xs font-bold uppercase tracking-[.3em] text-[#0a0a0a]/50"
            >
              {EVENT.date} · {EVENT.ceremonyTime}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#0a0a0a]/10 px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[.9fr_1.1fr]">
          <Tag index="N.º 02" label="Mensaje" />
          <motion.blockquote
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-balance text-3xl font-medium leading-tight tracking-[-.01em] sm:text-4xl">"{EVENT.quote}"</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[.3em] text-[#0a0a0a]/50">— {EVENT.name.split(" ")[0]}</p>
          </motion.blockquote>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0a0a0a] px-6 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Tag index="N.º 03" label="Cuenta regresiva" />
          <div className="mt-10 grid grid-cols-4 divide-x divide-white/15">
            {Object.entries(countdown).map(([label, value]) => (
              <div key={label} className="px-2 text-center sm:px-8">
                <strong className="block text-4xl font-black tabular-nums sm:text-7xl">{String(value).padStart(2, "0")}</strong>
                <span className="mt-3 block text-[10px] font-bold uppercase tracking-[.3em] text-white/45">
                  {{ days: "días", hours: "horas", minutes: "min", seconds: "seg" }[label as keyof Countdown]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#0a0a0a]/10 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Tag index="N.º 04" label="Programa" />
          <div className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {[
              { code: "01", label: "Ceremonia", venue: EVENT.ceremonyVenue, address: EVENT.ceremonyAddress, time: EVENT.ceremonyTime, key: "ceremony" },
              { code: "02", label: "Recepción", venue: EVENT.receptionVenue, address: EVENT.receptionAddress, time: EVENT.receptionTime, key: "reception" },
            ].map((item, index) => (
              <motion.div
                key={item.key}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <div className="flex items-baseline justify-between border-b border-[#0a0a0a]/15 pb-4">
                  <span className="text-6xl font-black tracking-[-.04em] text-[#0a0a0a]/10">{item.code}</span>
                  <p className="text-[11px] font-bold uppercase tracking-[.3em] text-[#0a0a0a]/50">{item.label}</p>
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-[-.01em]">{item.venue}</h3>
                <p className="mt-2 text-sm leading-6 text-[#0a0a0a]/60">{item.address}</p>
                <p className="mt-2 text-sm font-semibold text-[#0a0a0a]/80">
                  {EVENT.weekday} {EVENT.day} de {EVENT.month} · {item.time}
                </p>
                <div className="mt-5 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => copyAddress(item.key, item.venue, item.address)}
                    className="inline-flex items-center gap-2 border-b border-[#0a0a0a]/30 pb-1 text-[11px] font-bold uppercase tracking-[.2em] transition hover:border-[#0a0a0a]"
                  >
                    {addressCopied === item.key ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    {addressCopied === item.key ? "Copiada" : "Copiar dirección"}
                  </button>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.venue}, ${item.address}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border-b border-[#0a0a0a]/30 pb-1 text-[11px] font-bold uppercase tracking-[.2em] transition hover:border-[#0a0a0a]"
                  >
                    <MapPin className="size-3.5" /> Cómo llegar
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#0a0a0a]/10 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Tag index="N.º 05" label="Trayectoria" />
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {EVENT.milestones.map((item, index) => (
              <motion.div
                key={item.year}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="border-t-2 border-[#0a0a0a] pt-5"
              >
                <p className="font-mono text-sm font-bold text-[#0a0a0a]/50">{item.year}</p>
                <h3 className="mt-3 text-xl font-bold tracking-[-.01em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#0a0a0a]/60">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#0a0a0a]/10 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Tag index="N.º 06" label="Galería" />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
            {EVENT.gallery.map((photo, index) => (
              <motion.div
                key={photo}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                className="group aspect-[3/4] overflow-hidden bg-[#0a0a0a]/5"
              >
                <Image
                  src={photo}
                  alt={`Fotografía ${index + 1} de ${EVENT.name}`}
                  width={600}
                  height={800}
                  className="size-full object-cover grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl">
          <Tag index="N.º 07" label="Confirmar asistencia" />
          <div className="mt-12">
            {confirmed ? (
              <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} role="status">
                <Check className="size-8" />
                <p className="mt-5 text-2xl font-bold tracking-[-.01em]">Gracias, {guest}.</p>
                <p className="mt-3 text-sm text-[#0a0a0a]/60">
                  Registramos tu asistencia con {companions} acompañante{companions === "1" ? "" : "s"}.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={confirm} noValidate className="space-y-8">
                <label className="block">
                  <span className="text-[11px] font-bold uppercase tracking-[.25em] text-[#0a0a0a]/50">Tu nombre</span>
                  <input
                    value={guest}
                    onChange={(event) => setGuest(event.target.value)}
                    className="mt-3 w-full border-0 border-b border-[#0a0a0a]/25 bg-transparent px-0 py-2 text-lg font-medium focus:border-[#0a0a0a] focus:outline-none focus:ring-0"
                    placeholder="Escribe tu nombre completo"
                    aria-invalid={!!error}
                  />
                </label>
                {error && (
                  <p role="alert" className="-mt-4 text-xs text-[#a33d3d]">
                    {error}
                  </p>
                )}
                <label className="block">
                  <span className="text-[11px] font-bold uppercase tracking-[.25em] text-[#0a0a0a]/50">Acompañantes</span>
                  <select
                    value={companions}
                    onChange={(event) => setCompanions(event.target.value)}
                    className="mt-3 w-full border-0 border-b border-[#0a0a0a]/25 bg-transparent px-0 py-2 text-lg font-medium focus:border-[#0a0a0a] focus:outline-none focus:ring-0"
                  >
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                  </select>
                </label>
                <button className="inline-flex w-full items-center justify-center gap-2 bg-[#0a0a0a] py-4 text-[11px] font-bold uppercase tracking-[.3em] text-[#f2f1ec] transition hover:bg-[#0a0a0a]/85">
                  <Users className="size-4" /> Confirmar asistencia
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#0a0a0a]/10 px-6 py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-2xl font-black uppercase tracking-[-.02em]">{EVENT.name}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[.3em] text-[#0a0a0a]/50">{EVENT.program}</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Te invito a mi graduación. ${EVENT.date} a las ${EVENT.ceremonyTime}.`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b border-[#0a0a0a]/30 pb-1 text-[11px] font-bold uppercase tracking-[.2em] transition hover:border-[#0a0a0a]"
            >
              <MessageCircle className="size-3.5" /> Compartir
            </a>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-2 border-b border-[#0a0a0a]/30 pb-1 text-[11px] font-bold uppercase tracking-[.2em] transition hover:border-[#0a0a0a]"
            >
              <Copy className="size-3.5" />
              {copied ? "Enlace copiado" : "Copiar enlace"}
            </button>
            <ArrowUpRight className="size-4 text-[#0a0a0a]/40" aria-hidden="true" />
          </div>
        </div>
      </footer>
    </main>
  )
}
