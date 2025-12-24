"use client"

import { AdSenseAd } from "./adsense-ad"
import { Card } from "@/components/ui/card"

export function SidebarAd() {
  return (
    <Card className="p-4 hidden lg:block sticky top-4">
      <p className="text-xs text-muted-foreground mb-2 text-center">Advertisement</p>
      <AdSenseAd
        adSlot="1234567890" // Replace with actual ad slot ID
        adFormat="vertical"
        style={{ minHeight: "250px" }}
      />
    </Card>
  )
}
