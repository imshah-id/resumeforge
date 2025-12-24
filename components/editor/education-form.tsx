"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import type { Education } from "@/lib/types/resume"
import { Plus, Trash2, Eye, EyeOff, GripVertical } from "lucide-react"

interface EducationFormProps {
  education: Education[]
  onChange: (education: Education[]) => void
}

export function EducationForm({ education, onChange }: EducationFormProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      visible: true,
    }
    onChange([...education, newEdu])
    setExpandedId(newEdu.id)
  }

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const deleteEducation = (id: string) => {
    onChange(education.filter((edu) => edu.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  const toggleVisibility = (id: string) => {
    onChange(education.map((edu) => (edu.id === id ? { ...edu, visible: !edu.visible } : edu)))
  }

  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <Card key={edu.id} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 flex-1">
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
              <button
                onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                className="text-sm font-medium text-left flex-1 hover:text-primary"
              >
                {edu.degree || "New Education"} {edu.institution && `from ${edu.institution}`}
              </button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => toggleVisibility(edu.id)}>
                {edu.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteEducation(edu.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>

          {expandedId === edu.id && (
            <div className="space-y-4 mt-4 border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Degree *</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div>
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>
              </div>

              <div>
                <Label>Institution *</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                  placeholder="University of California"
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                  placeholder="Berkeley, CA"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                    disabled={edu.current}
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <Checkbox
                      id={`current-edu-${edu.id}`}
                      checked={edu.current}
                      onCheckedChange={(checked) => updateEducation(edu.id, "current", checked)}
                    />
                    <Label htmlFor={`current-edu-${edu.id}`} className="text-sm font-normal">
                      Currently enrolled
                    </Label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>GPA (optional)</Label>
                  <Input
                    value={edu.gpa || ""}
                    onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                    placeholder="3.8/4.0"
                  />
                </div>
                <div>
                  <Label>Honors (optional)</Label>
                  <Input
                    value={edu.honors || ""}
                    onChange={(e) => updateEducation(edu.id, "honors", e.target.value)}
                    placeholder="Summa Cum Laude"
                  />
                </div>
              </div>
            </div>
          )}
        </Card>
      ))}

      <Button onClick={addEducation} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  )
}
