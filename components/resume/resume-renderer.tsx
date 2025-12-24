"use client"

import type React from "react"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { ProfessionalTemplate } from "./templates/professional"
import { MinimalTemplate } from "./templates/minimal"
import { ClassicTemplate } from "./templates/classic"
import { ModernTemplate } from "./templates/modern"
import { CompactTemplate } from "./templates/compact"
import { ElegantTemplate } from "./templates/elegant"
import { DeveloperTemplate } from "./templates/developer"
import { TechMinimalistTemplate } from "./templates/tech-minimalist"
import { GitHubTemplate } from "./templates/github"
import { AcademicTemplate } from "./templates/academic"
import { ResearchTemplate } from "./templates/research"
import { TwoColumnTemplate } from "./templates/two-column"
import { AccentLeftTemplate } from "./templates/accent-left"
import { TimelineTemplate } from "./templates/timeline"
import { BoldHeaderTemplate } from "./templates/bold-header"

interface ResumeRendererProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

export function ResumeRenderer({ data, customization, className }: ResumeRendererProps) {
  const templates: Record<string, React.ComponentType<ResumeRendererProps>> = {
    professional: ProfessionalTemplate,
    minimal: MinimalTemplate,
    classic: ClassicTemplate,
    modern: ModernTemplate,
    compact: CompactTemplate,
    elegant: ElegantTemplate,
    developer: DeveloperTemplate,
    "tech-minimalist": TechMinimalistTemplate,
    github: GitHubTemplate,
    academic: AcademicTemplate,
    research: ResearchTemplate,
    "two-column": TwoColumnTemplate,
    "accent-left": AccentLeftTemplate,
    timeline: TimelineTemplate,
    "bold-header": BoldHeaderTemplate,
  }

  const TemplateComponent = templates[customization.templateId] || ProfessionalTemplate

  return <TemplateComponent data={data} customization={customization} className={className} />
}
