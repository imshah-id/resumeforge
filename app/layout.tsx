import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"
import Script from "next/script"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ResumeForge - Free Professional Resume Builder",
  description:
    "Create ATS-safe, professional resumes in minutes. Choose from 15+ templates. 100% free, no login required. Export perfect PDFs for your job applications.",
  keywords: [
    "resume builder",
    "free resume",
    "ATS resume",
    "professional resume",
    "CV builder",
    "resume templates",
    "job application",
  ],
  authors: [{ name: "ResumeForge" }],
  creator: "ResumeForge",
  publisher: "ResumeForge",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "ResumeForge - Free Professional Resume Builder",
    description: "Create ATS-safe, professional resumes with 15+ templates. 100% free, no login required.",
    siteName: "ResumeForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeForge - Free Professional Resume Builder",
    description: "Create ATS-safe, professional resumes with 15+ templates. 100% free, no login required.",
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  return (
    <html lang="en" suppressHydrationMarning>
      <head>
        {/* Google AdSense Script */}
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="resumeforge-ui-theme">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
