import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, ArrowRight, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Resume for Freshers | Free Templates & Guide | ResumeForge",
  description:
    "Create professional resumes for freshers and entry-level positions. Free templates optimized for campus placements and first job applications.",
}

export default function ResumeFreshersPage() {
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
          <h1 className="text-4xl font-bold mb-6">Resume for Freshers: Complete Guide</h1>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-muted-foreground mb-8">
              Landing your first job can be challenging without work experience. This guide will help you create a
              compelling resume that highlights your education, projects, and skills to stand out to employers.
            </p>

            <Card className="p-6 mb-8 bg-primary/5">
              <h2 className="text-2xl font-semibold mb-4">What to Include in a Fresher Resume</h2>
              <ul className="space-y-3">
                {[
                  "Contact Information: Name, phone, email, LinkedIn profile",
                  "Career Objective: A brief 2-3 sentence summary of your goals",
                  "Education: Degree, institution, GPA (if above 3.5), graduation date",
                  "Projects: Academic and personal projects showcasing your skills",
                  "Skills: Technical skills, programming languages, tools",
                  "Certifications: Online courses, bootcamps, relevant certifications",
                  "Extracurricular Activities: Leadership roles, volunteer work",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <h2 className="text-2xl font-semibold mb-4">Tips for Freshers</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Card className="p-4">
                <h3 className="font-semibold mb-2 text-green-600">Do This</h3>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>✓ Emphasize academic projects and coursework</li>
                  <li>✓ Highlight leadership roles and achievements</li>
                  <li>✓ Use action verbs and quantify results</li>
                  <li>✓ Keep it to one page</li>
                  <li>✓ Proofread multiple times</li>
                </ul>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-2 text-red-600">Avoid This</h3>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>✗ Don't include irrelevant hobbies</li>
                  <li>✗ Don't use unprofessional email addresses</li>
                  <li>✗ Don't include photos (unless required)</li>
                  <li>✗ Don't lie or exaggerate skills</li>
                  <li>✗ Don't use fancy fonts or colors</li>
                </ul>
              </Card>
            </div>

            <div className="bg-muted p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-3">Best Templates for Freshers</h3>
              <p className="text-muted-foreground mb-4">
                We recommend these templates for freshers and entry-level candidates:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong>Professional:</strong> Clean ATS-safe format perfect for campus placements
                </li>
                <li>
                  <strong>Minimal:</strong> Simple layout that highlights education and skills
                </li>
                <li>
                  <strong>Modern:</strong> Contemporary design for tech and startup roles
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link href="/builder">
              <Button size="lg">
                Create Your Fresher Resume <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
