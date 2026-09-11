"use client"

import React, { memo } from "react"

interface AuroraTextProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  speed?: number
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    colors = ["#58e8c7", "#22d3ee", "#0ea5e9", "#2563eb", "#f9a8d4"],
    speed = 1,
  }: AuroraTextProps) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
        colors[0]
      })`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`,
    }

    return (
      <span className={`relative inline-block ${className}`}>
        <span
          className="animate-aurora relative inline-block bg-size-[200%_auto] bg-clip-text text-transparent motion-reduce:animate-none"
          style={gradientStyle}
        >
          {children}
        </span>
      </span>
    )
  }
)

AuroraText.displayName = "AuroraText"
