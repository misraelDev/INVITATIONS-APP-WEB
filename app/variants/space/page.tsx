import type { Metadata } from "next"
import { SpaceInvitation } from "@/components/variants/space-invitation"

export const metadata: Metadata = {
  title: "Misión Espacial de Lía | Invitación",
  description: "Acompáñanos a celebrar el cumpleaños número 8 de Lía.",
}

export default function SpaceVariantPage() {
  return <SpaceInvitation />
}
