// Core Resume Data Types

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  portfolio?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  highlights: string[]
  visible: boolean
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  gpa?: string
  honors?: string
  description?: string
  visible: boolean
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  github?: string
  highlights: string[]
  startDate?: string
  endDate?: string
  visible: boolean
}

export interface Skill {
  id: string
  category: string
  skills: string[]
  visible: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  date?: string
  visible: boolean
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  projects: Project[]
  skills: Skill[]
  achievements: Achievement[]
  sectionOrder: string[]
}

export interface CustomizationSettings {
  templateId: string
  fontFamily: string
  fontSize: number
  lineHeight: number
  sectionSpacing: number
  marginSize: string
  accentColor: string
  bulletStyle: string
}

export interface ResumeState {
  data: ResumeData
  customization: CustomizationSettings
  metadata: {
    lastModified: string
    version: string
  }
}

// Default values
export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
}

export const DEFAULT_CUSTOMIZATION: CustomizationSettings = {
  templateId: "professional",
  fontFamily: "Inter",
  fontSize: 11,
  lineHeight: 1.5,
  sectionSpacing: 16,
  marginSize: "medium",
  accentColor: "#2563eb",
  bulletStyle: "circle",
}

export const DEFAULT_SECTION_ORDER = ["summary", "experience", "education", "projects", "skills", "achievements"]

export const createDefaultResume = (): ResumeData => ({
  personalInfo: DEFAULT_PERSONAL_INFO,
  summary: "",
  experience: [],
  education: [],
  projects: [],
  skills: [],
  achievements: [],
  sectionOrder: DEFAULT_SECTION_ORDER,
})
