import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TEMPLATE_METADATA, TEMPLATE_CATEGORIES } from "@/lib/constants/templates"
import { TemplatePreviewCard } from "@/components/resume/template-preview-card"
import { FileText, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Free Resume Templates | ResumeForge",
  description:
    "Browse 15+ professional, ATS-safe resume templates. Download for free without signup. Perfect for all industries and career levels.",
}

export default function TemplatesPage() {
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

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Professional Resume Templates</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 md:mb-6">
            Choose from {TEMPLATE_METADATA.length} expertly designed templates. All are ATS-safe, free to use, and
            require no signup. Preview each template with real sample data.
          </p>
          <Link href="/builder">
            <Button size="lg">
              Start Building <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {TEMPLATE_CATEGORIES.filter((cat) => cat.id !== "all").map((category) => {
          const templates = TEMPLATE_METADATA.filter((t) => t.category === category.id)

          return (
            <section key={category.id} className="mb-12 md:mb-16">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{category.name}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {templates.map((template) => (
                  <TemplatePreviewCard key={template.id} template={template} showPreview={true} />
                ))}
              </div>
            </section>
          )
        })}

        <div className="text-center py-12 md:py-16 border-t">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Build Your Resume?</h2>
          <p className="text-muted-foreground mb-6 md:mb-8 max-w-xl mx-auto">
            Start with any template and customize it to match your style. No signup required.
          </p>
          <Link href="/builder">
            <Button size="lg">
              Create Your Resume Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
