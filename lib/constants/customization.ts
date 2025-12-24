// Customization options and presets

export const FONT_FAMILIES = [
  { id: "inter", name: "Inter", className: "font-sans" },
  { id: "system", name: "System", className: "font-sans" },
  { id: "roboto", name: "Roboto", className: "font-sans" },
  { id: "open-sans", name: "Open Sans", className: "font-sans" },
  { id: "lato", name: "Lato", className: "font-sans" },
  { id: "georgia", name: "Georgia", className: "font-serif" },
  { id: "times", name: "Times New Roman", className: "font-serif" },
  { id: "courier", name: "Courier", className: "font-mono" },
] as const

export const FONT_SIZES = [
  { id: "xs", name: "Extra Small", value: 9, description: "9pt" },
  { id: "sm", name: "Small", value: 10, description: "10pt" },
  { id: "base", name: "Medium", value: 11, description: "11pt (Recommended)" },
  { id: "lg", name: "Large", value: 12, description: "12pt" },
] as const

export const LINE_HEIGHTS = [
  { id: "tight", name: "Tight", value: 1.3 },
  { id: "normal", name: "Normal", value: 1.5 },
  { id: "relaxed", name: "Relaxed", value: 1.7 },
] as const

export const SECTION_SPACING = [
  { id: "compact", name: "Compact", value: 12 },
  { id: "normal", name: "Normal", value: 16 },
  { id: "spacious", name: "Spacious", value: 20 },
] as const

export const MARGIN_SIZES = [
  { id: "narrow", name: "Narrow", value: "0.4in" },
  { id: "medium", name: "Medium", value: "0.6in" },
  { id: "wide", name: "Wide", value: "0.8in" },
] as const

export const ACCENT_COLORS = [
  { id: "blue", name: "Blue", value: "#2563eb" },
  { id: "indigo", name: "Indigo", value: "#4f46e5" },
  { id: "slate", name: "Slate", value: "#475569" },
  { id: "teal", name: "Teal", value: "#0d9488" },
  { id: "emerald", name: "Emerald", value: "#059669" },
  { id: "red", name: "Red", value: "#dc2626" },
  { id: "orange", name: "Orange", value: "#ea580c" },
  { id: "amber", name: "Amber", value: "#d97706" },
] as const

export const BULLET_STYLES = [
  { id: "circle", name: "Circle", symbol: "•" },
  { id: "square", name: "Square", symbol: "▪" },
  { id: "arrow", name: "Arrow", symbol: "▸" },
  { id: "dash", name: "Dash", symbol: "—" },
] as const
