"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { InlineAd } from "@/components/ads/inline-ad"
import { TemplatePreviewCard } from "@/components/resume/template-preview-card"
import { TEMPLATE_METADATA } from "@/lib/constants/templates"
import { FileText, Layout, Download, Lock, Zap, Check, ArrowRight, Star, Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function HomePage() {
  const featuredTemplates = TEMPLATE_METADATA.slice(0, 4)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b animate-fadeIn sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <nav className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <FileText className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-lg md:text-xl font-bold">ResumeForge</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/templates" className="text-sm hover:text-primary transition-colors">
              Templates
            </Link>
            <Link href="/builder" className="text-sm hover:text-primary transition-colors">
              Builder
            </Link>
            <ThemeToggle />
            <Link href="/builder">
              <Button size="sm" className="hover:scale-105 transition-transform">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <Link
                    href="/templates"
                    className="text-base hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Templates
                  </Link>
                  <Link
                    href="/builder"
                    className="text-base hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Builder
                  </Link>
                  <Link href="/builder" onClick={() => setMobileMenuOpen(false)} className="mt-2">
                    <Button size="sm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 text-center">
        <Badge variant="secondary" className="mb-4 animate-slideDown">
          100% Free • No Login Required
        </Badge>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-balance animate-slideUp">
          Build Professional Resumes That Get You Hired
        </h1>
        <p
          className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto text-balance animate-slideUp"
          style={{ animationDelay: "0.1s" }}
        >
          Create ATS-safe, beautifully designed resumes in minutes. Choose from 15+ professional templates trusted by
          job seekers worldwide.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-slideUp"
          style={{ animationDelay: "0.2s" }}
        >
          <Link href="/builder" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform">
              Create Your Resume <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/templates" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-transparent hover:scale-105 transition-transform"
            >
              Browse Templates
            </Button>
          </Link>
        </div>

        {/* Social Proof */}
        <div
          className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground animate-fadeIn"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span>Trusted by 50,000+ job seekers</span>
        </div>
      </section>

      {/* Template Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 bg-muted/30">
        <div className="text-center mb-8 md:mb-12 animate-slideUp">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Choose from 15+ Professional Templates</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            All templates are ATS-safe, fully customizable, and designed by professionals. Click any template to start
            building with real sample data you can edit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 stagger-children">
          {featuredTemplates.map((template) => (
            <TemplatePreviewCard key={template.id} template={template} showPreview={true} />
          ))}
        </div>

        <div className="text-center mt-8 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
          <Link href="/templates">
            <Button variant="outline" size="lg" className="hover:scale-105 transition-transform bg-transparent">
              View All {TEMPLATE_METADATA.length} Templates <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Inline Ad after Templates */}
      <div className="container mx-auto px-4">
        <InlineAd />
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-8 md:mb-12 animate-slideUp">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Everything You Need to Land Your Dream Job</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            ResumeForge provides professional-grade tools without the complexity or cost of paid services.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 stagger-children">
          <Card className="p-5 md:p-6 hover-lift">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
              <Layout className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">15+ Professional Templates</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Choose from ATS-safe templates designed for corporate, tech, creative, and academic roles.
            </p>
          </Card>

          <Card className="p-5 md:p-6 hover-lift">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">Live Preview</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              See changes instantly as you type. What you see is exactly what you get in the PDF.
            </p>
          </Card>

          <Card className="p-5 md:p-6 hover-lift">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
              <Download className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">One-Click PDF Export</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Export your resume as a perfect PDF with zero watermarks, ads, or quality loss.
            </p>
          </Card>

          <Card className="p-5 md:p-6 hover-lift">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
              <Lock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Your data never leaves your device. Everything is stored locally in your browser.
            </p>
          </Card>

          <Card className="p-5 md:p-6 hover-lift">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
              <Check className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">ATS-Safe Formatting</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              All templates are optimized to pass Applicant Tracking Systems used by recruiters.
            </p>
          </Card>

          <Card className="p-5 md:p-6 hover-lift">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
              <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">Quality Checker</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Get real-time feedback on resume completeness and suggestions for improvement.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Create Your Resume in 3 Simple Steps</h2>
            <p className="text-muted-foreground text-sm md:text-base">No signup, no payment, no hassle</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2">Choose Template</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Select from 15+ professionally designed templates
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2">Fill Your Info</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Add your experience, education, and skills with ease
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2">Download PDF</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Export your perfect resume and start applying</p>
            </div>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link href="/builder">
              <Button size="lg">Start Building Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5" />
                <span className="font-bold">ResumeForge</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Build professional, ATS-safe resumes for free. No login required.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/templates" className="text-muted-foreground hover:text-primary">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="/builder" className="text-muted-foreground hover:text-primary">
                    Resume Builder
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/resume-for-freshers" className="text-muted-foreground hover:text-primary">
                    Resume for Freshers
                  </Link>
                </li>
                <li>
                  <Link href="/resume-for-software-engineer" className="text-muted-foreground hover:text-primary">
                    Software Engineer Resume
                  </Link>
                </li>
                <li>
                  <Link href="/ats-resume-format" className="text-muted-foreground hover:text-primary">
                    ATS Resume Format
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-muted-foreground">
            <p>&copy; 2025 ResumeForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
