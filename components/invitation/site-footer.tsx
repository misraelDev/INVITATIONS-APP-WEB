import Link from "next/link"
import { BRAND_NAME } from "@/lib/invita"

export function SiteFooter() {
  return (
    <footer className="bg-[#211f1c] px-6 py-14 text-[#f4f0e8]">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/15 pb-12 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="font-serif text-4xl tracking-[0.12em]">{BRAND_NAME}</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">Invitaciones digitales que reúnen la historia, los detalles y a las personas que importan.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
          <Link href="/templates">Plantillas</Link>
          <Link href="/templates/jardin-eterno">Ver demostración</Link>
          <Link href="/#precios">Precios</Link>
          <Link href="/editor/jardin-eterno">Crear invitación</Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between">
        <span>© 2026 {BRAND_NAME}</span>
        <span>Hecho para celebraciones reales.</span>
      </div>
    </footer>
  )
}
