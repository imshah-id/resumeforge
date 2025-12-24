"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface AdSenseAdProps {
  adSlot: string
  adFormat?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal"
  adLayout?: string
  className?: string
  style?: React.CSSProperties
}

export function AdSenseAd({ adSlot, adFormat = "auto", adLayout, className, style }: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      // Push ad to AdSense queue
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error("[v0] AdSense error:", error)
    }
  }, [])

  return (
    <div ref={adRef} className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-XXXXXXXXXXXXXXXX"}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive="true"
      ></ins>
    </div>
  )
}
