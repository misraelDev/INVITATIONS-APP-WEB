"use client"

import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Copy, Check, MapPin, MessageCircle } from "lucide-react"
import { useEffect, useRef, useState, type FormEvent } from "react"

const EVENT = {
  name: "Valentina",
  date: "Sábado 5 de septiembre de 2026",
  weekday: "Sábado",
  day: "05",
  month: "Septiembre",
  year: "2026",
  time: "19:00 h",
  target: "2026-09-05T19:00:00-06:00",
  massVenue: "Catedral de Nuestra Señora",
  massAddress: "Av. Hidalgo 123, Centro Histórico, Morelia, Mich.",
  massTime: "17:00 h",
  partyVenue: "Salón Regency",
  partyAddress: "Paseo de las Fuentes 88, Morelia, Mich.",
  partyTime: "20:00 h",
  hero: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1800&q=90",
  editorial: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=90",
  court: ["Ana Sofía", "Regina", "Camila", "Fernanda", "Mariana", "Daniela"],
  gallery: [
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=88", tall: true },
    { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=88", tall: false },
    { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=88", tall: false },
    { src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1000&q=88", tall: true },
  ],
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

function Rule({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`h-px w-16 origin-left bg-[#a8875a] ${className}`}
    />
  )
}

function SectionHeading({ eyebrow, title, center = true }: { eyebrow: string; title: string; center?: boolean }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className={center ? "text-center" : ""}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[.5em] text-[#a8875a]">{eyebrow}</p>
      <Rule className={center ? "mx-auto mt-4" : "mt-4"} />
      <h2 className="mt-5 font-serif text-4xl font-light italic leading-tight text-[#161512] sm:text-5xl">{title}</h2>
    </motion.div>
  )
}

export function XvInvitation() {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

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
    <main className="min-h-screen bg-[#f8f6f1] text-[#161512]">
      <div ref={heroRef} className="relative h-[100svh] overflow-hidden">
        <motion.div style={reduceMotion ? undefined : { scale: heroScale }} className="absolute inset-0">
          <Image src={EVENT.hero} alt={EVENT.name} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/60" />
        </motion.div>
        <motion.div style={reduceMotion ? undefined : { opacity: heroOpacity }} className="relative flex h-full flex-col items-center justify-center px-5 text-center text-white">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-[11px] font-semibold uppercase tracking-[.6em] text-white/80"
          >
            Mis XV años
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-serif text-[clamp(3.5rem,13vw,8.5rem)] font-light italic leading-[.9]"
          >
            {EVENT.name}
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-7 text-xs font-medium uppercase tracking-[.35em] text-white/75"
          >
            {EVENT.date} · {EVENT.time}
          </motion.p>
        </motion.div>
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-0 bottom-8 flex justify-center text-white/70"
          aria-hidden="true"
        >
          <ChevronDown className="size-5" />
        </motion.div>
      </div>

      <section className="px-6 py-28 sm:py-36">
        <motion.blockquote
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-serif text-2xl font-light italic leading-relaxed text-[#161512] sm:text-3xl">
            "Hoy cierro un capítulo de niña y abro uno nuevo, con la misma gratitud de siempre y la ilusión de compartirlo con quienes más quiero."
          </p>
          <Rule className="mx-auto mt-8" />
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[.4em] text-[#a8875a]">{EVENT.name}</p>
        </motion.blockquote>
      </section>

      <section className="border-y border-[#161512]/10 bg-[#161512] px-6 py-20 text-[#f8f6f1]">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[.5em] text-[#a8875a]">Cuenta regresiva</p>
          <div className="mt-10 grid grid-cols-4 divide-x divide-white/15">
            {Object.entries(countdown).map(([label, value]) => (
              <div key={label} className="px-2 text-center sm:px-6">
                <strong className="block font-serif text-4xl font-light tabular-nums sm:text-6xl">{String(value).padStart(2, "0")}</strong>
                <span className="mt-3 block text-[9px] uppercase tracking-[.3em] text-white/50 sm:text-xs">
                  {{ days: "días", hours: "horas", minutes: "min", seconds: "seg" }[label as keyof Countdown]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28 sm:py-36">
        <SectionHeading eyebrow="Itinerario" title="La Celebración" />
        <div className="mx-auto mt-16 grid max-w-5xl gap-16 md:grid-cols-2">
          {[
            { number: "01", label: "Misa de acción de gracias", venue: EVENT.massVenue, address: EVENT.massAddress, time: EVENT.massTime, key: "mass" },
            { number: "02", label: "Recepción", venue: EVENT.partyVenue, address: EVENT.partyAddress, time: EVENT.partyTime, key: "party" },
          ].map((item, index) => (
            <motion.div
              key={item.key}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <span className="font-serif text-sm italic text-[#a8875a]">{item.number}</span>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[.3em] text-[#161512]/50">{item.label}</p>
              <h3 className="mt-4 font-serif text-3xl font-light italic">{item.venue}</h3>
              <p className="mt-3 text-sm leading-6 text-[#161512]/65">{item.address}</p>
              <p className="mt-2 text-sm font-medium text-[#161512]/80">
                {EVENT.weekday} {EVENT.day} de {EVENT.month} · {item.time}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => copyAddress(item.key, item.venue, item.address)}
                  className="inline-flex items-center gap-2 border-b border-[#161512]/30 pb-1 text-[11px] font-semibold uppercase tracking-[.2em] transition hover:border-[#161512]"
                >
                  {addressCopied === item.key ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  {addressCopied === item.key ? "Copiada" : "Copiar dirección"}
                </button>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.venue}, ${item.address}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-b border-[#161512]/30 pb-1 text-[11px] font-semibold uppercase tracking-[.2em] transition hover:border-[#161512]"
                >
                  <MapPin className="size-3.5" /> Cómo llegar
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative h-[70vh] min-h-[420px] overflow-hidden">
        <motion.div
          initial={reduceMotion ? false : { scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image src={EVENT.editorial} alt={EVENT.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/25" />
        </motion.div>
      </section>

      <section className="px-6 py-28 sm:py-36">
        <SectionHeading eyebrow="Con cariño" title="Corte de Honor" />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-x-3 gap-y-4 text-center"
        >
          {EVENT.court.map((name, index) => (
            <span key={name} className="flex items-center gap-3 text-sm uppercase tracking-[.25em] text-[#161512]/70">
              {name}
              {index < EVENT.court.length - 1 && <span className="text-[#a8875a]">·</span>}
            </span>
          ))}
        </motion.div>
      </section>

      <section className="bg-[#161512] px-6 py-28 text-[#f8f6f1] sm:py-36">
        <SectionHeading eyebrow="Momentos" title="Galería" />
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 sm:gap-6">
          {EVENT.gallery.map((item, index) => (
            <motion.div
              key={item.src}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
              className={`overflow-hidden ${item.tall ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}
            >
              <Image
                src={item.src}
                alt={`Fotografía ${index + 1} de ${EVENT.name}`}
                width={800}
                height={1000}
                className="size-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-lg">
          <SectionHeading eyebrow="RSVP" title="Confirmar Asistencia" />
          <div className="mt-14">
            {confirmed ? (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
                role="status"
              >
                <Check className="mx-auto size-8 text-[#a8875a]" />
                <p className="mt-5 font-serif text-2xl font-light italic">Gracias, {guest}.</p>
                <p className="mt-3 text-sm text-[#161512]/60">
                  Registramos tu asistencia con {companions} acompañante{companions === "1" ? "" : "s"}.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={confirm} noValidate className="space-y-8">
                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#161512]/60">Tu nombre</span>
                  <input
                    value={guest}
                    onChange={(event) => setGuest(event.target.value)}
                    className="mt-3 w-full border-0 border-b border-[#161512]/25 bg-transparent px-0 py-2 text-base focus:border-[#161512] focus:outline-none focus:ring-0"
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
                  <span className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#161512]/60">Acompañantes</span>
                  <select
                    value={companions}
                    onChange={(event) => setCompanions(event.target.value)}
                    className="mt-3 w-full border-0 border-b border-[#161512]/25 bg-transparent px-0 py-2 text-base focus:border-[#161512] focus:outline-none focus:ring-0"
                  >
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                  </select>
                </label>
                <button className="w-full bg-[#161512] py-4 text-[11px] font-semibold uppercase tracking-[.3em] text-[#f8f6f1] transition hover:bg-[#2a271f]">
                  Confirmar asistencia
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#161512]/10 px-6 py-16 text-center">
        <p className="font-serif text-3xl font-light italic">{EVENT.name}</p>
        <Rule className="mx-auto mt-5" />
        <p className="mt-6 text-[11px] uppercase tracking-[.3em] text-[#161512]/50">{EVENT.date}</p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Te invito a mis XV años. ${EVENT.date} a las ${EVENT.time}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-b border-[#161512]/30 pb-1 text-[11px] font-semibold uppercase tracking-[.2em] transition hover:border-[#161512]"
          >
            <MessageCircle className="size-3.5" /> Compartir
          </a>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex items-center gap-2 border-b border-[#161512]/30 pb-1 text-[11px] font-semibold uppercase tracking-[.2em] transition hover:border-[#161512]"
          >
            <Copy className="size-3.5" />
            {copied ? "Enlace copiado" : "Copiar enlace"}
          </button>
        </div>
      </footer>
    </main>
  )
}
