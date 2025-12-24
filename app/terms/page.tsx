import type { Metadata } from "next"
import Link from "next/link"
import { FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | ResumeForge",
  description: "ResumeForge terms of service. Read our terms and conditions for using the resume builder.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="w-6 h-6" />
            <span className="text-xl font-bold">ResumeForge</span>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: January 2025</p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using ResumeForge, you accept and agree to be bound by these Terms of Service. If you do
              not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
            <p>
              ResumeForge provides a free, web-based resume builder tool that allows users to create, customize, and
              export professional resumes. The service is provided as-is without warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for the accuracy and content of your resume</li>
              <li>You must not use the service for any illegal purposes</li>
              <li>You must not attempt to harm or disrupt the service</li>
              <li>You are responsible for maintaining the confidentiality of your resume data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p>
              ResumeForge is provided free of charge. We make no guarantees about job placement, interview success, or
              any other outcomes from using our service. We are not liable for any damages arising from your use of
              ResumeForge.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p>
              The resume content you create belongs to you. The ResumeForge service, templates, and design remain the
              property of ResumeForge.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the service after changes
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p>If you have questions about these Terms of Service, please contact us at support@resumeforge.com</p>
          </section>
        </div>
      </main>
    </div>
  )
}
