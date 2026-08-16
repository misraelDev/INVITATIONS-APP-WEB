import { notFound } from "next/navigation"
import { PublishedInvitation } from "@/components/invitation/published-invitation"
import { getTemplate, templates } from "@/lib/invita"

export function generateStaticParams() { return templates.map(({ slug }) => ({ slug })) }

export default async function InvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const template = getTemplate((await params).slug)
  if (!template) notFound()
  return <PublishedInvitation template={template}/>
}
