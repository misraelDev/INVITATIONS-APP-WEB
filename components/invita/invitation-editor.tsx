"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, ExternalLink, ImageIcon, Music2, Save } from "lucide-react"
import { BRAND_NAME, type InvitationTemplate } from "@/lib/invita"

export type InvitationDraft = { hosts: string; date: string; location: string; color: string; music: boolean }

export function InvitationEditor({ template }: { template: InvitationTemplate }) {
  const [draft, setDraft] = useState<InvitationDraft>({ hosts: template.hosts, date: template.date, location: template.location, color: template.color, music: true })
  const [saved, setSaved] = useState(false)
  const storageKey = `invita-draft-${template.slug}`
  const update = <K extends keyof InvitationDraft>(key: K, value: InvitationDraft[K]) => { setSaved(false); setDraft((current)=>({...current,[key]:value})) }
  const save = () => { localStorage.setItem(storageKey, JSON.stringify(draft)); setSaved(true) }

  return (
    <main className="min-h-screen bg-[#ded8ce]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 bg-[#fffdf8] px-4 py-3 sm:px-6"><div className="flex items-center gap-4"><Link href={`/plantillas/${template.slug}`} className="rounded-full p-2 hover:bg-black/5" aria-label="Volver"><ArrowLeft className="size-5"/></Link><span className="font-serif text-xl tracking-[.14em]">{BRAND_NAME}</span><span className="hidden text-xs text-muted-foreground sm:inline">Editando · {template.name}</span></div><div className="flex gap-2"><button type="button" onClick={save} className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-xs"><Save className="size-4"/>{saved ? "Guardado" : "Guardar"}</button><Link href={`/invitacion/${template.slug}`} onClick={save} className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs text-background">Publicar <ExternalLink className="size-3.5"/></Link></div></header>
      <div className="grid min-h-[calc(100vh-65px)] lg:grid-cols-[380px_1fr]">
        <aside className="border-r border-black/10 bg-[#fffdf8] p-6"><p className="eyebrow">Contenido</p><div className="mt-8 space-y-5">{[{label:"Nombres o título",key:"hosts" as const},{label:"Fecha",key:"date" as const},{label:"Ubicación",key:"location" as const}].map((field)=><label key={field.key} className="block text-xs font-semibold">{field.label}<input value={draft[field.key] as string} onChange={(e)=>update(field.key,e.target.value)} className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-primary"/></label>)}<div><p className="text-xs font-semibold">Color principal</p><div className="mt-3 flex gap-2">{[template.color,"#786b52","#56645c","#37343f"].map(color=><button type="button" key={color} onClick={()=>update("color",color)} className="grid size-9 place-items-center rounded-full border" aria-label={`Color ${color}`}><span className="size-6 rounded-full" style={{backgroundColor:color}}>{draft.color === color && <Check className="m-1 size-4 text-white"/>}</span></button>)}</div></div><label className="flex items-center justify-between rounded-xl border border-black/10 p-4 text-sm"><span className="flex items-center gap-2"><Music2 className="size-4"/>Música ambiental</span><input type="checkbox" checked={draft.music} onChange={(e)=>update("music",e.target.checked)} className="size-4 accent-primary"/></label><button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 p-4 text-xs text-muted-foreground"><ImageIcon className="size-4"/>Cambiar fotografía</button></div></aside>
        <section className="grid place-items-center overflow-hidden p-6 md:p-12"><div className="relative h-[680px] w-full max-w-[390px] overflow-hidden rounded-[3rem] border-[10px] border-[#171615] bg-black shadow-2xl"><Image src={template.image} alt="Vista previa de la invitación" fill priority sizes="390px" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/15"/><div className="absolute inset-x-0 bottom-0 p-8 text-center text-white"><p className="text-[10px] uppercase tracking-[.3em]">{template.event}</p><h1 className="mt-3 font-serif text-5xl">{draft.hosts}</h1><p className="mt-5 text-xs tracking-[.18em]">{draft.date}</p><p className="mt-3 text-xs text-white/70">{draft.location}</p></div><span className="absolute right-4 top-20 rounded-full px-2 py-5 text-[9px] text-white [writing-mode:vertical-rl]" style={{backgroundColor:draft.color}}>GUARDA LA FECHA</span></div></section>
      </div>
    </main>
  )
}
