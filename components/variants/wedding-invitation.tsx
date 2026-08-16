"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Calendar, Check, Copy, Gift, Heart, MapPin, MessageCircle, Users } from "lucide-react"
import { useEffect, useState, type FormEvent } from "react"

const EVENT = {
  bride: "Fernanda",
  groom: "Rodrigo",
  date: "Sábado 14 de noviembre de 2026",
  weekday: "Sábado",
  day: "14",
  month: "Noviembre 2026",
  time: "17:00 h",
  target: "2026-11-14T17:00:00-06:00",
  ceremonyVenue: "Parroquia de Nuestra Señora del Carmen",
  ceremonyAddress: "Calle Canal 22, Centro, San Miguel de Allende, Gto.",
  receptionVenue: "Hacienda San Antonio",
  receptionAddress: "Carretera a Dolores Hidalgo Km 4, San Miguel de Allende, Gto.",
  hero: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
  bridePhoto: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=85",
  groomPhoto: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=85",
  ],
}

const STORY = [
  {
    title: "Cómo nos conocimos",
    date: "Marzo 2019",
    text: "Una tarde de café que se alargó por horas. Desde entonces no dejamos de buscar excusas para vernos.",
  },
  {
    title: "La primera cita",
    date: "Julio 2019",
    text: "Un paseo por el centro que terminó con la promesa de repetirlo cada semana. Y así fue.",
  },
  {
    title: "La propuesta",
    date: "Enero 2026",
    text: "Bajo las luces de nuestro restaurante favorito, Rodrigo hizo la pregunta y Fernanda dijo que sí.",
  },
]

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

export function WeddingInvitation() {
  const reduceMotion = useReducedMotion()
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [guest, setGuest] = useState("")
  const [companions, setCompanions] = useState("0")
  const [attending, setAttending] = useState("Sí, ahí estaré")
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
      setError("Escribe tu nombre para confirmar tu lugar en la mesa.")
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

  const copyAddress = async (venue: string, address: string) => {
    await navigator.clipboard.writeText(`${venue}, ${address}`)
    setAddressCopied(true)
    window.setTimeout(() => setAddressCopied(false), 2_000)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f4ee] text-[#26343d]">
      <section className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-20 pt-32">
        <Image src={EVENT.hero} alt={`${EVENT.bride} y ${EVENT.groom}`} fill priority className="absolute inset-0 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171f24]/85 via-[#171f24]/25 to-[#171f24]/10" />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-4xl text-center text-white"
        >
          <p className="text-xs font-semibold uppercase tracking-[.4em] text-white/75">Nos casamos</p>
          <h1 className="mt-4 font-serif text-[clamp(3rem,10vw,6.5rem)] italic leading-none">
            {EVENT.bride} &amp; {EVENT.groom}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-balance text-sm uppercase tracking-[.2em] text-white/80">{EVENT.date} · {EVENT.time}</p>
          <a
            href="#cuando-y-donde"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-[.2em] text-[#26343d] shadow-lg transition-transform hover:-translate-y-1"
          >
            Ver detalles <Heart className="size-4" />
          </a>
        </motion.div>
      </section>

      <section className="relative bg-[#8fa7b3] px-5 py-16 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[.3em] text-white/80">Faltan</p>
          <div className="mt-7 grid grid-cols-4 gap-2 sm:gap-4">
            {Object.entries(countdown).map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/25 bg-white/10 p-3 backdrop-blur-sm sm:p-6">
                <strong className="block text-3xl font-black tabular-nums sm:text-6xl">{String(value).padStart(2, "0")}</strong>
                <span className="mt-2 block text-[9px] uppercase tracking-wider text-white/70 sm:text-xs">
                  {{ days: "días", hours: "horas", minutes: "min", seconds: "seg" }[label as keyof Countdown]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <Heart className="mx-auto size-6 text-[#8fa7b3]" />
          <h2 className="mt-4 font-serif text-4xl italic sm:text-5xl">Los Novios</h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="text-center">
              <div className="mx-auto size-56 overflow-hidden rounded-full border-4 border-[#8fa7b3]/40 shadow-lg sm:size-64">
                <Image src={EVENT.bridePhoto} alt={EVENT.bride} width={400} height={400} className="size-full object-cover" />
              </div>
              <p className="mt-5 font-serif text-3xl italic">{EVENT.bride}</p>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#26343d]/65">
                Amante del café de olla y las tardes de lectura. Hoy, la novia más feliz del mundo.
              </p>
            </div>
            <Heart className="mx-auto hidden size-8 text-[#8fa7b3] sm:block" />
            <div className="text-center">
              <div className="mx-auto size-56 overflow-hidden rounded-full border-4 border-[#8fa7b3]/40 shadow-lg sm:size-64">
                <Image src={EVENT.groomPhoto} alt={EVENT.groom} width={400} height={400} className="size-full object-cover" />
              </div>
              <p className="mt-5 font-serif text-3xl italic">{EVENT.groom}</p>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#26343d]/65">
                Fanático del buen vino y las caminatas al atardecer. Hoy, el novio más afortunado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f0ece2] px-5 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Heart className="mx-auto size-6 text-[#8fa7b3]" />
          <h2 className="mt-4 font-serif text-4xl italic sm:text-5xl">Nuestra Historia</h2>
          <div className="mt-14 space-y-10 text-left">
            {STORY.map((item, index) => (
              <motion.div
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="relative rounded-3xl border border-[#26343d]/10 bg-white p-7 shadow-sm sm:p-10"
              >
                <p className="text-xs font-bold uppercase tracking-[.25em] text-[#8fa7b3]">{item.date}</p>
                <h3 className="mt-2 font-serif text-2xl italic">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#26343d]/65">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="cuando-y-donde" className="px-5 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <Heart className="mx-auto size-6 text-[#8fa7b3]" />
          <h2 className="mt-4 font-serif text-4xl italic sm:text-5xl">Cuándo y Dónde</h2>
          <div className="mt-14 grid gap-8 text-left md:grid-cols-2">
            {[
              { label: "Ceremonia religiosa", venue: EVENT.ceremonyVenue, address: EVENT.ceremonyAddress },
              { label: "Recepción", venue: EVENT.receptionVenue, address: EVENT.receptionAddress },
            ].map((place) => (
              <div key={place.label} className="rounded-3xl border border-[#26343d]/10 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#8fa7b3]">
                  <Calendar className="size-4" /> {place.label}
                </div>
                <p className="mt-4 text-sm font-semibold text-[#26343d]/70">
                  {EVENT.weekday} {EVENT.day} de {EVENT.month.split(" ")[0]} · {EVENT.time}
                </p>
                <h3 className="mt-3 font-serif text-2xl italic">{place.venue}</h3>
                <p className="mt-2 text-sm leading-6 text-[#26343d]/65">{place.address}</p>
                <div className="relative mt-6 min-h-64 overflow-hidden rounded-2xl border border-[#26343d]/10">
                  <iframe
                    title={`Mapa de ${place.venue}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(`${place.venue}, ${place.address}`)}&output=embed`}
                    className="absolute inset-0 size-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => copyAddress(place.venue, place.address)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#26343d]/20 px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#26343d] transition hover:bg-[#26343d]/5"
                  >
                    {addressCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    {addressCopied ? "Copiada" : "Copiar dirección"}
                  </button>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.venue}, ${place.address}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8fa7b3] px-5 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:-translate-y-0.5"
                  >
                    <MapPin className="size-4" /> Cómo llegar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f0ece2] px-5 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <Heart className="mx-auto size-6 text-[#8fa7b3]" />
          <h2 className="mt-4 font-serif text-4xl italic sm:text-5xl">Nuestra Galería</h2>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {EVENT.gallery.map((photo, index) => (
              <div key={photo} className="aspect-[3/4] overflow-hidden rounded-2xl shadow-sm">
                <Image
                  src={photo}
                  alt={`Fotografía ${index + 1} de ${EVENT.bride} y ${EVENT.groom}`}
                  width={600}
                  height={800}
                  className="size-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-[#26343d]/10 bg-white p-7 shadow-xl sm:p-12">
          <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-center">
            <div>
              <Gift className="size-9 text-[#8fa7b3]" />
              <h2 className="mt-5 font-serif text-4xl italic">Mesa de Regalos</h2>
              <p className="mt-4 text-sm leading-6 text-[#26343d]/65">
                Tu compañía es el regalo más importante. Si deseas tener un detalle con nosotros, contamos con mesa de regalos en Liverpool y sobre para
                quienes prefieran apoyarnos en nuestra luna de miel.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#26343d] p-7 text-white">
              {confirmed ? (
                <div className="py-10 text-center" role="status">
                  <Check className="mx-auto size-12 text-[#8fa7b3]" />
                  <h3 className="mt-5 font-serif text-3xl italic">¡Gracias por confirmar!</h3>
                  <p className="mt-3 text-sm text-white/70">
                    {guest}, registramos tu asistencia con {companions} acompañante{companions === "1" ? "" : "s"}.
                  </p>
                </div>
              ) : (
                <form onSubmit={confirm} noValidate>
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-[#8fa7b3]">Confirma tu asistencia</p>
                  <label className="mt-6 block text-xs font-bold">
                    Tu nombre
                    <input
                      value={guest}
                      onChange={(event) => setGuest(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:bg-white/15"
                      placeholder="Escribe tu nombre"
                      aria-invalid={!!error}
                    />
                  </label>
                  {error && (
                    <p role="alert" className="mt-2 text-xs text-[#e7c98f]">
                      {error}
                    </p>
                  )}
                  <label className="mt-4 block text-xs font-bold">
                    Acompañantes
                    <select
                      value={companions}
                      onChange={(event) => setCompanions(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/20 bg-[#1c262c] px-4 py-3 text-sm text-white"
                    >
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </label>
                  <label className="mt-4 block text-xs font-bold">
                    ¿Asistirás?
                    <select
                      value={attending}
                      onChange={(event) => setAttending(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/20 bg-[#1c262c] px-4 py-3 text-sm text-white"
                    >
                      <option>Sí, ahí estaré</option>
                      <option>No podré asistir</option>
                    </select>
                  </label>
                  <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8fa7b3] px-5 py-3.5 text-sm font-bold uppercase text-white">
                    <Users className="size-4" /> Confirmar asistencia
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-[#26343d] px-5 pb-16 pt-20 text-center text-white">
        <Heart className="mx-auto size-8 text-[#8fa7b3]" />
        <p className="mt-4 font-serif text-4xl italic">
          {EVENT.bride} &amp; {EVENT.groom}
        </p>
        <p className="mt-3 text-sm text-white/70">Gracias por ser parte de este día tan especial para nosotros.</p>
        <div className="mt-6 flex justify-center gap-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`¡Acompáñanos a la boda de ${EVENT.bride} y ${EVENT.groom}! ${EVENT.date} a las ${EVENT.time}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="grid size-12 place-items-center rounded-full bg-[#1f9f59]"
            aria-label="Compartir por WhatsApp"
          >
            <MessageCircle className="size-5" />
          </a>
          <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 text-xs">
            <Copy className="size-4" />
            {copied ? "Enlace copiado" : "Copiar enlace"}
          </button>
        </div>
      </footer>
    </main>
  )
}
