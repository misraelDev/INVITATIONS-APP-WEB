"use client"

import { useDeferredValue, useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { TemplateCard } from "./template-card"
import { templates } from "@/lib/invita"

export function TemplateCatalog() {
  const [event, setEvent] = useState("Todos")
  const [style, setStyle] = useState("Todos")
  const [price, setPrice] = useState("Todos")
  const [search, setSearch] = useState("")
  const query = useDeferredValue(search.toLowerCase())
  const events = ["Todos", ...new Set(templates.map((item) => item.event))]
  const styles = ["Todos", ...new Set(templates.map((item) => item.style))]
  const filtered = templates.filter((item) => (event === "Todos" || item.event === event) && (style === "Todos" || item.style === style) && (price === "Todos" || (price === "Hasta $500" ? item.price <= 500 : item.price > 500)) && `${item.name} ${item.event} ${item.style}`.toLowerCase().includes(query))

  return (
    <div>
      <div className="grid gap-3 rounded-[2rem] border border-black/10 bg-white/60 p-4 md:grid-cols-[1fr_auto_auto_auto]">
        <label className="flex items-center gap-3 rounded-full bg-white px-4"><Search className="size-4 text-muted-foreground"/><span className="sr-only">Buscar plantillas</span><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Buscar por nombre o evento" className="w-full bg-transparent py-3 text-sm outline-none"/></label>
        {[{label:"Evento",value:event,set:setEvent,items:events},{label:"Estilo",value:style,set:setStyle,items:styles},{label:"Precio",value:price,set:setPrice,items:["Todos","Hasta $500","Más de $500"]}].map((filter)=><label key={filter.label} className="relative"><span className="sr-only">{filter.label}</span><select value={filter.value} onChange={(e)=>filter.set(e.target.value)} className="h-full min-h-11 w-full appearance-none rounded-full border border-black/10 bg-white px-5 pr-10 text-sm outline-none focus:ring-2 focus:ring-primary md:w-auto"><option disabled>{filter.label}</option>{filter.items.map(item=><option key={item}>{item}</option>)}</select><SlidersHorizontal className="pointer-events-none absolute right-4 top-1/2 size-3.5 -translate-y-1/2"/></label>)}
      </div>
      <p className="my-8 text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "plantilla" : "plantillas"}</p>
      {filtered.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((template)=><TemplateCard key={template.slug} template={template}/>)}</div> : <div className="rounded-[2rem] border border-dashed border-black/20 py-24 text-center"><h2 className="font-serif text-3xl">No encontramos esa combinación</h2><p className="mt-3 text-sm text-muted-foreground">Prueba con otro evento, estilo o rango de precio.</p></div>}
    </div>
  )
}
