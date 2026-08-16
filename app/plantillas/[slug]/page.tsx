import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/invita/site-header"
import { SiteFooter } from "@/components/invita/site-footer"
import { TemplateDetail } from "@/components/invita/template-detail"
import { getTemplate, templates } from "@/lib/invita"

export function generateStaticParams() { return templates.map(({ slug }) => ({ slug })) }

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const template = getTemplate((await params).slug)
  if (!template) notFound()
  return <main><SiteHeader/><section className="bg-[#f4f0e8] px-6 pb-24 pt-32"><div className="mx-auto max-w-7xl"><TemplateDetail template={template}/></div></section><SiteFooter/></main>
}
