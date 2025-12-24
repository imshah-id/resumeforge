"use client"

import type { ResumeData, CustomizationSettings } from "@/lib/types/resume"
import { formatDateRange } from "@/lib/utils/date-formatter"
import { cn } from "@/lib/utils"
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react"

interface TemplateProps {
  data: ResumeData
  customization: CustomizationSettings
  className?: string
}

export function ProfessionalTemplate({ data, customization, className }: TemplateProps) {
  const { personalInfo, summary, experience, education, projects, skills, achievements, sectionOrder } = data
  const { fontSize, lineHeight, sectionSpacing, accentColor, bulletStyle } = customization

  const sectionClasses = "mb-6 print:break-inside-avoid"
  const sectionTitleClasses = "text-lg font-bold uppercase tracking-wide mb-3 pb-1 border-b-2"
  const itemTitleClasses = "font-semibold text-base"
  const dateClasses = "text-sm text-gray-600"

  const bulletSymbol =
    bulletStyle === "circle" ? "•" : bulletStyle === "square" ? "▪" : bulletStyle === "arrow" ? "▸" : "—"

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "summary":
        if (!summary) return null
        return (
          <section key={sectionId} className={sectionClasses}>
            <h2 className={sectionTitleClasses} style={{ borderColor: accentColor }}>
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed">{summary}</p>
          </section>
        )

      case "experience":
        const visibleExp = experience.filter((e) => e.visible)
        if (visibleExp.length === 0) return null
        return (
          <section key={sectionId} className={sectionClasses}>
            <h2 className={sectionTitleClasses} style={{ borderColor: accentColor }}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {visibleExp.map((exp) => (
                <div key={exp.id} className="print:break-inside-avoid">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className={itemTitleClasses}>{exp.position}</h3>
                      <p className="text-sm" style={{ color: accentColor }}>
                        {exp.company} {exp.location && `• ${exp.location}`}
                      </p>
                    </div>
                    <span className={dateClasses}>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                  </div>
                  {exp.description && <p className="text-sm mb-2">{exp.description}</p>}
                  {exp.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm flex gap-2">
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
          <section key={sectionId} className={sectionClasses}>
            <h2 className={sectionTitleClasses} style={{ borderColor: accentColor }}>
              Education
            </h2>
            <div className="space-y-3">
              {visibleEdu.map((edu) => (
                <div key={edu.id} className="print:break-inside-avoid">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={itemTitleClasses}>{edu.degree}</h3>
                      <p className="text-sm" style={{ color: accentColor }}>
                        {edu.institution} {edu.location && `• ${edu.location}`}
                      </p>
                      {edu.field && <p className="text-sm text-gray-600">Major: {edu.field}</p>}
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                      {edu.honors && <p className="text-sm text-gray-600">{edu.honors}</p>}
                    </div>
                    <span className={dateClasses}>{formatDateRange(edu.startDate, edu.endDate, edu.current)}</span>
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
          <section key={sectionId} className={sectionClasses}>
            <h2 className={sectionTitleClasses} style={{ borderColor: accentColor }}>
              Projects
            </h2>
            <div className="space-y-3">
              {visibleProj.map((proj) => (
                <div key={proj.id} className="print:break-inside-avoid">
                  <div className="mb-1">
                    <h3 className={itemTitleClasses}>
                      {proj.name}
                      {proj.link && (
                        <a href={proj.link} className="text-xs ml-2" style={{ color: accentColor }}>
                          View Project
                        </a>
                      )}
                    </h3>
                    <p className="text-sm">{proj.description}</p>
                    {proj.technologies.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Technologies:</span> {proj.technologies.join(", ")}
                      </p>
                    )}
                  </div>
                  {proj.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {proj.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm flex gap-2">
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
          <section key={sectionId} className={sectionClasses}>
            <h2 className={sectionTitleClasses} style={{ borderColor: accentColor }}>
              Skills
            </h2>
            <div className="space-y-2">
              {visibleSkills.map((skill) => (
                <div key={skill.id} className="print:break-inside-avoid">
                  <span className="font-medium text-sm">{skill.category}:</span>{" "}
                  <span className="text-sm">{skill.skills.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )

      case "achievements":
        const visibleAch = achievements.filter((a) => a.visible)
        if (visibleAch.length === 0) return null
        return (
          <section key={sectionId} className={sectionClasses}>
            <h2 className={sectionTitleClasses} style={{ borderColor: accentColor }}>
              Achievements
            </h2>
            <ul className="space-y-2">
              {visibleAch.map((ach) => (
                <li key={ach.id} className="text-sm flex gap-2 print:break-inside-avoid">
                  <span className="flex-shrink-0 mt-1.5" style={{ color: accentColor }}>
                    {bulletSymbol}
                  </span>
                  <span className="flex-1">
                    <span className="font-medium">{ach.title}</span>
                    {ach.date && <span className="text-gray-600"> ({ach.date})</span>}
                    {ach.description && <span> - {ach.description}</span>}
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
      className={cn("bg-white text-gray-900 p-12 w-full h-full overflow-auto", className)}
      style={{
        fontSize: `${fontSize}pt`,
        lineHeight,
      }}
    >
      {/* Header */}
      <header className="mb-6 text-center border-b-4 pb-4" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-700">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3 h-3" />
              {personalInfo.github}
            </span>
          )}
        </div>
      </header>

      {/* Dynamic Sections */}
      <div className="space-y-0" style={{ gap: `${sectionSpacing}px` }}>
        {sectionOrder.map((sectionId) => renderSection(sectionId))}
      </div>
    </div>
  )
}
