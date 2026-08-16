import type { Metadata } from "next"
import { PrincessInvitation } from "@/components/variants/princess-invitation"

export const metadata: Metadata = {
  title: "Fiesta de Princesa de Emilia | Invitación",
  description: "Una invitación real para celebrar los 5 años de Emilia.",
}

export default function PrincessInvitationPage() {
  return <PrincessInvitation />
}
