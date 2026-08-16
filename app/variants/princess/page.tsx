import type { Metadata } from "next"
import { PrincessWelcome } from "@/components/variants/princess-welcome"

export const metadata: Metadata = {
  title: "Fiesta de Princesa de Emilia | Invitación",
  description: "Una invitación real para celebrar los 5 años de Emilia.",
}

export default function PrincessVariantPage() {
  return <PrincessWelcome />
}
