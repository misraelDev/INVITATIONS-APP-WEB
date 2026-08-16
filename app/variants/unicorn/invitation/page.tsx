import type { Metadata } from "next"
import { UnicornInvitation } from "@/components/variants/unicorn-invitation"

export const metadata: Metadata = {
  title: "Fiesta de Unicornio de Mía | Invitación",
  description: "Acompaña a Mía a celebrar 7 años de magia y color.",
}

export default function UnicornInvitationPage() {
  return <UnicornInvitation />
}
