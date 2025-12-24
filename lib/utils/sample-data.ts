import type { ResumeData } from "@/lib/types/resume"

// Sample resume data for template previews
export const SAMPLE_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexj",
    portfolio: "alexjohnson.dev",
  },
  summary:
    "Results-driven Software Engineer with 5+ years of experience building scalable web applications. Passionate about clean code, user experience, and solving complex problems with elegant solutions.",
  experience: [
    {
      id: "exp1",
      company: "Tech Solutions Inc",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2021-06",
      endDate: "",
      current: true,
      description: "Lead development of core platform features",
      highlights: [
        "Architected and deployed microservices handling 10M+ daily requests",
        "Reduced API response time by 40% through optimization",
        "Mentored team of 5 junior developers",
      ],
      visible: true,
    },
    {
      id: "exp2",
      company: "StartupXYZ",
      position: "Software Engineer",
      location: "Palo Alto, CA",
      startDate: "2019-03",
      endDate: "2021-05",
      current: false,
      description: "Full-stack development for SaaS platform",
      highlights: [
        "Built responsive dashboard used by 50K+ users",
        "Implemented real-time features using WebSockets",
        "Improved test coverage from 40% to 85%",
      ],
      visible: true,
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Berkeley, CA",
      startDate: "2015-09",
      endDate: "2019-05",
      current: false,
      gpa: "3.8/4.0",
      honors: "Magna Cum Laude",
      visible: true,
    },
  ],
  projects: [
    {
      id: "proj1",
      name: "TaskFlow",
      description: "Open-source project management tool with real-time collaboration",
      technologies: ["React", "Node.js", "PostgreSQL", "WebSockets"],
      github: "github.com/alexj/taskflow",
      highlights: ["1.2K+ GitHub stars", "Used by 100+ companies"],
      visible: true,
    },
    {
      id: "proj2",
      name: "DevTools Extension",
      description: "Browser extension for debugging React applications",
      technologies: ["TypeScript", "React", "Chrome APIs"],
      highlights: ["10K+ active users", "Featured on Product Hunt"],
      visible: true,
    },
  ],
  skills: [
    {
      id: "skill1",
      category: "Languages",
      skills: ["JavaScript", "TypeScript", "Python", "Go"],
      visible: true,
    },
    {
      id: "skill2",
      category: "Frontend",
      skills: ["React", "Next.js", "Vue", "Tailwind CSS"],
      visible: true,
    },
    {
      id: "skill3",
      category: "Backend",
      skills: ["Node.js", "Express", "PostgreSQL", "Redis"],
      visible: true,
    },
  ],
  achievements: [
    {
      id: "ach1",
      title: "AWS Certified Solutions Architect",
      description: "Professional level certification",
      date: "2023",
      visible: true,
    },
  ],
  sectionOrder: ["summary", "experience", "projects", "education", "skills", "achievements"],
}
