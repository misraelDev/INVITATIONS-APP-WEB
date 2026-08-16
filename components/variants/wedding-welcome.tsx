"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Heart } from "lucide-react"

const HERO = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"

export function WeddingWelcome() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="fixed inset-0 grid place-items-center overflow-hidden bg-[#26343d] px-5 text-white">
      <Image src={HERO} alt="" fill priority className="object-cover opacity-45" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(23,31,36,.9),rgba(23,31,36,.18),rgba(23,31,36,.72))]" />
      <div className="relative w-full max-w-[460px] text-center">
        <motion.div initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto grid size-72 place-items-center rounded-full border border-white/45 bg-black/20 backdrop-blur-sm sm:size-80">
          <div className="absolute inset-3 rounded-full border border-white/15" />
          <div className="px-6">
            <Heart className="mx-auto size-5 text-[#c6d3d9]" />
            <p className="mt-5 text-[10px] uppercase tracking-[.4em] text-white/70">Nos casamos</p>
            <h1 className="mt-3 font-serif text-4xl italic sm:text-5xl">Fernanda <span className="text-[#b5c6ce]">&amp;</span> Rodrigo</h1>
            <p className="mt-4 text-[10px] uppercase tracking-[.22em] text-white/70">14 de noviembre de 2026</p>
          </div>
        </motion.div>
        <motion.div whileHover={reduceMotion ? undefined : { scale: 1.04 }} whileTap={{ scale: 0.97 }} className="mt-9 inline-flex">
          <Link href="/variants/wedding/invitation" className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-[#26343d]/45 px-8 py-3.5 text-xs font-semibold uppercase tracking-[.2em] text-white backdrop-blur-md transition hover:bg-white/10">
            <Heart className="size-4" /> Abrir invitación
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
