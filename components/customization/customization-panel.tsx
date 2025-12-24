"use client"

import type { CustomizationSettings } from "@/lib/types/resume"
import {
  FONT_FAMILIES,
  FONT_SIZES,
  LINE_HEIGHTS,
  SECTION_SPACING,
  MARGIN_SIZES,
  ACCENT_COLORS,
  BULLET_STYLES,
} from "@/lib/constants/customization"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

interface CustomizationPanelProps {
  settings: CustomizationSettings
  onChange: (settings: CustomizationSettings) => void
}

export function CustomizationPanel({ settings, onChange }: CustomizationPanelProps) {
  const updateSetting = <K extends keyof CustomizationSettings>(key: K, value: CustomizationSettings[K]) => {
    onChange({ ...settings, [key]: value })
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Customize Resume</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Adjust typography, colors, and spacing to match your style while keeping your resume ATS-safe.
        </p>
      </div>

      <Separator />

      {/* Font Family */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Font Family</Label>
        <Select value={settings.fontFamily} onValueChange={(value) => updateSetting("fontFamily", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_FAMILIES.map((font) => (
              <SelectItem key={font.id} value={font.id}>
                {font.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Font Size */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Font Size</Label>
        <RadioGroup
          value={settings.fontSize.toString()}
          onValueChange={(value) => updateSetting("fontSize", Number.parseInt(value))}
        >
          {FONT_SIZES.map((size) => (
            <div key={size.id} className="flex items-center space-x-2">
              <RadioGroupItem value={size.value.toString()} id={`font-${size.id}`} />
              <Label htmlFor={`font-${size.id}`} className="text-sm font-normal cursor-pointer">
                {size.name} ({size.description})
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Line Height */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Line Height</Label>
        <RadioGroup
          value={settings.lineHeight.toString()}
          onValueChange={(value) => updateSetting("lineHeight", Number.parseFloat(value))}
        >
          {LINE_HEIGHTS.map((lh) => (
            <div key={lh.id} className="flex items-center space-x-2">
              <RadioGroupItem value={lh.value.toString()} id={`lh-${lh.id}`} />
              <Label htmlFor={`lh-${lh.id}`} className="text-sm font-normal cursor-pointer">
                {lh.name} ({lh.value})
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Section Spacing */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Section Spacing</Label>
        <RadioGroup
          value={settings.sectionSpacing.toString()}
          onValueChange={(value) => updateSetting("sectionSpacing", Number.parseInt(value))}
        >
          {SECTION_SPACING.map((spacing) => (
            <div key={spacing.id} className="flex items-center space-x-2">
              <RadioGroupItem value={spacing.value.toString()} id={`spacing-${spacing.id}`} />
              <Label htmlFor={`spacing-${spacing.id}`} className="text-sm font-normal cursor-pointer">
                {spacing.name} ({spacing.value}px)
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Margin Size */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Page Margins</Label>
        <RadioGroup value={settings.marginSize} onValueChange={(value) => updateSetting("marginSize", value)}>
          {MARGIN_SIZES.map((margin) => (
            <div key={margin.id} className="flex items-center space-x-2">
              <RadioGroupItem value={margin.id} id={`margin-${margin.id}`} />
              <Label htmlFor={`margin-${margin.id}`} className="text-sm font-normal cursor-pointer">
                {margin.name} ({margin.value})
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Accent Color */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Accent Color</Label>
        <div className="grid grid-cols-4 gap-2">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => updateSetting("accentColor", color.value)}
              className="relative h-12 rounded-md border-2 transition-all hover:scale-105"
              style={{
                backgroundColor: color.value,
                borderColor: settings.accentColor === color.value ? "#000" : "transparent",
              }}
              title={color.name}
            >
              {settings.accentColor === color.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bullet Style */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Bullet Style</Label>
        <RadioGroup value={settings.bulletStyle} onValueChange={(value) => updateSetting("bulletStyle", value)}>
          {BULLET_STYLES.map((bullet) => (
            <div key={bullet.id} className="flex items-center space-x-2">
              <RadioGroupItem value={bullet.id} id={`bullet-${bullet.id}`} />
              <Label htmlFor={`bullet-${bullet.id}`} className="text-sm font-normal cursor-pointer">
                {bullet.name} <span className="ml-2 text-lg">{bullet.symbol}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
