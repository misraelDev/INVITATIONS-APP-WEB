"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { GRADUATION_EVENT as EVENT } from "./graduation-data"
import { GraduationSeal } from "./graduation-seal"

export function GraduationWelcome() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="fixed inset-0 grid place-items-center overflow-hidden bg-[#0a0a0a] px-5 text-white">
      <div className="absolute inset-6 border border-white/15 sm:inset-10" aria-hidden="true" />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[480px] text-center"
      >
        <GraduationSeal size={120} dark className="mx-auto" />
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[.5em] text-white/55">{EVENT.program}</p>
        <h1 className="mt-4 text-5xl font-black uppercase leading-[.9] tracking-[-.03em] sm:text-6xl">{EVENT.name}</h1>
        <p className="mt-5 text-xs font-bold uppercase tracking-[.25em] text-white/45">{EVENT.date}</p>
        <motion.div whileHover={reduceMotion ? undefined : { scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-10 inline-flex">
          <Link
            href="/variants/graduation/invitation"
            className="inline-flex items-center gap-3 bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[.3em] text-[#0a0a0a] transition hover:bg-white/90"
          >
            Ver invitación <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}
