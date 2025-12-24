"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { formatDateRange } from "@/lib/utils/date-formatter"
import { cn } from "@/lib/utils"
import { Mail, Phone, MapPin, Linkedin } from "lucide-react"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

export function ModernTemplate({ data, customization, className }: TemplateProps) {
  const { personalInfo, summary, experience, education, projects, skills, achievements, sectionOrder } = data
  const { fontSize, lineHeight, sectionSpacing, accentColor, bulletStyle } = customization

  const bulletSymbol =
    bulletStyle === "circle" ? "•" : bulletStyle === "square" ? "▪" : bulletStyle === "arrow" ? "▸" : "—"

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "summary":
        if (!summary) return null
        return (
          <section key={sectionId} className="mb-6">
            <div className="p-4 rounded-lg" style={{ backgroundColor: `${accentColor}10` }}>
              <p className="text-sm leading-relaxed">{summary}</p>
            </div>
          </section>
        )

      case "experience":
        const visibleExp = experience.filter((e) => e.visible)
        if (visibleExp.length === 0) return null
        return (
          <section key={sectionId} className="mb-6">
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded" style={{ backgroundColor: accentColor }}></span>
              Experience
            </h2>
            <div className="space-y-4 pl-3">
              {visibleExp.map((exp) => (
                <div key={exp.id} className="relative">
                  <div
                    className="absolute -left-3 top-2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-sm">{exp.position}</h3>
                      <p className="text-sm font-medium" style={{ color: accentColor }}>
                        {exp.company}
                      </p>
                      {exp.location && <p className="text-xs text-gray-600">{exp.location}</p>}
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="space-y-1.5 mt-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm flex gap-2 text-gray-700">
                          <span className="flex-shrink-0 mt-1.5" style={{ color: accentColor }}>
                            {bulletSymbol}
                          </span>
                          <span className="flex-1">{highlight}</span>
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
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded" style={{ backgroundColor: accentColor }}></span>
              Education
            </h2>
            <div className="space-y-3 pl-3">
              {visibleEdu.map((edu) => (
                <div key={edu.id} className="relative">
                  <div
                    className="absolute -left-3 top-2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm">{edu.degree}</h3>
                      <p className="text-sm font-medium" style={{ color: accentColor }}>
                        {edu.institution}
                      </p>
                      {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
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
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded" style={{ backgroundColor: accentColor }}></span>
              Projects
            </h2>
            <div className="space-y-3 pl-3">
              {visibleProj.map((proj) => (
                <div key={proj.id} className="relative">
                  <div
                    className="absolute -left-3 top-2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  <h3 className="font-semibold text-sm">{proj.name}</h3>
                  <p className="text-sm text-gray-700 mb-1">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {proj.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {proj.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {proj.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm flex gap-2 text-gray-700">
                          <span className="flex-shrink-0 mt-1.5" style={{ color: accentColor }}>
                            {bulletSymbol}
                          </span>
                          <span className="flex-1">{highlight}</span>
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
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded" style={{ backgroundColor: accentColor }}></span>
              Skills
            </h2>
            <div className="space-y-2 pl-3">
              {visibleSkills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">{skill.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.skills.map((s, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )

      case "achievements":
        const visibleAch = achievements.filter((a) => a.visible)
        if (visibleAch.length === 0) return null
        return (
          <section key={sectionId} className="mb-6">
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded" style={{ backgroundColor: accentColor }}></span>
              Achievements
            </h2>
            <ul className="space-y-2 pl-3">
              {visibleAch.map((ach) => (
                <li key={ach.id} className="text-sm flex gap-2 relative">
                  <div
                    className="absolute -left-3 top-2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  <span className="flex-1">
                    <span className="font-medium">{ach.title}</span> {ach.description}
                  </span>
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
      className={cn("bg-white text-gray-900 p-10 w-full h-full overflow-auto", className)}
      style={{
        fontSize: `${fontSize}pt`,
        lineHeight,
      }}
    >
      {/* Modern Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" style={{ color: accentColor }} />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" style={{ color: accentColor }} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" style={{ color: accentColor }} />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5" style={{ color: accentColor }} />
              {personalInfo.linkedin}
            </span>
          )}
        </div>
      </header>

      <div style={{ gap: `${sectionSpacing}px` }}>{sectionOrder.map((sectionId) => renderSection(sectionId))}</div>
    </div>
  )
}
