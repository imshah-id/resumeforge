export async function exportToPDF(filename: string) {
  console.log("[v0] Preparing PDF export...")

  let resumeElement = document.querySelector('[data-resume-preview="true"]')

  // If element not found, wait a moment and try again
  if (!resumeElement) {
    console.log("[v0] Element not found immediately, waiting...")
    await new Promise((resolve) => setTimeout(resolve, 100))
    resumeElement = document.querySelector('[data-resume-preview="true"]')
  }

  if (!resumeElement) {
    console.error("[v0] Resume preview element not found after retry")
    throw new Error("Resume preview element not found. Please ensure the preview is visible.")
  }

  console.log("[v0] Resume element found, triggering print...")

  // Set the document title to the filename for the print dialog
  // Note: Browsers will use this as the suggested filename
  const originalTitle = document.title
  document.title = filename

  try {
    // Use the browser's native print functionality
    // User must manually save as PDF in the print dialog
    window.print()
    console.log("[v0] Print dialog opened")

    return true
  } finally {
    // Restore the original title after a short delay
    setTimeout(() => {
      document.title = originalTitle
    }, 500)
  }
}
