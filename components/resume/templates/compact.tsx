"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { ModernTemplate } from "./modern"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

// Compact two-column layout - inherits from Modern for now
export function CompactTemplate(props: TemplateProps) {
  return <ModernTemplate {...props} />
}
