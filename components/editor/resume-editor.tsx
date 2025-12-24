"use client"

import { useEffect } from "react"
import type { ResumeState } from "@/lib/types/resume"
import { saveResume } from "@/lib/utils/resume-storage"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "./personal-info-form"
import { SummaryForm } from "./summary-form"
import { ExperienceForm } from "./experience-form"
import { EducationForm } from "./education-form"
import { ProjectsForm } from "./projects-form"
import { SkillsForm } from "./skills-form"
import { AchievementsForm } from "./achievements-form"
import { Card } from "@/components/ui/card"
import { User, FileText, Briefcase, GraduationCap, Code, Award, Trophy } from "lucide-react"

interface ResumeEditorProps {
  state: ResumeState
  onChange: (state: ResumeState) => void
}

export function ResumeEditor({ state, onChange }: ResumeEditorProps) {
  const updateData = (updates: Partial<typeof state.data>) => {
    onChange({
      ...state,
      data: { ...state.data, ...updates },
    })
  }

  // Auto-save on changes
  useEffect(() => {
    const timer = setTimeout(() => {
      saveResume(state)
    }, 1000)

    return () => clearTimeout(timer)
  }, [state])

  return (
    <div className="h-full overflow-auto">
      <Tabs defaultValue="personal" className="w-full animate-fadeIn">
        <div className="mb-4 overflow-x-auto pb-2 -mx-2 px-2">
          <TabsList className="w-full min-w-max inline-flex lg:grid lg:grid-cols-7 gap-1 h-auto p-1">
            <TabsTrigger
              value="personal"
              className="text-sm hover:scale-105 transition-transform flex items-center gap-2 px-4 py-2.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <User className="w-4 h-4 flex-shrink-0" />
              <span>Personal Info</span>
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="text-sm hover:scale-105 transition-transform flex items-center gap-2 px-4 py-2.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileText className="w-4 h-4 flex-shrink-0" />
              <span>Summary</span>
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="text-sm hover:scale-105 transition-transform flex items-center gap-2 px-4 py-2.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Briefcase className="w-4 h-4 flex-shrink-0" />
              <span>Experience</span>
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="text-sm hover:scale-105 transition-transform flex items-center gap-2 px-4 py-2.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <GraduationCap className="w-4 h-4 flex-shrink-0" />
              <span>Education</span>
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="text-sm hover:scale-105 transition-transform flex items-center gap-2 px-4 py-2.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Code className="w-4 h-4 flex-shrink-0" />
              <span>Projects</span>
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="text-sm hover:scale-105 transition-transform flex items-center gap-2 px-4 py-2.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Award className="w-4 h-4 flex-shrink-0" />
              <span>Skills</span>
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="text-sm hover:scale-105 transition-transform flex items-center gap-2 px-4 py-2.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Trophy className="w-4 h-4 flex-shrink-0" />
              <span>Achievements</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-4">
          <TabsContent value="personal" className="animate-slideUp">
            <Card className="p-6 hover-lift">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <PersonalInfoForm
                data={state.data.personalInfo}
                onChange={(personalInfo) => updateData({ personalInfo })}
              />
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="animate-slideUp">
            <Card className="p-6 hover-lift">
              <h3 className="text-lg font-semibold mb-4">Professional Summary</h3>
              <SummaryForm summary={state.data.summary} onChange={(summary) => updateData({ summary })} />
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="animate-slideUp">
            <Card className="p-6 hover-lift">
              <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
              <ExperienceForm
                experiences={state.data.experience}
                onChange={(experience) => updateData({ experience })}
              />
            </Card>
          </TabsContent>

          <TabsContent value="education" className="animate-slideUp">
            <Card className="p-6 hover-lift">
              <h3 className="text-lg font-semibold mb-4">Education</h3>
              <EducationForm education={state.data.education} onChange={(education) => updateData({ education })} />
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="animate-slideUp">
            <Card className="p-6 hover-lift">
              <h3 className="text-lg font-semibold mb-4">Projects</h3>
              <ProjectsForm projects={state.data.projects} onChange={(projects) => updateData({ projects })} />
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="animate-slideUp">
            <Card className="p-6 hover-lift">
              <h3 className="text-lg font-semibold mb-4">Skills</h3>
              <SkillsForm skills={state.data.skills} onChange={(skills) => updateData({ skills })} />
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="animate-slideUp">
            <Card className="p-6 hover-lift">
              <h3 className="text-lg font-semibold mb-4">Achievements & Awards</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Optional section for awards, certifications, honors, and notable achievements.
              </p>
              <AchievementsForm
                achievements={state.data.achievements}
                onChange={(achievements) => updateData({ achievements })}
              />
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
