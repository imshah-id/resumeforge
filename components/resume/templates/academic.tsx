"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { ClassicTemplate } from "./classic"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

// Academic/Research focused template
export function AcademicTemplate(props: TemplateProps) {
  return <ClassicTemplate {...props} />
}
