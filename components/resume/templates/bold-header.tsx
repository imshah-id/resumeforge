"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { formatDateRange } from "@/lib/utils/date-formatter"
import { cn } from "@/lib/utils"
import { Mail, Phone, MapPin } from "lucide-react"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

export function BoldHeaderTemplate({ data, customization, className }: TemplateProps) {
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
            <p className="text-sm leading-relaxed">{summary}</p>
          </section>
        )

      case "experience":
        const visibleExp = experience.filter((e) => e.visible)
        if (visibleExp.length === 0) return null
        return (
          <section key={sectionId} className="mb-6">
            <h2 className="text-base font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
              Experience
            </h2>
            <div className="space-y-4">
              {visibleExp.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-sm">{exp.position}</h3>
                      <p className="text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-600">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="space-y-1 mt-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm pl-4 relative">
                          <span className="absolute left-0" style={{ color: accentColor }}>
                            {bulletSymbol}
                          </span>
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
            <h2 className="text-base font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
              Education
            </h2>
            <div className="space-y-3">
              {visibleEdu.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-sm">{edu.degree}</h3>
                      <p className="text-sm">{edu.institution}</p>
                    </div>
                    <span className="text-xs text-gray-600">
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
            <h2 className="text-base font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
              Projects
            </h2>
            <div className="space-y-3">
              {visibleProj.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-bold text-sm">{proj.name}</h3>
                  <p className="text-sm mb-1">{proj.description}</p>
                  {proj.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {proj.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm pl-4 relative">
                          <span className="absolute left-0" style={{ color: accentColor }}>
                            {bulletSymbol}
                          </span>
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
            <h2 className="text-base font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
              Skills
            </h2>
            <div className="space-y-2">
              {visibleSkills.map((skill) => (
                <p key={skill.id} className="text-sm">
                  <span className="font-semibold">{skill.category}:</span> {skill.skills.join(", ")}
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
            <h2 className="text-base font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
              Achievements
            </h2>
            <ul className="space-y-1.5">
              {visibleAch.map((ach) => (
                <li key={ach.id} className="text-sm pl-4 relative">
                  <span className="absolute left-0" style={{ color: accentColor }}>
                    {bulletSymbol}
                  </span>
                  <span className="font-semibold">{ach.title}</span> {ach.description}
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
      className={cn("bg-white text-gray-900 w-full h-full overflow-auto", className)}
      style={{
        fontSize: `${fontSize}pt`,
        lineHeight,
      }}
    >
      {/* Bold Header Section */}
      <header className="p-8" style={{ backgroundColor: accentColor }}>
        <h1 className="text-4xl font-bold mb-3 text-white">{personalInfo.fullName || "YOUR NAME"}</h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
          {personalInfo.email && (
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {personalInfo.location}
            </span>
          )}
        </div>
      </header>

      <div className="p-8" style={{ gap: `${sectionSpacing}px` }}>
        {sectionOrder.map((sectionId) => renderSection(sectionId))}
      </div>
    </div>
  )
}
