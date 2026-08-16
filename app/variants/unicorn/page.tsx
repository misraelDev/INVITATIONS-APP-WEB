import type { Metadata } from "next"
import { UnicornWelcome } from "@/components/variants/unicorn-welcome"

export const metadata: Metadata = {
  title: "Fiesta de Unicornio de Mía | Invitación",
  description: "Acompaña a Mía a celebrar 7 años de magia y color.",
}

export default function UnicornVariantPage() {
  return <UnicornWelcome />
}
