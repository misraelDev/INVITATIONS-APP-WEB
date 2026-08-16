import type { Metadata } from "next"
import { WeddingInvitation } from "@/components/variants/wedding-invitation"

export const metadata: Metadata = {
  title: "Fernanda & Rodrigo | Invitación de Boda",
  description: "Acompáñanos a celebrar la boda de Fernanda y Rodrigo.",
}

export default function WeddingInvitationPage() {
  return <WeddingInvitation />
}
