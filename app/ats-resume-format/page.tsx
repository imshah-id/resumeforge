import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, ArrowRight, AlertCircle, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "ATS Resume Format Guide | ResumeForge",
  description:
    "Learn how to create ATS-friendly resumes that pass applicant tracking systems. Free guide and ATS-safe templates.",
}

export default function ATSFormatPage() {
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
          <h1 className="text-4xl font-bold mb-6">ATS-Friendly Resume Format Guide</h1>

          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Over 75% of resumes are rejected by ATS before reaching human recruiters. Learn how to optimize your
              resume to pass these systems.
            </AlertDescription>
          </Alert>

          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-2xl font-semibold mb-4">What is an ATS?</h2>
            <p className="text-muted-foreground mb-6">
              An Applicant Tracking System (ATS) is software used by employers to filter and rank resumes. It scans
              resumes for keywords, formatting, and relevant experience before a human ever sees them.
            </p>

            <Card className="p-6 mb-8 bg-primary/5">
              <h2 className="text-2xl font-semibold mb-4">ATS-Safe Formatting Rules</h2>
              <ul className="space-y-3">
                {[
                  "Use standard section headings: Work Experience, Education, Skills",
                  "Stick to common fonts: Arial, Calibri, Georgia, Times New Roman",
                  "Avoid tables, columns, text boxes, and graphics",
                  "Don't use headers or footers for important information",
                  "Save as .docx or PDF (check job posting requirements)",
                  "Use standard bullet points (•, not fancy symbols)",
                  "Include relevant keywords from the job description",
                  "Keep formatting simple and consistent",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <h2 className="text-2xl font-semibold mb-4">Common ATS Mistakes to Avoid</h2>
            <div className="space-y-4 mb-8">
              <Card className="p-4 border-red-200">
                <h3 className="font-semibold mb-2 text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Using Images or Graphics
                </h3>
                <p className="text-sm text-muted-foreground">
                  ATS cannot read images. Avoid logos, profile pictures, or infographic elements.
                </p>
              </Card>

              <Card className="p-4 border-red-200">
                <h3 className="font-semibold mb-2 text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Complex Layouts
                </h3>
                <p className="text-sm text-muted-foreground">
                  Multi-column layouts and text boxes confuse ATS parsers and may scramble your content.
                </p>
              </Card>

              <Card className="p-4 border-red-200">
                <h3 className="font-semibold mb-2 text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Unusual Section Names
                </h3>
                <p className="text-sm text-muted-foreground">
                  Using creative headings like "Where I've Been" instead of "Work Experience" confuses the ATS.
                </p>
              </Card>
            </div>

            <div className="bg-muted p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-3">All ResumeForge Templates are ATS-Safe</h3>
              <p className="text-muted-foreground mb-4">
                Every template in our collection follows ATS best practices while maintaining professional aesthetics.
                You can use any template with confidence.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Simple, clean formatting that ATS can parse</li>
                <li>✓ Standard section headings recognized by all systems</li>
                <li>✓ No images, tables, or complex layouts</li>
                <li>✓ Optimized for keyword matching</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link href="/builder">
              <Button size="lg">
                Create ATS-Safe Resume <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
