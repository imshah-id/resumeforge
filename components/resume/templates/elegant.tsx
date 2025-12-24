"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { ProfessionalTemplate } from "./professional"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

// Elegant serif-based template
export function ElegantTemplate(props: TemplateProps) {
  return <ProfessionalTemplate {...props} />
}
