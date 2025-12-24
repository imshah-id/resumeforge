"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface SummaryFormProps {
  summary: string
  onChange: (summary: string) => void
}

export function SummaryForm({ summary, onChange }: SummaryFormProps) {
  const charCount = summary.length

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="summary">Professional Summary</Label>
        <span className="text-xs text-muted-foreground">
          {charCount}/500 characters {charCount > 500 && <span className="text-destructive">(too long)</span>}
        </span>
      </div>
      <Textarea
        id="summary"
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write a compelling 2-3 sentence summary highlighting your expertise and career goals..."
        rows={4}
        className="resize-none"
      />
      <p className="text-xs text-muted-foreground">
        Keep it concise and focused on your most relevant skills and achievements.
      </p>
    </div>
  )
}
