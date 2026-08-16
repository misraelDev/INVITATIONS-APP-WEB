"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloud, faRainbow, faStar, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons"
import { UNICORN_EVENT as EVENT } from "./unicorn-data"

export function UnicornWelcome() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="fixed inset-0 grid place-items-center overflow-hidden bg-[linear-gradient(155deg,#211a45_0%,#6557c7_52%,#d47eb1_100%)] px-5 text-white">
      {Array.from({ length: 12 }, (_, index) => <FontAwesomeIcon key={index} icon={faStar} className="absolute text-white/35" style={{ left: `${8 + ((index * 23) % 84)}%`, top: `${7 + ((index * 31) % 78)}%`, fontSize: `${8 + (index % 3) * 5}px` }} aria-hidden="true"/>)}
      <FontAwesomeIcon icon={faCloud} className="absolute -left-14 bottom-5 text-[9rem] text-white/12" aria-hidden="true"/>
      <FontAwesomeIcon icon={faCloud} className="absolute -right-10 top-12 text-[7rem] text-[#91e3db]/15" aria-hidden="true"/>
      <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }} className="relative w-full max-w-[440px] text-center">
        <div className="relative overflow-hidden rounded-[3rem] border border-white/30 bg-white/10 px-7 pb-20 pt-10 shadow-[0_35px_90px_rgba(21,14,55,.38)] backdrop-blur-xl">
          <FontAwesomeIcon icon={faWandMagicSparkles} size="2xl" className="text-[#ffcfdf]"/>
          <div className="relative mx-auto mt-7 h-32 w-64 overflow-hidden rounded-t-full border-[18px] border-b-0 border-[#ff9ac2] before:absolute before:inset-[12px] before:rounded-t-full before:border-[18px] before:border-b-0 before:border-[#ffd68a] after:absolute after:inset-[42px] after:rounded-t-full after:border-[18px] after:border-b-0 after:border-[#91e3db]" />
          <p className="mt-7 text-[10px] font-black uppercase tracking-[.38em] text-[#bff6ef]">Fiesta en las nubes</p>
          <h1 className="mt-3 text-6xl font-black tracking-[-.06em] sm:text-7xl">{EVENT.name}</h1>
          <p className="mt-2 font-serif text-2xl italic text-[#ffcfdf]">cumple {EVENT.age}</p>
          <p className="mt-6 text-xs uppercase tracking-[.2em] text-white/65">{EVENT.date}</p>
        </div>
        <motion.div whileHover={reduceMotion ? undefined : { scale: 1.05 }} whileTap={{ scale: 0.96 }} className="relative -mt-7 inline-flex">
          <Link href="/variants/unicorn/invitation" className="inline-flex items-center gap-3 rounded-full border-4 border-[#6557c7] bg-[#91e3db] px-8 py-4 text-xs font-black uppercase tracking-[.16em] text-[#211a45] shadow-xl"><FontAwesomeIcon icon={faRainbow} size="xl" widthAuto/>Entrar al arcoíris</Link>
        </motion.div>
      </motion.div>
    </main>
  )
}
