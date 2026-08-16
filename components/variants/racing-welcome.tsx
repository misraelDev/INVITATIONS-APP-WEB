"use client"

import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { RACING_EVENT } from "./racing-data"

export function RacingWelcome() {
  return (
    <motion.main
      className="fixed inset-0 grid place-items-center overflow-hidden bg-[linear-gradient(145deg,#f2d9b5_0%,#f2d9b5_58%,#d91a16_100%)] px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(115deg,transparent_45%,#e1b7a5_46%,transparent_49%),linear-gradient(25deg,transparent_45%,#c8d7d2_46%,transparent_49%)] [background-size:180px_180px]" />
          <div className="relative w-full max-w-[430px] pt-28 text-center">
            <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-x-8 top-0 z-0 rounded-t-[2rem] bg-[#fff7e8] px-6 pb-24 pt-7 shadow-xl">
              <p className="text-[10px] font-black uppercase tracking-[.28em] text-[#be1713]">Pase de piloto</p>
              <p className="mt-2 text-2xl font-black italic uppercase">Gran Premio de {RACING_EVENT.name}</p>
            </motion.div>
            <div className="relative z-10 h-[285px] rounded-[1.8rem] bg-[#d91a16] shadow-[0_30px_70px_rgba(100,12,8,.35)]">
              <div className="absolute inset-x-0 top-0 h-0 border-l-[195px] border-r-[195px] border-t-[145px] border-l-transparent border-r-transparent border-t-[#f23827] drop-shadow-lg sm:border-l-[215px] sm:border-r-[215px]" />
              <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/25 bg-black/10 px-5 py-5 text-white backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[.3em] text-white/70">Invitación especial</p>
                <p className="mt-2 text-sm">Haz clic para encender motores</p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="relative z-20 -mt-8 inline-flex">
              <Link href="/variants/racing/invitation" className="inline-flex items-center gap-3 rounded-full border-4 border-[#f7f0df] bg-[#ffbf19] px-7 py-4 text-sm font-black uppercase tracking-[.08em] shadow-xl">
                <FontAwesomeIcon icon={faFlagCheckered} size="xl" widthAuto /> Abrir invitación
              </Link>
            </motion.div>
          </div>
    </motion.main>
  )
}
