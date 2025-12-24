"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { ModernTemplate } from "./modern"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

// Timeline-based chronological template
export function TimelineTemplate(props: TemplateProps) {
  return <ModernTemplate {...props} />
}
