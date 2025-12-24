"use client"

import { AdSenseAd } from "./adsense-ad"
import { Card } from "@/components/ui/card"

interface InlineAdProps {
  className?: string
}

export function InlineAd({ className }: InlineAdProps) {
  return (
    <Card className={`p-4 my-8 ${className}`}>
      <p className="text-xs text-muted-foreground mb-2 text-center">Advertisement</p>
      <AdSenseAd adSlot="1122334455" adFormat="rectangle" style={{ minHeight: "250px" }} />
    </Card>
  )
}
