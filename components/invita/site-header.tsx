"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { BRAND_NAME } from "@/lib/invita"

const links = [
  ["Plantillas", "/plantillas"],
  ["Cómo funciona", "/#como-funciona"],
  ["Características", "/#caracteristicas"],
  ["Opiniones", "/#opiniones"],
  ["Precios", "/#precios"],
]

export function SiteHeader({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav className={`mx-auto max-w-7xl rounded-2xl border px-4 shadow-[0_18px_60px_rgba(24,20,15,.12)] backdrop-blur-xl sm:px-6 ${light ? "border-white/25 bg-black/15 text-white" : "border-black/8 bg-[rgba(255,253,248,.82)] text-foreground"}`}>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="font-serif text-2xl tracking-[0.16em]" aria-label={`${BRAND_NAME}, inicio`}>
            {BRAND_NAME}
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="text-xs font-medium tracking-wide opacity-75 transition-opacity hover:opacity-100 focus-visible:opacity-100">
                {label}
              </Link>
            ))}
          </div>
          <Link href="/editor/jardin-eterno" className={`hidden rounded-full px-5 py-2.5 text-xs font-semibold transition-transform hover:-translate-y-0.5 sm:inline-flex ${light ? "bg-white text-black" : "bg-foreground text-background"}`}>
            Crear invitación
          </Link>
          <button type="button" onClick={() => setOpen(!open)} className="rounded-full p-2 lg:hidden" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-current/10 py-4 lg:hidden">
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-sm hover:bg-current/5">
                {label}
              </Link>
            ))}
            <Link href="/editor/jardin-eterno" className="mt-3 flex justify-center rounded-full bg-foreground px-5 py-3 text-sm text-background">
              Crear invitación
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
