"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCrown } from "@fortawesome/free-solid-svg-icons"
import { PRINCESS_EVENT as EVENT } from "./princess-data"

export function PrincessWelcome() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="fixed inset-0 grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#fff7f2_0%,#f3d5df_48%,#6b2742_130%)] px-5 text-[#522035]">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle,#c29a52_1px,transparent_1px)] [background-size:38px_38px]" />
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative w-full max-w-[430px] text-center">
        <div className="relative mx-auto min-h-[430px] overflow-hidden rounded-t-[13rem] rounded-b-[2.5rem] border border-[#c29a52]/50 bg-[#fffaf5]/85 px-8 pb-20 pt-16 shadow-[0_35px_90px_rgba(82,32,53,.25)] backdrop-blur-sm">
          <div className="absolute inset-4 rounded-t-[12rem] rounded-b-[1.8rem] border border-[#c29a52]/30" />
          <FontAwesomeIcon icon={faCrown} size="2xl" className="relative text-[#c29a52]" />
          <p className="relative mt-7 text-[10px] font-semibold uppercase tracking-[.42em] text-[#8d5870]">Una invitación real</p>
          <h1 className="relative mt-5 font-serif text-6xl italic leading-none sm:text-7xl">{EVENT.name}</h1>
          <p className="relative mt-4 font-serif text-2xl italic text-[#c29a52]">cumple {EVENT.age}</p>
          <div className="relative mx-auto mt-7 h-px w-20 bg-[#c29a52]/60" />
          <p className="relative mt-6 text-xs uppercase tracking-[.22em] text-[#6b2742]/65">{EVENT.date}</p>
        </div>
        <motion.div whileHover={reduceMotion ? undefined : { scale: 1.04 }} whileTap={{ scale: 0.97 }} className="relative -mt-7 inline-flex">
          <Link href="/variants/princess/invitation" className="inline-flex items-center gap-3 rounded-full border-4 border-[#fffaf5] bg-[#6b2742] px-8 py-4 text-xs font-bold uppercase tracking-[.18em] text-white shadow-xl">
            <FontAwesomeIcon icon={faCrown} size="lg" widthAuto /> Abrir invitación
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}
