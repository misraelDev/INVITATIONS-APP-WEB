"use client"

import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { TemplateCard } from "./template-card"
import type { InvitationTemplate } from "@/lib/invita"

export function TemplateRail({ templates }: { templates: InvitationTemplate[] }) {
  const railRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, x: 0, scroll: 0 })

  const move = (direction: number) => railRef.current?.scrollBy({ left: direction * 430, behavior: "smooth" })

  return (
    <div>
      <div className="mb-8 flex justify-end gap-2 px-6 lg:px-12">
        <button type="button" onClick={() => move(-1)} className="grid size-11 place-items-center rounded-full border border-black/15 hover:bg-black hover:text-white" aria-label="Plantillas anteriores"><ArrowLeft className="size-4" /></button>
        <button type="button" onClick={() => move(1)} className="grid size-11 place-items-center rounded-full border border-black/15 hover:bg-black hover:text-white" aria-label="Plantillas siguientes"><ArrowRight className="size-4" /></button>
      </div>
      <div
        ref={railRef}
        tabIndex={0}
        aria-label="Carrusel de plantillas"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") move(1)
          if (event.key === "ArrowLeft") move(-1)
        }}
        onPointerDown={(event) => {
          if (!railRef.current) return
          drag.current = { active: true, x: event.clientX, scroll: railRef.current.scrollLeft }
          railRef.current.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          if (drag.current.active && railRef.current) railRef.current.scrollLeft = drag.current.scroll - (event.clientX - drag.current.x)
        }}
        onPointerUp={() => { drag.current.active = false }}
        className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-5 active:cursor-grabbing lg:px-12"
      >
        {templates.map((template, index) => <div key={template.slug} className="w-[84vw] max-w-[410px] shrink-0 snap-start"><TemplateCard template={template} priority={index < 2} /></div>)}
      </div>
    </div>
  )
}
