"use client"

import { AdSenseAd } from "./adsense-ad"

export function MobileBottomAd() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50 print:hidden">
      <p className="text-xs text-muted-foreground text-center pt-1">Advertisement</p>
      <AdSenseAd
        adSlot="0987654321" // Replace with actual ad slot ID
        adFormat="horizontal"
        style={{ minHeight: "50px", maxHeight: "100px" }}
      />
    </div>
  )
}
