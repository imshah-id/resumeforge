"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { cn } from "@/lib/utils"
import { ProfessionalTemplate } from "./professional"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

// Template with left accent bar
export function AccentLeftTemplate({ data, customization, className }: TemplateProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-2" style={{ backgroundColor: customization.accentColor }}></div>
      <div className="pl-6">
        <ProfessionalTemplate data={data} customization={customization} />
      </div>
    </div>
  )
}
