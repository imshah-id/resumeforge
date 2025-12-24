"use client"

import { useState } from "react"
import { TEMPLATE_METADATA, TEMPLATE_CATEGORIES } from "@/lib/constants/templates"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TemplatePreviewCard } from "@/components/resume/template-preview-card"

interface TemplateSelectorProps {
  selectedTemplateId: string
  onChange: (templateId: string) => void
}

export function TemplateSelector({ selectedTemplateId, onChange }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredTemplates =
    selectedCategory === "all" ? TEMPLATE_METADATA : TEMPLATE_METADATA.filter((t) => t.category === selectedCategory)

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold mb-2">Choose Template</h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          Select from {TEMPLATE_METADATA.length} professionally designed templates. All previews show real sample data
          so you can see exactly how your resume will look.
        </p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="w-full flex-wrap h-auto justify-start">
          {TEMPLATE_CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id} className="text-xs md:text-sm">
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {filteredTemplates.map((template) => (
            <TemplatePreviewCard
              key={template.id}
              template={template}
              isSelected={selectedTemplateId === template.id}
              onSelect={() => onChange(template.id)}
              showPreview={true}
            />
          ))}
        </div>
      </Tabs>
    </div>
  )
}
