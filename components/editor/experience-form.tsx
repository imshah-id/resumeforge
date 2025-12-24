"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import type { Experience } from "@/lib/types/resume"
import { Plus, Trash2, Eye, EyeOff, GripVertical } from "lucide-react"

interface ExperienceFormProps {
  experiences: Experience[]
  onChange: (experiences: Experience[]) => void
}

export function ExperienceForm({ experiences, onChange }: ExperienceFormProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      highlights: [""],
      visible: true,
    }
    onChange([...experiences, newExp])
    setExpandedId(newExp.id)
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const deleteExperience = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  const toggleVisibility = (id: string) => {
    onChange(experiences.map((exp) => (exp.id === id ? { ...exp, visible: !exp.visible } : exp)))
  }

  const addHighlight = (id: string) => {
    onChange(experiences.map((exp) => (exp.id === id ? { ...exp, highlights: [...exp.highlights, ""] } : exp)))
  }

  const updateHighlight = (id: string, index: number, value: string) => {
    onChange(
      experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              highlights: exp.highlights.map((h, i) => (i === index ? value : h)),
            }
          : exp,
      ),
    )
  }

  const deleteHighlight = (id: string, index: number) => {
    onChange(
      experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              highlights: exp.highlights.filter((_, i) => i !== index),
            }
          : exp,
      ),
    )
  }

  return (
    <div className="space-y-4">
      {experiences.map((exp) => (
        <Card key={exp.id} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 flex-1">
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
              <button
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                className="text-sm font-medium text-left flex-1 hover:text-primary"
              >
                {exp.position || "New Experience"} {exp.company && `at ${exp.company}`}
              </button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => toggleVisibility(exp.id)}>
                {exp.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteExperience(exp.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>

          {expandedId === exp.id && (
            <div className="space-y-4 mt-4 border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Position *</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <Label>Company *</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    placeholder="Tech Corp"
                  />
                </div>
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    disabled={exp.current}
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <Checkbox
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onCheckedChange={(checked) => updateExperience(exp.id, "current", checked)}
                    />
                    <Label htmlFor={`current-${exp.id}`} className="text-sm font-normal">
                      Currently working here
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <Label>Description (optional)</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  placeholder="Brief overview of your role..."
                  rows={2}
                />
              </div>

              <div>
                <Label>Key Highlights & Achievements</Label>
                <div className="space-y-2 mt-2">
                  {exp.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2">
                      <Textarea
                        value={highlight}
                        onChange={(e) => updateHighlight(exp.id, index, e.target.value)}
                        placeholder="Increased team productivity by 40% through implementing agile practices"
                        rows={2}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteHighlight(exp.id, index)}
                        disabled={exp.highlights.length === 1}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => addHighlight(exp.id)} className="mt-2">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Highlight
                </Button>
                {exp.highlights.length > 8 && (
                  <p className="text-xs text-amber-600 mt-2">
                    Warning: {exp.highlights.length} bullet points may be too many. Consider keeping 3-5 key highlights.
                  </p>
                )}
              </div>
            </div>
          )}
        </Card>
      ))}

      <Button onClick={addExperience} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  )
}
