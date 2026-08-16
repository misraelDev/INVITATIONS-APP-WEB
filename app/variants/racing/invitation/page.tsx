import type { Metadata } from "next"
import { RacingInvitation } from "@/components/variants/racing-invitation"

export const metadata: Metadata = {
  title: "Gran Premio de Noah | Invitación",
  description: "Acompáñanos a celebrar el cumpleaños número 6 de Noah.",
}

export default function RacingInvitationPage() {
  return <RacingInvitation />
}
