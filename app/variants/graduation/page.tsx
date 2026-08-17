import type { Metadata } from "next"
import { GraduationWelcome } from "@/components/variants/graduation-welcome"

export const metadata: Metadata = {
  title: "Graduación de Daniel Ortega | Invitación",
  description: "Acompáñanos a celebrar la graduación de Daniel Ortega, Generación 2026.",
}

export default function GraduationVariantPage() {
  return <GraduationWelcome />
}
