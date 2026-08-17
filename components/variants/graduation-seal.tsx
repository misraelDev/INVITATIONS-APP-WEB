"use client"

import { motion, useReducedMotion } from "framer-motion"
import { GraduationCap } from "lucide-react"

const SEAL_TEXT = "GENERACIÓN 2026 · CLASS OF 2026 · "

export function GraduationSeal({ size = 128, className = "", dark = false }: { size?: number; className?: string; dark?: boolean }) {
  const reduceMotion = useReducedMotion()
  const chars = SEAL_TEXT.split("")
  const step = 360 / chars.length
  const radius = size / 2

  return (
    <motion.div
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {chars.map((char, index) => (
        <span
          key={index}
          className={`absolute left-1/2 top-1/2 text-[9px] font-bold uppercase tracking-[.05em] ${dark ? "text-white" : "text-[#0a0a0a]"}`}
          style={{ transformOrigin: "0 0", transform: `rotate(${step * index}deg) translateY(${-radius}px)` }}
        >
          {char}
        </span>
      ))}
      <div className="absolute inset-0 grid place-items-center">
        <GraduationCap className={`size-6 ${dark ? "text-white" : "text-[#0a0a0a]"}`} />
      </div>
    </motion.div>
  )
}
