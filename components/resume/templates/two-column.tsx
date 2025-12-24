"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { formatDateRange } from "@/lib/utils/date-formatter"
import { cn } from "@/lib/utils"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

export function TwoColumnTemplate({ data, customization, className }: TemplateProps) {
  const { personalInfo, summary, experience, education, projects, skills, achievements } = data
  const { fontSize, lineHeight, accentColor, bulletStyle } = customization

  const bulletSymbol =
    bulletStyle === "circle" ? "•" : bulletStyle === "square" ? "▪" : bulletStyle === "arrow" ? "▸" : "—"
  const visibleExp = experience.filter((e) => e.visible)
  const visibleEdu = education.filter((e) => e.visible)
  const visibleProj = projects.filter((p) => p.visible)
  const visibleSkills = skills.filter((s) => s.visible)
  const visibleAch = achievements.filter((a) => a.visible)

  return (
    <div
      className={cn("bg-white text-gray-900 w-full h-full overflow-auto flex", className)}
      style={{
        fontSize: `${fontSize}pt`,
        lineHeight,
      }}
    >
      {/* Left Sidebar */}
      <aside className="w-1/3 p-8" style={{ backgroundColor: `${accentColor}15` }}>
        <div className="mb-6">
          <h1 className="text-xl font-bold mb-2" style={{ color: accentColor }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div className="text-xs space-y-1">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
          </div>
        </div>

        {visibleSkills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold mb-2 uppercase" style={{ color: accentColor }}>
              Skills
            </h2>
            {visibleSkills.map((skill) => (
              <div key={skill.id} className="mb-3">
                <p className="text-xs font-semibold mb-1">{skill.category}</p>
                <p className="text-xs">{skill.skills.join(", ")}</p>
              </div>
            ))}
          </section>
        )}

        {visibleEdu.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold mb-2 uppercase" style={{ color: accentColor }}>
              Education
            </h2>
            {visibleEdu.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="text-xs font-semibold">{edu.degree}</h3>
                <p className="text-xs">{edu.institution}</p>
                <p className="text-xs text-gray-600">{formatDateRange(edu.startDate, edu.endDate, edu.current)}</p>
              </div>
            ))}
          </section>
        )}
      </aside>

      {/* Right Main Content */}
      <main className="flex-1 p-8">
        {summary && (
          <section className="mb-5">
            <h2 className="text-sm font-bold mb-2 uppercase" style={{ color: accentColor }}>
              Profile
            </h2>
            <p className="text-sm">{summary}</p>
          </section>
        )}

        {visibleExp.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-bold mb-3 uppercase" style={{ color: accentColor }}>
              Experience
            </h2>
            <div className="space-y-4">
              {visibleExp.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between mb-1">
                    <div>
                      <h3 className="font-semibold text-sm">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="space-y-1">
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
        )}

        {visibleProj.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-bold mb-3 uppercase" style={{ color: accentColor }}>
              Projects
            </h2>
            <div className="space-y-3">
              {visibleProj.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-semibold text-sm">{proj.name}</h3>
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
        )}
      </main>
    </div>
  )
}
