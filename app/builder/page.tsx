import { Suspense } from "react"
import { BuilderWrapper } from "@/components/builder/builder-wrapper"

export default function BuilderPage() {
  return (
    <Suspense fallback={null}>
      <BuilderWrapper />
    </Suspense>
  )
}
