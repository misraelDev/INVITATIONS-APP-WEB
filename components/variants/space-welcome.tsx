"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Rocket } from "lucide-react"

export function SpaceWelcome() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="fixed inset-0 grid place-items-center overflow-hidden bg-[#071426] px-5 text-white">
      <div className="absolute inset-0 bg-[url('/variants/space/stars.svg')] bg-[length:240px_240px] opacity-50" />
      <div className="absolute left-1/2 top-1/2 size-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5a3de2]/15 blur-3xl" />
      <motion.div animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="absolute size-[620px] rounded-full border border-dashed border-white/15" />
      <div className="relative text-center">
        <motion.div initial={reduceMotion ? false : { scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto grid size-80 place-items-center rounded-full border border-white/20 shadow-[0_0_90px_rgba(255,255,255,.12)] sm:size-[390px]">
          <div className="absolute inset-5 rounded-full border border-dashed border-white/25" />
          <div className="absolute inset-12 rounded-full border border-white/20" />
          <Image src="/variants/space/mission-badge.svg" alt="Insignia de la misión espacial" width={520} height={520} priority className="w-52 sm:w-64" />
          <div className="absolute inset-x-0 bottom-14"><p className="text-[9px] font-bold uppercase tracking-[.35em] text-white/60">Acceso autorizado</p><p className="mt-2 text-sm font-semibold">Comandante Lía</p></div>
        </motion.div>
        <motion.div whileHover={reduceMotion ? undefined : { scale: 1.05 }} whileTap={{ scale: 0.96 }} className="relative -mt-7 inline-flex">
          <Link href="/variants/space/invitation" className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-[#5a3de2] px-7 py-4 text-sm font-black uppercase tracking-[.1em] text-white shadow-[0_0_35px_rgba(90,61,226,.5)]">
            <Rocket className="size-5" /> Iniciar misión
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
