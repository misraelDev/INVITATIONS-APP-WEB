import type { Metadata } from "next"
import { RacingWelcome } from "@/components/variants/racing-welcome"

export const metadata: Metadata = {
  title: "Gran Premio de Noah | Pase de piloto",
  description: "Acompáñanos a celebrar el cumpleaños número 6 de Noah.",
}

export default function RacingVariantPage() {
  return <RacingWelcome />
}
