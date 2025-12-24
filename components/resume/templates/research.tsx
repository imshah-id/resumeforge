"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { AcademicTemplate } from "./academic"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

// Detailed research template
export function ResearchTemplate(props: TemplateProps) {
  return <AcademicTemplate {...props} />
}
