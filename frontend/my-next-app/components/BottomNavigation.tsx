"use client"

import { Music, Search, Shuffle, BarChart3 } from "lucide-react"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "songs", label: "LIBRARY", icon: Music },
    { id: "search", label: "SEARCH", icon: Search },
    { id: "random", label: "RANDOM", icon: Shuffle },
    { id: "stats", label: "STATS", icon: BarChart3 },
  ]

  return (
    <div
      className="fixed bottom-0 z-50 w-full max-w-md"
      style={{
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "448px", // max-w-md = 28rem = 448px
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-sao-cyan-500/20 to-transparent blur-xl pointer-events-none"></div>

      {/* Navigation Container */}
      <div className="relative z-10 w-full grid grid-cols-4 sao-panel border-t-2 border-sao-cyan-500/40 rounded-none rounded-t-xl h-20 p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 rounded-lg h-full border transition-colors duration-300 ${
                isActive
                  ? "text-sao-cyan-300 bg-sao-cyan-500/20 border-sao-cyan-400/30"
                  : "text-sao-cyan-400 border-transparent hover:bg-sao-cyan-500/10"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-sao-cyan-400 to-transparent pointer-events-none"></div>
    </div>
  )
}
