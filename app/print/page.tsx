"use client"

import { useEffect, useState } from "react"
import { ResumeRenderer } from "@/components/resume/resume-renderer"
import type { ResumeState } from "@/lib/types/resume"
import { loadResume } from "@/lib/utils/resume-storage"

export default function PrintPage() {
  const [state, setState] = useState<ResumeState | null>(null)

  useEffect(() => {
    const loaded = loadResume()
    if (loaded) {
      setState(loaded)

      // Auto-trigger print dialog
      setTimeout(() => {
        window.print()
      }, 500)
    }
  }, [])

  if (!state) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading resume...</p>
      </div>
    )
  }

  return (
    <div className="print:m-0">
      <ResumeRenderer data={state.data} customization={state.customization} />
    </div>
  )
}
