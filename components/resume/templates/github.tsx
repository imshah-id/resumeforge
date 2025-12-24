"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { DeveloperTemplate } from "./developer"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

// GitHub-inspired developer template
export function GitHubTemplate(props: TemplateProps) {
  return <DeveloperTemplate {...props} />
}
