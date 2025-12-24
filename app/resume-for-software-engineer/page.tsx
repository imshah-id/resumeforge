import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, ArrowRight, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Software Engineer Resume | Free Templates & Guide | ResumeForge",
  description:
    "Create a professional software engineer resume that passes ATS. Free templates optimized for tech roles with project showcase and technical skills.",
}

export default function SoftwareEngineerResumePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="w-6 h-6" />
            <span className="text-xl font-bold">ResumeForge</span>
          </Link>
          <Link href="/builder">
            <Button size="sm">Create Resume</Button>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Software Engineer Resume Guide</h1>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-muted-foreground mb-8">
              Tech resumes need to showcase your technical skills, projects, and impact clearly. Learn how to create a
              software engineer resume that gets past ATS systems and impresses hiring managers.
            </p>

            <Card className="p-6 mb-8 bg-primary/5">
              <h2 className="text-2xl font-semibold mb-4">Essential Sections for Tech Resumes</h2>
              <ul className="space-y-3">
                {[
                  "Contact & Links: Email, phone, LinkedIn, GitHub, portfolio website",
                  "Technical Skills: Programming languages, frameworks, tools, databases",
                  "Experience: Focus on impact, metrics, and technical achievements",
                  "Projects: Showcase 2-3 impressive projects with tech stack and outcomes",
                  "Education: Degree, institution, relevant coursework",
                  "Certifications: AWS, Azure, or other relevant tech certifications",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <h2 className="text-2xl font-semibold mb-4">Technical Skills Section</h2>
            <p className="text-muted-foreground mb-4">
              Organize your technical skills into clear categories for better readability:
            </p>
            <div className="bg-muted p-4 rounded-lg mb-8 font-mono text-sm">
              <p>
                <strong>Languages:</strong> JavaScript, Python, Java, C++, TypeScript
              </p>
              <p>
                <strong>Frontend:</strong> React, Next.js, Vue, Tailwind CSS, HTML/CSS
              </p>
              <p>
                <strong>Backend:</strong> Node.js, Express, Django, FastAPI, Spring Boot
              </p>
              <p>
                <strong>Databases:</strong> PostgreSQL, MongoDB, Redis, MySQL
              </p>
              <p>
                <strong>Tools:</strong> Git, Docker, AWS, CI/CD, Kubernetes
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Writing Impact-Driven Bullet Points</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Card className="p-4 border-red-200">
                <h3 className="font-semibold mb-2 text-red-600">Weak Example</h3>
                <p className="text-sm text-muted-foreground">Worked on frontend features using React</p>
              </Card>

              <Card className="p-4 border-green-200">
                <h3 className="font-semibold mb-2 text-green-600">Strong Example</h3>
                <p className="text-sm text-muted-foreground">
                  Built 15+ React components reducing page load time by 40% and improving Core Web Vitals scores to 95+
                </p>
              </Card>
            </div>

            <div className="bg-muted p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-3">Recommended Templates for Developers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong>Developer:</strong> Tech-focused layout with prominent project section
                </li>
                <li>
                  <strong>GitHub:</strong> Optimized for open source contributors and GitHub portfolios
                </li>
                <li>
                  <strong>Professional:</strong> Clean ATS-safe format for FAANG applications
                </li>
                <li>
                  <strong>Modern:</strong> Contemporary design for startups and tech companies
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link href="/builder">
              <Button size="lg">
                Create Your Developer Resume <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
