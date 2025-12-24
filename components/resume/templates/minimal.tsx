"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { formatDateRange } from "@/lib/utils/date-formatter"
import { cn } from "@/lib/utils"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

export function MinimalTemplate({ data, customization, className }: TemplateProps) {
  const { personalInfo, summary, experience, education, projects, skills, achievements, sectionOrder } = data
  const { fontSize, lineHeight, sectionSpacing, accentColor, bulletStyle } = customization

  const bulletSymbol =
    bulletStyle === "circle" ? "•" : bulletStyle === "square" ? "▪" : bulletStyle === "arrow" ? "▸" : "—"

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "summary":
        if (!summary) return null
        return (
          <section key={sectionId} className="mb-5">
            <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
          </section>
        )

      case "experience":
        const visibleExp = experience.filter((e) => e.visible)
        if (visibleExp.length === 0) return null
        return (
          <section key={sectionId} className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-900">Experience</h2>
            <div className="space-y-4">
              {visibleExp.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-sm">{exp.position}</h3>
                    <span className="text-xs text-gray-500">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </p>
                  {exp.highlights.length > 0 && (
                    <ul className="space-y-1.5">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-gray-700 pl-4 relative">
                          <span className="absolute left-0 text-gray-400">{bulletSymbol}</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )

      case "education":
        const visibleEdu = education.filter((e) => e.visible)
        if (visibleEdu.length === 0) return null
        return (
          <section key={sectionId} className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-900">Education</h2>
            <div className="space-y-3">
              {visibleEdu.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="font-semibold text-sm">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                      {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )

      case "projects":
        const visibleProj = projects.filter((p) => p.visible)
        if (visibleProj.length === 0) return null
        return (
          <section key={sectionId} className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-900">Projects</h2>
            <div className="space-y-3">
              {visibleProj.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-semibold text-sm">{proj.name}</h3>
                  <p className="text-sm text-gray-700 mb-1">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <p className="text-xs text-gray-500 mb-1.5">{proj.technologies.join(" • ")}</p>
                  )}
                  {proj.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {proj.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-gray-700 pl-4 relative">
                          <span className="absolute left-0 text-gray-400">{bulletSymbol}</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )

      case "skills":
        const visibleSkills = skills.filter((s) => s.visible)
        if (visibleSkills.length === 0) return null
        return (
          <section key={sectionId} className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-900">Skills</h2>
            <div className="space-y-1.5">
              {visibleSkills.map((skill) => (
                <p key={skill.id} className="text-sm text-gray-700">
                  <span className="font-medium">{skill.category}:</span> {skill.skills.join(", ")}
                </p>
              ))}
            </div>
          </section>
        )

      case "achievements":
        const visibleAch = achievements.filter((a) => a.visible)
        if (visibleAch.length === 0) return null
        return (
          <section key={sectionId} className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-900">Achievements</h2>
            <ul className="space-y-1.5">
              {visibleAch.map((ach) => (
                <li key={ach.id} className="text-sm text-gray-700 pl-4 relative">
                  <span className="absolute left-0 text-gray-400">{bulletSymbol}</span>
                  <span className="font-medium">{ach.title}</span> {ach.description}
                </li>
              ))}
            </ul>
          </section>
        )

      default:
        return null
    }
  }

  return (
    <div
      className={cn("bg-white text-gray-900 p-12 w-full h-full overflow-auto", className)}
      style={{
        fontSize: `${fontSize}pt`,
        lineHeight,
      }}
    >
      {/* Minimal Header */}
      <header className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">{personalInfo.fullName || "Your Name"}</h1>
        <div className="text-sm text-gray-600 space-y-0.5">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {(personalInfo.location || personalInfo.website) && (
            <div>
              {personalInfo.location}
              {personalInfo.location && personalInfo.website && " • "}
              {personalInfo.website}
            </div>
          )}
        </div>
      </header>

      <div style={{ gap: `${sectionSpacing}px` }}>{sectionOrder.map((sectionId) => renderSection(sectionId))}</div>
    </div>
  )
}
