// Template definitions and metadata

export interface TemplateMetadata {
  id: string
  name: string
  category: "ats" | "modern" | "developer" | "academic" | "creative"
  description: string
  preview: string
  features: string[]
  bestFor: string[]
}

export const TEMPLATE_METADATA: TemplateMetadata[] = [
  {
    id: "professional",
    name: "Professional",
    category: "ats",
    description: "Clean, ATS-friendly template optimized for corporate roles",
    preview: "/templates/professional.png",
    features: ["ATS-Safe", "One-Page", "Clean Typography"],
    bestFor: ["Corporate Jobs", "Business Roles", "Traditional Industries"],
  },
  {
    id: "minimal",
    name: "Minimal",
    category: "ats",
    description: "Ultra-clean layout with maximum readability",
    preview: "/templates/minimal.png",
    features: ["Ultra Clean", "High Readability", "ATS-Optimized"],
    bestFor: ["All Industries", "Freshers", "Career Switchers"],
  },
  {
    id: "classic",
    name: "Classic",
    category: "ats",
    description: "Traditional format trusted by recruiters",
    preview: "/templates/classic.png",
    features: ["Traditional", "Conservative", "ATS-Safe"],
    bestFor: ["Law", "Finance", "Government"],
  },
  {
    id: "modern",
    name: "Modern",
    category: "modern",
    description: "Contemporary design with subtle visual hierarchy",
    preview: "/templates/modern.png",
    features: ["Contemporary", "Visual Hierarchy", "Professional"],
    bestFor: ["Marketing", "Design", "Startups"],
  },
  {
    id: "compact",
    name: "Compact",
    category: "modern",
    description: "Maximize content with efficient space usage",
    preview: "/templates/compact.png",
    features: ["Space Efficient", "Two Column", "Modern"],
    bestFor: ["Experienced Professionals", "Multiple Roles"],
  },
  {
    id: "elegant",
    name: "Elegant",
    category: "modern",
    description: "Sophisticated layout with refined typography",
    preview: "/templates/elegant.png",
    features: ["Sophisticated", "Refined", "Professional"],
    bestFor: ["Senior Roles", "Executive Positions", "Consulting"],
  },
  {
    id: "developer",
    name: "Developer",
    category: "developer",
    description: "Tech-focused template highlighting projects and skills",
    preview: "/templates/developer.png",
    features: ["Tech Focused", "Project Showcase", "GitHub Links"],
    bestFor: ["Software Engineers", "Developers", "Tech Roles"],
  },
  {
    id: "tech-minimalist",
    name: "Tech Minimalist",
    category: "developer",
    description: "Clean code-inspired layout for developers",
    preview: "/templates/tech-minimalist.png",
    features: ["Code Inspired", "Minimalist", "Tech Friendly"],
    bestFor: ["Frontend Developers", "UI Engineers", "Tech Startups"],
  },
  {
    id: "github",
    name: "GitHub",
    category: "developer",
    description: "Developer-first template with prominent project links",
    preview: "/templates/github.png",
    features: ["Open Source Friendly", "Project Links", "Tech Skills"],
    bestFor: ["Open Source Contributors", "Full Stack Developers"],
  },
  {
    id: "academic",
    name: "Academic",
    category: "academic",
    description: "Research-focused layout for academic positions",
    preview: "/templates/academic.png",
    features: ["Publication Ready", "Research Focused", "Formal"],
    bestFor: ["Researchers", "PhD Candidates", "Professors"],
  },
  {
    id: "research",
    name: "Research",
    category: "academic",
    description: "Detailed format for showcasing research work",
    preview: "/templates/research.png",
    features: ["Detailed", "Publication Support", "Academic"],
    bestFor: ["Research Scientists", "Lab Positions", "Academia"],
  },
  {
    id: "two-column",
    name: "Two Column",
    category: "creative",
    description: "Sidebar layout with visual distinction",
    preview: "/templates/two-column.png",
    features: ["Two Column", "Sidebar", "Visual Interest"],
    bestFor: ["Creative Roles", "Design", "Marketing"],
  },
  {
    id: "accent-left",
    name: "Accent Left",
    category: "creative",
    description: "Left accent bar for subtle visual appeal",
    preview: "/templates/accent-left.png",
    features: ["Accent Bar", "Modern", "ATS-Safe"],
    bestFor: ["Product Managers", "Business Analysts", "Consultants"],
  },
  {
    id: "timeline",
    name: "Timeline",
    category: "modern",
    description: "Chronological layout with visual timeline",
    preview: "/templates/timeline.png",
    features: ["Timeline View", "Chronological", "Visual"],
    bestFor: ["Career Progressions", "Long Experience", "Leadership"],
  },
  {
    id: "bold-header",
    name: "Bold Header",
    category: "creative",
    description: "Strong header section with prominent name",
    preview: "/templates/bold-header.png",
    features: ["Bold Typography", "Strong Header", "Modern"],
    bestFor: ["Creative Directors", "Senior Roles", "Personal Brand"],
  },
]

export const TEMPLATE_CATEGORIES = [
  { id: "all", name: "All Templates" },
  { id: "ats", name: "ATS / Corporate" },
  { id: "modern", name: "Modern" },
  { id: "developer", name: "Developer" },
  { id: "academic", name: "Academic" },
  { id: "creative", name: "Subtle Creative" },
] as const
