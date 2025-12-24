import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://resumeforge.com" // Replace with actual domain

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/print/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
