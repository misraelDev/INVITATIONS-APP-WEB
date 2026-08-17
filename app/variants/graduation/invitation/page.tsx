import type { Metadata } from "next"
import { GraduationInvitation } from "@/components/variants/graduation-invitation"

export const metadata: Metadata = {
  title: "Graduación de Daniel Ortega | Invitación",
  description: "Acompáñanos a celebrar la graduación de Daniel Ortega, Generación 2026.",
}

export default function GraduationInvitationPage() {
  return <GraduationInvitation />
}
