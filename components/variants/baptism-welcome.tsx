"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Sparkles } from "lucide-react"

const PHOTO = "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=85"

export function BaptismWelcome() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="fixed inset-0 grid place-items-center overflow-hidden bg-[#f4ecd8] px-5 text-[#3a2e1f]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(240,214,138,.6),transparent_38%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle,#b8912f_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="relative w-full max-w-[430px] text-center">
        <motion.div initial={reduceMotion ? false : { scale: 0.84, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <div className="relative mx-auto size-64 sm:size-72">
            <div className="absolute -inset-5 rounded-full border border-[#b8912f]/25" />
            <div className="absolute -inset-10 rounded-full border border-dashed border-[#b8912f]/20" />
            <div className="relative size-full overflow-hidden rounded-full border-4 border-[#f0d68a] shadow-[0_0_65px_rgba(184,145,47,.35)]">
              <Image src={PHOTO} alt="Sofía" fill priority className="object-cover" />
            </div>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[.5em] text-[#b8912f]">Bautizo</p>
          <h1 className="mt-2 font-serif text-6xl italic text-[#8e6b1f]">Sofía</h1>
          <p className="mt-3 text-xs uppercase tracking-[.22em] text-[#6b5a3d]">20 de marzo de 2027 · 13:00 h</p>
        </motion.div>
        <motion.div whileHover={reduceMotion ? undefined : { scale: 1.05 }} whileTap={{ scale: 0.96 }} className="mt-9 inline-flex">
          <Link href="/variants/baptism/invitation" className="inline-flex items-center gap-2 rounded-full border border-[#b8912f]/50 bg-gradient-to-r from-[#f0d68a] to-[#d8b45a] px-8 py-3.5 text-xs font-bold uppercase tracking-[.2em] shadow-lg">
            <Sparkles className="size-4" /> Abrir invitación
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
