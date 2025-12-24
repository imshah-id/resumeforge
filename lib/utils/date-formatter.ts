// Date formatting utilities for resume dates

export function formatResumeDate(date: string, current = false): string {
  if (current) return "Present"
  if (!date) return ""

  try {
    const d = new Date(date)
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  } catch {
    return date
  }
}

export function formatDateRange(startDate: string, endDate: string, current: boolean): string {
  const start = formatResumeDate(startDate)
  const end = current ? "Present" : formatResumeDate(endDate)
  return `${start} - ${end}`
}

export function calculateDuration(startDate: string, endDate: string, current: boolean): string {
  try {
    const start = new Date(startDate)
    const end = current ? new Date() : new Date(endDate)

    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())

    if (months < 12) {
      return `${months} month${months !== 1 ? "s" : ""}`
    }

    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? "s" : ""}`
    }

    return `${years} yr${years !== 1 ? "s" : ""} ${remainingMonths} mo`
  } catch {
    return ""
  }
}
