"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { formatDateRange } from "@/lib/utils/date-formatter"
import { cn } from "@/lib/utils"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

export function ClassicTemplate({ data, customization, className }: TemplateProps) {
  const { personalInfo, summary, experience, education, projects, skills, achievements, sectionOrder } = data
  const { fontSize, lineHeight, sectionSpacing, bulletStyle } = customization

  const bulletSymbol =
    bulletStyle === "circle" ? "•" : bulletStyle === "square" ? "▪" : bulletStyle === "arrow" ? "▸" : "—"

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "summary":
        if (!summary) return null
        return (
          <section key={sectionId} className="mb-5">
            <h2 className="text-sm font-bold mb-2 text-center">OBJECTIVE</h2>
            <p className="text-sm leading-relaxed text-center">{summary}</p>
          </section>
        )

      case "experience":
        const visibleExp = experience.filter((e) => e.visible)
        if (visibleExp.length === 0) return null
        return (
          <section key={sectionId} className="mb-5">
            <h2 className="text-sm font-bold mb-3 text-center border-t border-b border-gray-800 py-1">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-4">
              {visibleExp.map((exp) => (
                <div key={exp.id}>
                  <div className="text-center mb-1">
                    <h3 className="font-bold text-sm">{exp.position}</h3>
                    <p className="text-sm italic">
                      {exp.company}, {exp.location}
                    </p>
                    <p className="text-xs">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="space-y-1 mt-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm pl-6 relative">
                          <span className="absolute left-2">{bulletSymbol}</span>
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
          <section key={sectionId} className="mb-5">
            <h2 className="text-sm font-bold mb-3 text-center border-t border-b border-gray-800 py-1">EDUCATION</h2>
            <div className="space-y-3">
              {visibleEdu.map((edu) => (
                <div key={edu.id} className="text-center">
                  <h3 className="font-bold text-sm">{edu.degree}</h3>
                  <p className="text-sm italic">
                    {edu.institution}, {edu.location}
                  </p>
                  <p className="text-xs">{formatDateRange(edu.startDate, edu.endDate, edu.current)}</p>
                  {edu.gpa && <p className="text-xs">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )

      case "projects":
        const visibleProj = projects.filter((p) => p.visible)
        if (visibleProj.length === 0) return null
        return (
          <section key={sectionId} className="mb-5">
            <h2 className="text-sm font-bold mb-3 text-center border-t border-b border-gray-800 py-1">PROJECTS</h2>
            <div className="space-y-3">
              {visibleProj.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-bold text-sm text-center">{proj.name}</h3>
                  <p className="text-sm text-center mb-1">{proj.description}</p>
                  {proj.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {proj.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm pl-6 relative">
                          <span className="absolute left-2">{bulletSymbol}</span>
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
          <section key={sectionId} className="mb-5">
            <h2 className="text-sm font-bold mb-3 text-center border-t border-b border-gray-800 py-1">SKILLS</h2>
            <div className="space-y-1">
              {visibleSkills.map((skill) => (
                <p key={skill.id} className="text-sm text-center">
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
          <section key={sectionId} className="mb-5">
            <h2 className="text-sm font-bold mb-3 text-center border-t border-b border-gray-800 py-1">
              ACHIEVEMENTS & AWARDS
            </h2>
            <ul className="space-y-1">
              {visibleAch.map((ach) => (
                <li key={ach.id} className="text-sm pl-6 relative">
                  <span className="absolute left-2">{bulletSymbol}</span>
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
      className={cn("bg-white text-gray-900 p-12 w-full h-full overflow-auto font-serif", className)}
      style={{
        fontSize: `${fontSize}pt`,
        lineHeight,
      }}
    >
      {/* Classic Centered Header */}
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2 uppercase tracking-wide">{personalInfo.fullName || "YOUR NAME"}</h1>
        <div className="text-sm space-y-0.5">
          <div>{personalInfo.location && <span>{personalInfo.location}</span>}</div>
          <div>
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.phone && personalInfo.email && <span> | </span>}
            {personalInfo.email && <span>{personalInfo.email}</span>}
          </div>
          {(personalInfo.website || personalInfo.linkedin) && (
            <div>
              {personalInfo.website && <span>{personalInfo.website}</span>}
              {personalInfo.website && personalInfo.linkedin && <span> | </span>}
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            </div>
          )}
        </div>
      </header>

      <div style={{ gap: `${sectionSpacing}px` }}>{sectionOrder.map((sectionId) => renderSection(sectionId))}</div>
    </div>
  )
}
