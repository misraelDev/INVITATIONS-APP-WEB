import type { Metadata } from "next"
import { XvInvitation } from "@/components/variants/xv-invitation"

export const metadata: Metadata = {
  title: "Mis XV años · Valentina | Invitación",
  description: "Acompaña a Valentina a celebrar sus XV años.",
}

export default function XvVariantPage() {
  return <XvInvitation />
}
