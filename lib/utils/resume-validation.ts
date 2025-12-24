// Resume quality and ATS validation utilities

import type { ResumeData } from "@/lib/types/resume"

export interface ValidationResult {
  score: number // 0-100
  level: "poor" | "fair" | "good" | "excellent"
  warnings: ValidationWarning[]
  suggestions: string[]
}

export interface ValidationWarning {
  type: "error" | "warning" | "info"
  message: string
  section?: string
}

export function validateResume(data: ResumeData): ValidationResult {
  const warnings: ValidationWarning[] = []
  const suggestions: string[] = []
  let score = 100

  // Personal Info Validation
  if (!data.personalInfo.fullName) {
    warnings.push({ type: "error", message: "Full name is required", section: "personal" })
    score -= 20
  }
  if (!data.personalInfo.email) {
    warnings.push({ type: "error", message: "Email is required", section: "personal" })
    score -= 15
  }
  if (!data.personalInfo.phone) {
    warnings.push({ type: "warning", message: "Phone number recommended", section: "personal" })
    score -= 5
  }

  // Summary
  if (!data.summary || data.summary.length < 50) {
    suggestions.push("Add a professional summary (2-3 sentences recommended)")
    score -= 10
  } else if (data.summary.length > 500) {
    warnings.push({ type: "warning", message: "Summary is too long (keep under 500 characters)", section: "summary" })
    score -= 5
  }

  // Experience
  const visibleExperience = data.experience.filter((e) => e.visible)
  if (visibleExperience.length === 0) {
    warnings.push({ type: "warning", message: "No work experience added", section: "experience" })
    score -= 15
  } else {
    visibleExperience.forEach((exp, idx) => {
      if (exp.highlights.length > 8) {
        warnings.push({
          type: "warning",
          message: `Experience "${exp.position}" has too many bullet points (${exp.highlights.length}). Consider 3-5 key highlights.`,
          section: "experience",
        })
        score -= 3
      }
      if (exp.highlights.some((h) => h.length > 200)) {
        warnings.push({
          type: "info",
          message: `Experience "${exp.position}" has very long bullet points. Keep them concise.`,
          section: "experience",
        })
      }
    })
  }

  // Education
  const visibleEducation = data.education.filter((e) => e.visible)
  if (visibleEducation.length === 0) {
    warnings.push({ type: "warning", message: "No education added", section: "education" })
    score -= 10
  }

  // Skills
  const visibleSkills = data.skills.filter((s) => s.visible)
  const totalSkills = visibleSkills.reduce((sum, cat) => sum + cat.skills.length, 0)

  if (totalSkills === 0) {
    warnings.push({ type: "warning", message: "No skills added", section: "skills" })
    score -= 10
  } else if (totalSkills > 30) {
    warnings.push({
      type: "warning",
      message: `Too many skills listed (${totalSkills}). Focus on 15-20 most relevant skills.`,
      section: "skills",
    })
    score -= 5
  }

  // Overall content check
  const hasContent =
    visibleExperience.length > 0 || visibleEducation.length > 0 || data.projects.filter((p) => p.visible).length > 0
  if (!hasContent) {
    warnings.push({ type: "error", message: "Resume needs at least one section with content" })
    score -= 30
  }

  // Generate suggestions
  if (visibleExperience.length > 0 && data.projects.filter((p) => p.visible).length === 0) {
    suggestions.push("Consider adding projects to showcase your work")
  }
  if (totalSkills < 5) {
    suggestions.push("Add more skills relevant to your target role")
  }

  // Calculate level
  const level = score >= 80 ? "excellent" : score >= 60 ? "good" : score >= 40 ? "fair" : "poor"

  return {
    score: Math.max(0, Math.min(100, score)),
    level,
    warnings,
    suggestions,
  }
}

export function estimatePageCount(data: ResumeData): number {
  // Rough estimation based on content
  const lines = {
    header: 5,
    summary: data.summary ? Math.ceil(data.summary.length / 100) : 0,
    experience: data.experience.filter((e) => e.visible).reduce((sum, exp) => sum + 3 + exp.highlights.length, 0),
    education: data.education.filter((e) => e.visible).length * 3,
    projects: data.projects.filter((p) => p.visible).reduce((sum, proj) => sum + 2 + proj.highlights.length, 0),
    skills: Math.ceil(data.skills.filter((s) => s.visible).length / 2),
    achievements: data.achievements.filter((a) => a.visible).length * 2,
  }

  const totalLines = Object.values(lines).reduce((sum, l) => sum + l, 0)
  return Math.ceil(totalLines / 55) // Approximate lines per page
}
