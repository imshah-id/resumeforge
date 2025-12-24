"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ResumeEditor } from "@/components/editor/resume-editor"
import { ResumeRenderer } from "@/components/resume/resume-renderer"
import type { ResumeState } from "@/lib/types/resume"
import { createInitialState, loadResume, saveResume } from "@/lib/utils/resume-storage"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Settings, Layout } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CustomizationPanel } from "@/components/customization/customization-panel"
import { TemplateSelector } from "@/components/customization/template-selector"
import { QualityIndicator } from "@/components/customization/quality-indicator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { PDFExportDialog } from "@/components/export/pdf-export-dialog"
import Link from "next/link"

export function BuilderWrapper() {
  const [state, setState] = useState<ResumeState>(createInitialState())
  const [showPreview, setShowPreview] = useState(false)
  const [initialized, setInitialized] = useState(false) // Track initialization to prevent infinite loops
  const isMobile = useIsMobile()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (initialized) return // Skip if already initialized

    const loaded = loadResume()
    const templateParam = searchParams.get("template")

    if (loaded) {
      if (templateParam) {
        setState({
          ...loaded,
          customization: {
            ...loaded.customization,
            templateId: templateParam,
          },
        })
      } else {
        setState(loaded)
      }
    } else if (templateParam) {
      setState({
        ...createInitialState(),
        customization: {
          ...createInitialState().customization,
          templateId: templateParam,
        },
      })
    }

    setInitialized(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array - only run once

  // Auto-save on changes (debounced)
  useEffect(() => {
    if (!initialized) return

    const timer = setTimeout(() => {
      saveResume(state)
    }, 1000)

    return () => clearTimeout(timer)
  }, [state, initialized])

  const updateCustomization = (customization: typeof state.customization) => {
    setState({ ...state, customization })
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="border-b px-2 sm:px-3 md:px-4 py-2 md:py-3 flex items-center justify-between gap-2 flex-shrink-0 animate-slideDown bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity min-w-0">
          <h1 className="text-sm sm:text-base md:text-xl font-bold">ResumeForge</h1>
          <p className="text-xs text-muted-foreground hidden lg:block">Build your professional resume</p>
        </Link>
        <div className="flex gap-1 sm:gap-1.5 md:gap-2 items-center flex-shrink-0">
          <ThemeToggle />
          {isMobile && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="hover:scale-105 transition-transform px-2 sm:px-3"
            >
              {showPreview ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline text-xs sm:text-sm">Edit</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline text-xs sm:text-sm">Preview</span>
                </>
              )}
            </Button>
          )}

          {/* Customization Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-transform bg-transparent px-2 sm:px-3"
              >
                <Settings className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline text-xs sm:text-sm">Customize</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xl overflow-auto animate-slideDown">
              <SheetHeader>
                <SheetTitle>Customize Your Resume</SheetTitle>
                <SheetDescription>Choose template, adjust styling, and track quality score</SheetDescription>
              </SheetHeader>

              <Tabs defaultValue="template" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="template" className="text-xs md:text-sm">
                    <Layout className="w-4 h-4 mr-1 md:mr-2" />
                    <span className="hidden sm:inline">Template</span>
                    <span className="sm:hidden">Tmpl</span>
                  </TabsTrigger>
                  <TabsTrigger value="style" className="text-xs md:text-sm">
                    <Settings className="w-4 h-4 mr-1 md:mr-2" />
                    Style
                  </TabsTrigger>
                  <TabsTrigger value="quality" className="text-xs md:text-sm">
                    Quality
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="template" className="mt-0">
                  <TemplateSelector
                    selectedTemplateId={state.customization.templateId}
                    onChange={(templateId) =>
                      updateCustomization({
                        ...state.customization,
                        templateId,
                      })
                    }
                  />
                </TabsContent>

                <TabsContent value="style" className="mt-0">
                  <CustomizationPanel settings={state.customization} onChange={updateCustomization} />
                </TabsContent>

                <TabsContent value="quality" className="mt-0">
                  <QualityIndicator data={state.data} />
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>

          <PDFExportDialog data={state.data} />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Editor Panel */}
        {(!isMobile || !showPreview) && (
          <div className="w-full lg:w-1/2 xl:w-2/5 border-r overflow-auto animate-fadeIn">
            <div className="p-3 md:p-4 lg:p-6">
              <ResumeEditor state={state} onChange={setState} />
            </div>
          </div>
        )}

        <div
          className={`w-full lg:w-1/2 xl:w-3/5 bg-gray-50 overflow-auto ${isMobile && !showPreview ? "hidden" : "animate-fadeIn"}`}
        >
          <div
            className={`
            ${isMobile ? "p-0" : "p-2 sm:p-3 md:p-6 lg:p-8"}
            flex items-start justify-center min-h-full
          `}
          >
            <div
              className={`
                bg-white shadow-lg print:shadow-none print:max-w-none
                ${isMobile ? "w-full" : "w-full max-w-[8.5in]"}
              `}
              data-resume-preview="true"
              style={{
                backgroundColor: "white",
                ...(isMobile && showPreview
                  ? {
                      width: "100%",
                      maxWidth: "100%",
                      minHeight: "100vh",
                      margin: 0,
                      padding: 0,
                      boxSizing: "border-box",
                    }
                  : {}),
              }}
            >
              <ResumeRenderer data={state.data} customization={state.customization} />
            </div>
          </div>
        </div>
      </div>

      {isMobile && (
        <div className="border-t bg-background p-2 flex gap-2 flex-shrink-0 safe-area-inset-bottom animate-slideUp">
          <Button
            variant={!showPreview ? "default" : "outline"}
            size="sm"
            onClick={() => setShowPreview(false)}
            className="flex-1 hover:scale-105 transition-transform"
          >
            Edit Content
          </Button>
          <Button
            variant={showPreview ? "default" : "outline"}
            size="sm"
            onClick={() => setShowPreview(true)}
            className="flex-1 hover:scale-105 transition-transform"
          >
            View Preview
          </Button>
        </div>
      )}
    </div>
  )
}
