"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

const HERO = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1400&q=90"

export function XvWelcome() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#161512] text-[#f8f6f1]">
      <div className="grid h-full md:grid-cols-2">
        <motion.div initial={reduceMotion ? false : { opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} className="relative min-h-[44svh] overflow-hidden md:min-h-0">
          <Image src={HERO} alt="Valentina" fill priority className="object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161512] via-transparent to-black/10 md:bg-gradient-to-r md:from-transparent md:to-[#161512]" />
          <span className="absolute bottom-4 left-5 font-serif text-[8rem] font-light italic leading-none text-white/10 md:bottom-10 md:left-10 md:text-[13rem]">XV</span>
        </motion.div>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative flex flex-col justify-center px-7 pb-12 pt-4 text-center md:px-14 md:py-12 md:text-left">
          <Sparkles className="mx-auto size-5 text-[#a8875a] md:mx-0" />
          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[.55em] text-[#a8875a]">Mis XV años</p>
          <h1 className="mt-5 font-serif text-[clamp(3.8rem,9vw,7.5rem)] font-light italic leading-[.85]">Valentina</h1>
          <div className="mx-auto mt-7 h-px w-20 bg-[#a8875a] md:mx-0" />
          <p className="mt-6 text-xs uppercase tracking-[.3em] text-white/65">5 de septiembre de 2026 · 19:00 h</p>
          <motion.div whileHover={reduceMotion ? undefined : { x: 5 }} whileTap={{ scale: 0.98 }} className="mt-9 inline-flex justify-center md:justify-start">
            <Link href="/variants/xv/invitation" className="inline-flex items-center gap-3 border-b border-[#a8875a] pb-2 text-xs font-semibold uppercase tracking-[.25em]">
              Abrir invitación <ArrowRight className="size-4 text-[#a8875a]" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
