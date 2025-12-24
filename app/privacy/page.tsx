import type { Metadata } from "next"
import Link from "next/link"
import { FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | ResumeForge",
  description: "ResumeForge privacy policy. Learn how we protect your data and respect your privacy.",
}

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: January 2025</p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              At ResumeForge, we take your privacy seriously. This Privacy Policy explains how we collect, use, and
              protect your information when you use our resume builder service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Storage</h2>
            <p>
              ResumeForge operates on a privacy-first principle. All resume data you create is stored locally in your
              browser using localStorage. We do not collect, store, or transmit your resume data to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Analytics Data:</strong> We use Vercel Analytics to collect anonymous usage statistics such as
                page views and user interactions.
              </li>
              <li>
                <strong>Advertising:</strong> We use Google AdSense to display advertisements. Google may collect data
                for ad personalization.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Google AdSense:</strong> Displays advertisements and may use cookies for ad personalization.
              </li>
              <li>
                <strong>Vercel Analytics:</strong> Provides anonymous usage statistics to help us improve the service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p>
              We use cookies for essential functionality (theme preferences) and third-party services (analytics and
              advertising). You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p>If you have questions about this Privacy Policy, please contact us at privacy@resumeforge.com</p>
          </section>
        </div>
      </main>
    </div>
  )
}
