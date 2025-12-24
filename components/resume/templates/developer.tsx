"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { ModernTemplate } from "./modern"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

// Tech-focused template with project showcase
export function DeveloperTemplate(props: TemplateProps) {
  return <ModernTemplate {...props} />
}
