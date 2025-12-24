"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Eye, ArrowRight } from "lucide-react"
import { ResumeRenderer } from "@/components/resume/resume-renderer"
import { SAMPLE_RESUME_DATA } from "@/lib/utils/sample-data"
import { DEFAULT_CUSTOMIZATION } from "@/lib/types/resume"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { TemplateMetadata } from "@/lib/constants/templates"

interface TemplatePreviewCardProps {
  template: TemplateMetadata
  isSelected?: boolean
  onSelect?: () => void
  showPreview?: boolean
}

export function TemplatePreviewCard({ template, isSelected, onSelect, showPreview = true }: TemplatePreviewCardProps) {
  const [showFullPreview, setShowFullPreview] = useState(false)

  const handleUseTemplate = () => {
    if (onSelect) {
      onSelect()
    } else {
      window.location.href = `/builder?template=${template.id}`
    }
  }

  return (
    <>
      <Card
        className={`group relative cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] overflow-hidden ${
          isSelected ? "ring-2 ring-primary shadow-xl" : ""
        }`}
      >
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1] pointer-events-none" />

        {isSelected && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-1.5 z-20 shadow-lg animate-scaleIn">
            <Check className="w-4 h-4" />
          </div>
        )}

        <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-50 to-gray-100 border-b rounded-t-lg overflow-hidden relative">
          {showPreview ? (
            <>
              <div className="absolute inset-0 flex items-start justify-center overflow-hidden p-2">
                <div
                  className="bg-white shadow-lg border border-gray-200 transition-all duration-300 group-hover:shadow-xl"
                  style={{
                    transform: "scale(0.19)",
                    transformOrigin: "top center",
                    width: "850px",
                    minHeight: "1100px",
                    marginTop: "0px",
                  }}
                >
                  <ResumeRenderer
                    data={SAMPLE_RESUME_DATA}
                    customization={{
                      ...DEFAULT_CUSTOMIZATION,
                      templateId: template.id,
                    }}
                  />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full shadow-lg hover:scale-105 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowFullPreview(true)
                  }}
                >
                  <Eye className="w-3 h-3 mr-2" />
                  Preview Full Template
                </Button>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <p className="text-sm text-muted-foreground">Template Preview</p>
            </div>
          )}
        </div>

        <div className="p-4 relative z-[2]">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-base group-hover:text-primary transition-colors">{template.name}</h4>
            <Badge variant="secondary" className="text-xs flex-shrink-0 ml-2">
              {template.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {template.features.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          <Button className="w-full hover:scale-105 transition-transform" size="sm" onClick={handleUseTemplate}>
            Use This Template
            <ArrowRight className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </Card>

      <Dialog open={showFullPreview} onOpenChange={setShowFullPreview}>
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden animate-scaleIn">
          <DialogHeader className="pb-4 border-b">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl mb-2">{template.name}</DialogTitle>
                <DialogDescription className="text-base">{template.description}</DialogDescription>
              </div>
              <Badge variant="secondary" className="flex-shrink-0">
                {template.category}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {template.features.map((feature) => (
                <Badge key={feature} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </DialogHeader>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 overflow-auto max-h-[calc(95vh-200px)] rounded-lg">
            <div className="max-w-[850px] mx-auto bg-white shadow-2xl rounded-sm">
              <ResumeRenderer
                data={SAMPLE_RESUME_DATA}
                customization={{
                  ...DEFAULT_CUSTOMIZATION,
                  templateId: template.id,
                }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t">
            <p className="text-sm text-muted-foreground">All templates are ATS-safe and fully customizable</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFullPreview(false)}
                className="hover:scale-105 transition-transform"
              >
                Close
              </Button>
              <Link href={`/builder?template=${template.id}`}>
                <Button className="hover:scale-105 transition-transform">
                  Use This Template
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
