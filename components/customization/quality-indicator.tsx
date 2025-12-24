"use client"

import { useEffect, useState } from "react"
import type { ResumeData } from "@/lib/types/resume"
import { validateResume, estimatePageCount, type ValidationResult } from "@/lib/utils/resume-validation"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface QualityIndicatorProps {
  data: ResumeData
}

export function QualityIndicator({ data }: QualityIndicatorProps) {
  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
    const result = validateResume(data)
    setValidation(result)
    setPageCount(estimatePageCount(data))
  }, [data])

  if (!validation) return null

  const getScoreColor = () => {
    if (validation.score >= 80) return "text-green-600"
    if (validation.score >= 60) return "text-blue-600"
    if (validation.score >= 40) return "text-amber-600"
    return "text-red-600"
  }

  const getProgressColor = () => {
    if (validation.score >= 80) return "bg-green-600"
    if (validation.score >= 60) return "bg-blue-600"
    if (validation.score >= 40) return "bg-amber-600"
    return "bg-red-600"
  }

  return (
    <div className="p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Resume Quality</h3>
        <p className="text-sm text-muted-foreground">
          Track your resume completeness and get recommendations for improvement.
        </p>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Score</span>
          <span className={`text-2xl font-bold ${getScoreColor()}`}>{validation.score}/100</span>
        </div>
        <Progress value={validation.score} className="h-2 mb-2" />
        <p className="text-xs text-muted-foreground">
          Status: <span className="font-medium capitalize">{validation.level}</span>
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Estimated Pages</span>
          <span className={`text-lg font-semibold ${pageCount > 2 ? "text-amber-600" : "text-foreground"}`}>
            {pageCount} {pageCount === 1 ? "page" : "pages"}
          </span>
        </div>
        {pageCount > 2 && (
          <p className="text-xs text-amber-600 mt-2">Your resume may be too long. Consider condensing to 1-2 pages.</p>
        )}
      </Card>

      {validation.warnings.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Issues & Warnings</h4>
          {validation.warnings.map((warning, idx) => (
            <Alert key={idx} variant={warning.type === "error" ? "destructive" : "default"}>
              {warning.type === "error" && <AlertCircle className="h-4 w-4" />}
              {warning.type === "warning" && <AlertTriangle className="h-4 w-4" />}
              {warning.type === "info" && <Info className="h-4 w-4" />}
              <AlertDescription className="text-xs">{warning.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {validation.suggestions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Suggestions</h4>
          {validation.suggestions.map((suggestion, idx) => (
            <Alert key={idx}>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">{suggestion}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}
    </div>
  )
}
