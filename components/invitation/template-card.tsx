import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { formatPrice, type InvitationTemplate } from "@/lib/invita"

export function TemplateCard({ template, priority = false }: { template: InvitationTemplate; priority?: boolean }) {
  return (
    <article className="group relative min-h-[520px] overflow-hidden rounded-[2rem] bg-[#ded8ce]">
      <Image src={template.image} alt={`Celebración de la plantilla ${template.name}`} fill sizes="(max-width: 768px) 88vw, 420px" priority={priority} className="object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
      {template.badge && <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black">{template.badge}</span>}
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/70">
          <span>{template.event}</span><span>·</span><span>{template.style}</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div><h3 className="font-serif text-3xl">{template.name}</h3><p className="mt-1 text-sm text-white/70">Desde {formatPrice(template.price)}</p></div>
          <Link href={`/templates/${template.slug}`} className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-black transition-transform group-hover:rotate-6" aria-label={`Ver plantilla ${template.name}`}>
            <ArrowUpRight className="size-5" />
          </Link>
        </div>
      </div>
      <div className="absolute right-5 top-20 rounded-full border border-white/40 px-2 py-5 text-[9px] uppercase tracking-[0.22em] text-white [writing-mode:vertical-rl]">{template.date}</div>
    </article>
  )
}
