"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { MinimalTemplate } from "./minimal"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

// Clean code-inspired minimalist template
export function TechMinimalistTemplate(props: TemplateProps) {
  return <MinimalTemplate {...props} />
}
