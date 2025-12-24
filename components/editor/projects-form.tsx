"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import type { Project } from "@/lib/types/resume"
import { Plus, Trash2, Eye, EyeOff, GripVertical, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProjectsFormProps {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

export function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [newTech, setNewTech] = useState<{ [key: string]: string }>({})

  const addProject = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      highlights: [""],
      visible: true,
    }
    onChange([...projects, newProj])
    setExpandedId(newProj.id)
  }

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)))
  }

  const deleteProject = (id: string) => {
    onChange(projects.filter((proj) => proj.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  const toggleVisibility = (id: string) => {
    onChange(projects.map((proj) => (proj.id === id ? { ...proj, visible: !proj.visible } : proj)))
  }

  const addTechnology = (id: string) => {
    const tech = newTech[id]?.trim()
    if (!tech) return

    onChange(projects.map((proj) => (proj.id === id ? { ...proj, technologies: [...proj.technologies, tech] } : proj)))
    setNewTech({ ...newTech, [id]: "" })
  }

  const removeTechnology = (id: string, tech: string) => {
    onChange(
      projects.map((proj) =>
        proj.id === id
          ? {
              ...proj,
              technologies: proj.technologies.filter((t) => t !== tech),
            }
          : proj,
      ),
    )
  }

  const addHighlight = (id: string) => {
    onChange(projects.map((proj) => (proj.id === id ? { ...proj, highlights: [...proj.highlights, ""] } : proj)))
  }

  const updateHighlight = (id: string, index: number, value: string) => {
    onChange(
      projects.map((proj) =>
        proj.id === id
          ? {
              ...proj,
              highlights: proj.highlights.map((h, i) => (i === index ? value : h)),
            }
          : proj,
      ),
    )
  }

  const deleteHighlight = (id: string, index: number) => {
    onChange(
      projects.map((proj) =>
        proj.id === id
          ? {
              ...proj,
              highlights: proj.highlights.filter((_, i) => i !== index),
            }
          : proj,
      ),
    )
  }

  return (
    <div className="space-y-4">
      {projects.map((proj) => (
        <Card key={proj.id} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 flex-1">
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
              <button
                onClick={() => setExpandedId(expandedId === proj.id ? null : proj.id)}
                className="text-sm font-medium text-left flex-1 hover:text-primary"
              >
                {proj.name || "New Project"}
              </button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => toggleVisibility(proj.id)}>
                {proj.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteProject(proj.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>

          {expandedId === proj.id && (
            <div className="space-y-4 mt-4 border-t pt-4">
              <div>
                <Label>Project Name *</Label>
                <Input
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                  placeholder="E-Commerce Platform"
                />
              </div>

              <div>
                <Label>Description *</Label>
                <Textarea
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                  placeholder="Built a full-stack e-commerce platform with payment integration..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Project Link (optional)</Label>
                  <Input
                    value={proj.link || ""}
                    onChange={(e) => updateProject(proj.id, "link", e.target.value)}
                    placeholder="https://project-demo.com"
                  />
                </div>
                <div>
                  <Label>GitHub Link (optional)</Label>
                  <Input
                    value={proj.github || ""}
                    onChange={(e) => updateProject(proj.id, "github", e.target.value)}
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              <div>
                <Label>Technologies</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTech[proj.id] || ""}
                    onChange={(e) => setNewTech({ ...newTech, [proj.id]: e.target.value })}
                    placeholder="React, Node.js, MongoDB..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTechnology(proj.id)
                      }
                    }}
                  />
                  <Button type="button" onClick={() => addTechnology(proj.id)}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {proj.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                      <button onClick={() => removeTechnology(proj.id, tech)} className="ml-2 hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Key Highlights (optional)</Label>
                <div className="space-y-2 mt-2">
                  {proj.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2">
                      <Textarea
                        value={highlight}
                        onChange={(e) => updateHighlight(proj.id, index, e.target.value)}
                        placeholder="Achieved 10,000+ active users within first month"
                        rows={2}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteHighlight(proj.id, index)}
                        disabled={proj.highlights.length === 1}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => addHighlight(proj.id)} className="mt-2">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Highlight
                </Button>
              </div>
            </div>
          )}
        </Card>
      ))}

      <Button onClick={addProject} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  )
}
