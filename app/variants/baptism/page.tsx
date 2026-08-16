import type { Metadata } from "next"
import { BaptismInvitation } from "@/components/variants/baptism-invitation"

export const metadata: Metadata = {
  title: "Bautizo de Sofía | Invitación",
  description: "Acompáñanos a celebrar el bautizo de Sofía.",
}

export default function BaptismVariantPage() {
  return <BaptismInvitation />
}
