"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import type { Achievement } from "@/lib/types/resume"
import { Plus, Trash2, Eye, EyeOff } from "lucide-react"

interface AchievementsFormProps {
  achievements: Achievement[]
  onChange: (achievements: Achievement[]) => void
}

export function AchievementsForm({ achievements, onChange }: AchievementsFormProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const addAchievement = () => {
    const newAch: Achievement = {
      id: Date.now().toString(),
      title: "",
      description: "",
      visible: true,
    }
    onChange([...achievements, newAch])
    setExpandedId(newAch.id)
  }

  const updateAchievement = (id: string, field: keyof Achievement, value: any) => {
    onChange(achievements.map((ach) => (ach.id === id ? { ...ach, [field]: value } : ach)))
  }

  const deleteAchievement = (id: string) => {
    onChange(achievements.filter((ach) => ach.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  const toggleVisibility = (id: string) => {
    onChange(achievements.map((ach) => (ach.id === id ? { ...ach, visible: !ach.visible } : ach)))
  }

  return (
    <div className="space-y-4">
      {achievements.map((ach) => (
        <Card key={ach.id} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setExpandedId(expandedId === ach.id ? null : ach.id)}
              className="text-sm font-medium text-left flex-1 hover:text-primary"
            >
              {ach.title || "New Achievement"}
            </button>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => toggleVisibility(ach.id)}>
                {ach.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteAchievement(ach.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>

          {expandedId === ach.id && (
            <div className="space-y-4 mt-4 border-t pt-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={ach.title}
                  onChange={(e) => updateAchievement(ach.id, "title", e.target.value)}
                  placeholder="Dean's List, Employee of the Year, etc."
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={ach.description}
                  onChange={(e) => updateAchievement(ach.id, "description", e.target.value)}
                  placeholder="Brief description of the achievement..."
                  rows={2}
                />
              </div>

              <div>
                <Label>Date (optional)</Label>
                <Input
                  value={ach.date || ""}
                  onChange={(e) => updateAchievement(ach.id, "date", e.target.value)}
                  placeholder="2024"
                />
              </div>
            </div>
          )}
        </Card>
      ))}

      <Button onClick={addAchievement} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Achievement
      </Button>
    </div>
  )
}
