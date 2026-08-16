"use client"

import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { CalendarPlus, Check, Church, Copy, Feather, Gift, MapPin, MessageCircle, Sparkles, Users } from "lucide-react"
import { useEffect, useMemo, useState, type FormEvent } from "react"

const EVENT = {
  name: "Sofía",
  parents: "Andrea & Diego",
  date: "Sábado 20 de marzo de 2027",
  weekday: "Sábado",
  day: "20",
  month: "Marzo",
  year: "2027",
  time: "13:00 h",
  target: "2027-03-20T13:00:00-06:00",
  venue: "Parroquia de San Francisco de Asís",
  address: "Av. Revolución 1425, San Ángel, Ciudad de México",
  godfather: "Carlos Ramírez",
  godmother: "Paola Herrera",
  photo: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1400&q=85",
  godfatherPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85",
  godmotherPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=800&q=85",
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

const SPARKLE_SEEDS = Array.from({ length: 18 }, (_, i) => i)

function SparkleField({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const sparkles = useMemo(
    () =>
      SPARKLE_SEEDS.map((seed) => ({
        left: `${(seed * 37) % 100}%`,
        top: `${(seed * 53) % 100}%`,
        size: 3 + (seed % 4),
        delay: (seed % 6) * 0.5,
        duration: 4 + (seed % 5),
      })),
    [],
  )

  if (reduceMotion) return null

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {sparkles.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#f0d68a]"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size, boxShadow: "0 0 8px 2px rgba(240,214,138,0.8)" }}
          animate={{ opacity: [0, 1, 0], y: [0, -22, -40], scale: [0.6, 1, 0.6] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

function HaloGlow() {
  const reduceMotion = useReducedMotion()
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-[#f0d68a]/40"
          style={{ width: `${55 + ring * 18}%`, aspectRatio: "1 / 1" }}
          animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 4 + ring, repeat: Infinity, ease: "easeInOut", delay: ring * 0.4 }}
        />
      ))}
      <div className="absolute size-[70%] rounded-full bg-[radial-gradient(circle,rgba(240,214,138,0.55)_0%,rgba(240,214,138,0)_70%)]" />
    </div>
  )
}

export function BaptismInvitation() {
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

  const copyAddress = async () => {
    await navigator.clipboard.writeText(`${EVENT.venue}, ${EVENT.address}`)
    setAddressCopied(true)
    window.setTimeout(() => setAddressCopied(false), 2_000)
  }

  const toGCalStamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  const start = new Date(EVENT.target)
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000)
  const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Bautizo de ${EVENT.name}`,
  )}&dates=${toGCalStamp(start)}/${toGCalStamp(end)}&location=${encodeURIComponent(
    `${EVENT.venue}, ${EVENT.address}`,
  )}&details=${encodeURIComponent(`Acompáñanos a celebrar el bautizo de ${EVENT.name}.`)}`

  return (
    <main className="min-h-screen overflow-hidden bg-[#faf5e9] text-[#3a2e1f]">
      <AnimatePresence>
        {!opened && (
          <motion.section
            className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#f4ecd8] px-5"
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.8 }}
          >
            <SparkleField />
            <div className="relative w-full max-w-[420px] text-center">
              <HaloGlow />
              <motion.div
                initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="mx-auto size-64 overflow-hidden rounded-full border-4 border-[#f0d68a] shadow-[0_0_60px_rgba(240,214,138,0.55)] sm:size-72">
                  <Image src={EVENT.photo} alt={EVENT.name} width={400} height={400} priority className="size-full object-cover" />
                </div>
                <p className="relative mt-6 text-xs font-semibold uppercase tracking-[.5em] text-[#b8912f]">Bautizo</p>
                <p className="relative mt-2 bg-[linear-gradient(90deg,#b8912f,#f0d68a,#b8912f)] bg-[length:200%_auto] bg-clip-text font-serif text-6xl italic text-transparent [animation:shimmer_3.5s_linear_infinite]">
                  {EVENT.name}
                </p>
                <p className="relative mt-3 text-xs uppercase tracking-[.25em] text-[#6b5a3d]">
                  {EVENT.day}/{EVENT.month === "Marzo" ? "03" : EVENT.month}/{EVENT.year} · {EVENT.time}
                </p>
              </motion.div>
              <motion.button
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => setOpened(true)}
                className="relative z-10 mt-10 inline-flex items-center gap-2 rounded-full border border-[#b8912f]/50 bg-gradient-to-r from-[#f0d68a] to-[#d8b45a] px-8 py-3.5 text-xs font-bold uppercase tracking-[.2em] text-[#3a2e1f] shadow-lg transition"
              >
                <Sparkles className="size-4" /> Abrir invitación
              </motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(240,214,138,0.35),transparent_55%)]" />
        <SparkleField />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={opened || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative mx-auto w-full max-w-2xl text-center"
        >
          <div className="relative mx-auto size-72 sm:size-80">
            <HaloGlow />
            <div className="relative size-full overflow-hidden rounded-full border-4 border-[#f0d68a] shadow-[0_0_80px_rgba(240,214,138,0.5)]">
              <Image src={EVENT.photo} alt={EVENT.name} width={640} height={640} priority className="size-full object-cover" />
            </div>
          </div>
          <p className="relative mt-8 text-xs font-semibold uppercase tracking-[.5em] text-[#b8912f]">Bautizo</p>
          <h1 className="relative mt-3 bg-[linear-gradient(90deg,#b8912f,#f0d68a,#b8912f)] bg-[length:200%_auto] bg-clip-text font-serif text-[clamp(3.5rem,12vw,7rem)] italic leading-none text-transparent [animation:shimmer_3.5s_linear_infinite]">
            {EVENT.name}
          </h1>
          <p className="relative mt-5 text-sm uppercase tracking-[.25em] text-[#6b5a3d]">
            {EVENT.date} · {EVENT.time}
          </p>
          <p className="relative mx-auto mt-6 max-w-md text-balance italic text-[#6b5a3d]">
            "Con amor y fe, celebramos el primer paso espiritual de nuestra pequeña {EVENT.name}. ¡Acompáñanos en este día tan especial!"
          </p>
        </motion.div>
      </section>

      <section className="relative bg-gradient-to-b from-[#3a2e1f] to-[#4a3b28] px-5 py-16 text-[#f4ecd8]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f0d68a] to-transparent" />
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[.35em] text-[#f0d68a]">Nos vemos en</p>
          <div className="mt-7 grid grid-cols-4 gap-2 sm:gap-4">
            {Object.entries(countdown).map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#f0d68a]/30 bg-white/5 p-3 shadow-inner backdrop-blur-sm sm:p-6">
                <strong className="block text-3xl font-black italic tabular-nums text-[#f0d68a] sm:text-6xl">{String(value).padStart(2, "0")}</strong>
                <span className="mt-2 block text-[9px] uppercase tracking-wider text-[#f4ecd8]/60 sm:text-xs">
                  {{ days: "días", hours: "horas", minutes: "min", seconds: "seg" }[label as keyof Countdown]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#4a3b28] px-5 py-24 text-[#f4ecd8]">
        <SparkleField />
        <div className="relative mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {[
            { quote: "Con orgullo y alegría, invitamos a nuestros seres queridos a compartir el bautizo de nuestra hija, un día lleno de bendiciones y amor.", who: `Papá de ${EVENT.name}` },
            { quote: `Gracias por ser parte del camino de fe de ${EVENT.name}. Su sonrisa es la mejor bendición que hemos recibido.`, who: `Mamá de ${EVENT.name}` },
          ].map((item, index) => (
            <motion.blockquote
              key={item.who}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="rounded-3xl border border-[#f0d68a]/25 bg-white/5 p-8 text-center backdrop-blur-sm"
            >
              <Feather className="mx-auto size-6 text-[#f0d68a]" />
              <p className="mt-5 text-balance italic leading-7 text-[#f4ecd8]/85">"{item.quote}"</p>
              <p className="mt-5 font-serif text-lg italic text-[#f0d68a]">— {item.who}</p>
            </motion.blockquote>
          ))}
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Sparkles className="mx-auto size-6 text-[#b8912f]" />
          <h2 className="mt-4 font-serif text-4xl italic sm:text-5xl">Menciones Especiales</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#6b5a3d]">
            Queremos mencionar a los padrinos de {EVENT.name}. Gracias por acompañarnos en esta fecha tan importante para nosotros y por la amistad que
            hemos mantenido por tantos años.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              { role: "Padrino", name: EVENT.godfather, photo: EVENT.godfatherPhoto },
              { role: "Madrina", name: EVENT.godmother, photo: EVENT.godmotherPhoto },
            ].map((person) => (
              <motion.div
                key={person.role}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                className="flex items-center gap-4 rounded-2xl border border-[#b8912f]/20 bg-white p-5 shadow-sm"
              >
                <div className="size-20 shrink-0 overflow-hidden rounded-full border-2 border-[#f0d68a] shadow-[0_0_20px_rgba(240,214,138,0.4)]">
                  <Image src={person.photo} alt={person.name} width={160} height={160} className="size-full object-cover" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#b8912f]">{person.role}</p>
                  <p className="mt-1 font-serif text-xl italic">{person.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="ceremonia" className="relative bg-[#f4ecd8] px-5 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Church className="mx-auto size-6 text-[#b8912f]" />
          <h2 className="mt-4 font-serif text-4xl italic sm:text-5xl">Ceremonia Religiosa</h2>
          <p className="mt-3 text-sm uppercase tracking-[.2em] text-[#6b5a3d]">{EVENT.address.split(",").slice(-2).join(",").trim()}</p>
          <div className="mt-10 overflow-hidden rounded-[2rem] border-4 border-[#f0d68a]/60 shadow-2xl">
            <div className="relative min-h-72">
              <iframe
                title={`Mapa de ${EVENT.venue}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${EVENT.venue}, ${EVENT.address}`)}&output=embed`}
                className="absolute inset-0 size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
          <div className="mx-auto mt-7 max-w-xl rounded-2xl border border-[#b8912f]/25 bg-white p-6 text-left shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#b8912f]">
              {EVENT.weekday} {EVENT.day} de {EVENT.month} · {EVENT.time}
            </p>
            <h3 className="mt-2 font-serif text-2xl italic">{EVENT.venue}</h3>
            <p className="mt-2 text-sm leading-6 text-[#6b5a3d]">{EVENT.address}</p>
          </div>
          <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={copyAddress}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#b8912f]/40 px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#3a2e1f] transition hover:bg-[#b8912f]/10"
            >
              {addressCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {addressCopied ? "Copiada" : "Copiar dirección"}
            </button>
            <a
              href={calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#b8912f]/40 px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#3a2e1f] transition hover:bg-[#b8912f]/10"
            >
              <CalendarPlus className="size-4" /> Añadir a calendario
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${EVENT.venue}, ${EVENT.address}`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f0d68a] to-[#d8b45a] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#3a2e1f] shadow-md transition hover:-translate-y-0.5"
            >
              <MapPin className="size-4" /> Abrir en Maps
            </a>
          </div>
          <p className="mt-14 font-serif text-3xl italic text-[#b8912f]">¡Te esperamos!</p>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <Sparkles className="mx-auto size-6 text-[#b8912f]" />
          <h2 className="mt-4 font-serif text-4xl italic sm:text-5xl">Galería</h2>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {EVENT.gallery.map((photo, index) => (
              <motion.div
                key={photo}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="aspect-square overflow-hidden rounded-2xl border-2 border-[#f0d68a]/40 shadow-sm"
              >
                <Image
                  src={photo}
                  alt={`Fotografía ${index + 1} de ${EVENT.name}`}
                  width={500}
                  height={500}
                  className="size-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#4a3b28] to-[#3a2e1f] px-5 py-24 text-[#f4ecd8]">
        <SparkleField />
        <div className="relative mx-auto max-w-4xl rounded-[2.5rem] border border-[#f0d68a]/30 bg-white/5 p-7 shadow-2xl backdrop-blur-sm sm:p-12">
          <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-center">
            <div>
              <Gift className="size-9 text-[#f0d68a]" />
              <h2 className="mt-5 font-serif text-4xl italic">Mesa de Regalos</h2>
              <p className="mt-4 text-sm leading-6 text-[#f4ecd8]/70">
                Tu presencia es la mejor bendición para {EVENT.name}. Si deseas tener un detalle, contamos con mesa de regalos en Liverpool.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#2f2416] p-7">
              {confirmed ? (
                <div className="py-10 text-center" role="status">
                  <Check className="mx-auto size-12 text-[#f0d68a]" />
                  <h3 className="mt-5 font-serif text-3xl italic">¡Gracias por confirmar!</h3>
                  <p className="mt-3 text-sm text-[#f4ecd8]/70">
                    {guest}, registramos tu asistencia con {companions} acompañante{companions === "1" ? "" : "s"}.
                  </p>
                </div>
              ) : (
                <form onSubmit={confirm} noValidate>
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-[#f0d68a]">Confirmar asistencia</p>
                  <label className="mt-6 block text-xs font-bold">
                    Tu nombre
                    <input
                      value={guest}
                      onChange={(event) => setGuest(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#f0d68a]/25 bg-white/10 px-4 py-3 text-sm text-[#f4ecd8] placeholder:text-[#f4ecd8]/40 focus:bg-white/15"
                      placeholder="Escribe tu nombre"
                      aria-invalid={!!error}
                    />
                  </label>
                  {error && (
                    <p role="alert" className="mt-2 text-xs text-[#f0a58a]">
                      {error}
                    </p>
                  )}
                  <label className="mt-4 block text-xs font-bold">
                    Acompañantes
                    <select
                      value={companions}
                      onChange={(event) => setCompanions(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#f0d68a]/25 bg-[#231b10] px-4 py-3 text-sm text-[#f4ecd8]"
                    >
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </label>
                  <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f0d68a] to-[#d8b45a] px-5 py-3.5 text-sm font-bold uppercase text-[#3a2e1f]">
                    <Users className="size-4" /> Confirmar asistencia
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-[#3a2e1f] px-5 pb-16 pt-20 text-center text-[#f4ecd8]">
        <Sparkles className="mx-auto size-8 text-[#f0d68a]" />
        <p className="mt-4 font-serif text-4xl italic text-[#f0d68a]">{EVENT.name}</p>
        <p className="mt-3 text-sm text-[#f4ecd8]/70">Con amor, {EVENT.parents}</p>
        <div className="mt-6 flex justify-center gap-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`¡Acompáñanos al bautizo de ${EVENT.name}! ${EVENT.date} a las ${EVENT.time}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="grid size-12 place-items-center rounded-full bg-[#1f9f59]"
            aria-label="Compartir por WhatsApp"
          >
            <MessageCircle className="size-5" />
          </a>
          <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-full border border-[#f0d68a]/25 px-5 text-xs">
            <Copy className="size-4" />
            {copied ? "Enlace copiado" : "Copiar enlace"}
          </button>
        </div>
      </footer>
    </main>
  )
}
