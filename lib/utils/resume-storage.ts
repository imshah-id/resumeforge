// LocalStorage management for resume data

import { type ResumeState, createDefaultResume, DEFAULT_CUSTOMIZATION } from "@/lib/types/resume"

const STORAGE_KEY = "resumeforge_data"
const VERSION = "1.0.0"

export function saveResume(state: ResumeState): void {
  try {
    const dataToSave = {
      ...state,
      metadata: {
        ...state.metadata,
        lastModified: new Date().toISOString(),
      },
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  } catch (error) {
    console.error("[ResumeForge] Failed to save resume:", error)
  }
}

export function loadResume(): ResumeState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const parsed = JSON.parse(stored)

    // Validate version and structure
    if (parsed.metadata?.version !== VERSION) {
      console.warn("[ResumeForge] Version mismatch, using defaults")
      return null
    }

    return parsed as ResumeState
  } catch (error) {
    console.error("[ResumeForge] Failed to load resume:", error)
    return null
  }
}

export function clearResume(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("[ResumeForge] Failed to clear resume:", error)
  }
}

export function exportResumeJSON(state: ResumeState): void {
  const dataStr = JSON.stringify(state, null, 2)
  const blob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `resume-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)
}

export function importResumeJSON(file: File): Promise<ResumeState> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        resolve(data as ResumeState)
      } catch (error) {
        reject(new Error("Invalid JSON file"))
      }
    }
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsText(file)
  })
}

export function createInitialState(): ResumeState {
  return {
    data: createDefaultResume(),
    customization: DEFAULT_CUSTOMIZATION,
    metadata: {
      lastModified: new Date().toISOString(),
      version: VERSION,
    },
  }
}
