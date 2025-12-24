"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import type { Skill } from "@/lib/types/resume"
import { Plus, Trash2, Eye, EyeOff, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SkillsFormProps {
  skills: Skill[]
  onChange: (skills: Skill[]) => void
}

export function SkillsForm({ skills, onChange }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState<{ [key: string]: string }>({})

  const addSkillCategory = () => {
    const newCat: Skill = {
      id: Date.now().toString(),
      category: "",
      skills: [],
      visible: true,
    }
    onChange([...skills, newCat])
  }

  const updateCategory = (id: string, category: string) => {
    onChange(skills.map((skill) => (skill.id === id ? { ...skill, category } : skill)))
  }

  const deleteCategory = (id: string) => {
    onChange(skills.filter((skill) => skill.id !== id))
  }

  const toggleVisibility = (id: string) => {
    onChange(skills.map((skill) => (skill.id === id ? { ...skill, visible: !skill.visible } : skill)))
  }

  const addSkill = (id: string) => {
    const skillText = newSkill[id]?.trim()
    if (!skillText) return

    onChange(skills.map((skill) => (skill.id === id ? { ...skill, skills: [...skill.skills, skillText] } : skill)))
    setNewSkill({ ...newSkill, [id]: "" })
  }

  const removeSkill = (id: string, skillToRemove: string) => {
    onChange(
      skills.map((skill) =>
        skill.id === id
          ? {
              ...skill,
              skills: skill.skills.filter((s) => s !== skillToRemove),
            }
          : skill,
      ),
    )
  }

  const totalSkills = skills.filter((s) => s.visible).reduce((sum, cat) => sum + cat.skills.length, 0)

  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <Card key={skill.id} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Input
              value={skill.category}
              onChange={(e) => updateCategory(skill.id, e.target.value)}
              placeholder="Category (e.g., Programming Languages)"
              className="flex-1 mr-4"
            />
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => toggleVisibility(skill.id)}>
                {skill.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteCategory(skill.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-sm">Skills</Label>
            <div className="flex gap-2 mt-2 mb-3">
              <Input
                value={newSkill[skill.id] || ""}
                onChange={(e) => setNewSkill({ ...newSkill, [skill.id]: e.target.value })}
                placeholder="Add a skill..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addSkill(skill.id)
                  }
                }}
              />
              <Button type="button" onClick={() => addSkill(skill.id)}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.skills.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                  <button onClick={() => removeSkill(skill.id, s)} className="ml-2 hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      ))}

      <Button onClick={addSkillCategory} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Skill Category
      </Button>

      {totalSkills > 30 && (
        <p className="text-xs text-amber-600 p-2 bg-amber-50 rounded">
          Warning: You have {totalSkills} skills listed. Consider focusing on 15-20 most relevant skills for better
          readability.
        </p>
      )}
    </div>
  )
}
