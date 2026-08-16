import { notFound } from "next/navigation"
import { InvitationEditor } from "@/components/invitation/invitation-editor"
import { getTemplate, templates } from "@/lib/invita"

export function generateStaticParams() { return templates.map(({ slug }) => ({ slug })) }

export default async function EditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const template = getTemplate((await params).slug)
  if (!template) notFound()
  return <InvitationEditor template={template}/>
}
