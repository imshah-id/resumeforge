"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Download, FileText } from "lucide-react"
import { exportToPDF } from "@/lib/utils/pdf-export"
import type { ResumeData } from "@/lib/types/resume"

interface PDFExportDialogProps {
  data: ResumeData
}

export function PDFExportDialog({ data }: PDFExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filename, setFilename] = useState(() => {
    const name = data.personalInfo.fullName || "resume"
    return name.toLowerCase().replace(/\s+/g, "-")
  })
  const [pageSize, setPageSize] = useState<"letter" | "a4">("letter")

  const handleExport = async () => {
    try {
      document.body.classList.add(`print-${pageSize}`)

      const previewElement = document.querySelector('[data-resume-preview="true"]')
      const wasHidden = previewElement?.parentElement?.classList.contains("hidden")

      if (wasHidden && previewElement?.parentElement) {
        previewElement.parentElement.classList.remove("hidden")
      }

      await exportToPDF(`${filename}-${Date.now()}`)

      setTimeout(() => {
        setIsOpen(false)
        document.body.classList.remove(`print-${pageSize}`)
        if (wasHidden && previewElement?.parentElement) {
          previewElement.parentElement.classList.add("hidden")
        }
      }, 500)
    } catch (error) {
      console.error("[v0] PDF export failed:", error)
      alert("Failed to export PDF. Please make sure the preview is loaded and try again.")
      document.body.classList.remove(`print-${pageSize}`)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Resume as PDF</DialogTitle>
          <DialogDescription>
            Your resume will be exported exactly as you see it in the preview. The PDF will be ATS-safe and optimized
            for readability.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="filename">Filename (suggested)</Label>
            <Input
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="my-resume"
            />
            <p className="text-xs text-muted-foreground mt-1">This will be suggested when you save the PDF</p>
          </div>

          <div>
            <Label className="mb-2 block">Page Size</Label>
            <RadioGroup value={pageSize} onValueChange={(value: any) => setPageSize(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="letter" id="letter" />
                <Label htmlFor="letter" className="font-normal cursor-pointer">
                  US Letter (8.5" × 11")
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="a4" id="a4" />
                <Label htmlFor="a4" className="font-normal cursor-pointer">
                  A4 (210mm × 297mm)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 rounded-md space-y-2">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-400" />
              <div className="text-xs text-blue-900 dark:text-blue-100">
                <p className="font-semibold mb-2">How to save your resume:</p>
                <ol className="list-decimal list-inside space-y-1.5 ml-1">
                  <li>Click "Export PDF" below</li>
                  <li>In the print dialog, select "Save as PDF" as the destination</li>
                  <li>Remove headers/footers in "More settings"</li>
                  <li>Set margins to "None" or "Minimum"</li>
                  <li>Click "Save" and choose where to save your file</li>
                </ol>
                <p className="mt-2 font-medium">Your resume will be saved with no watermarks or ads!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
