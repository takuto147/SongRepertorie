"use client"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, Search, Shuffle, BarChart3 } from "lucide-react"

export function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-sao-cyan-500/20 to-transparent blur-xl"></div>

      <TabsList className="relative z-10 w-full grid grid-cols-4 sao-panel border-t-2 border-sao-cyan-500/40 rounded-none rounded-t-xl h-20 p-2">
        <TabsTrigger
          value="songs"
          className="flex flex-col items-center justify-center gap-1 text-sao-cyan-400 data-[state=active]:text-sao-cyan-300 data-[state=active]:bg-sao-cyan-500/20 rounded-lg h-full border border-transparent data-[state=active]:border-sao-cyan-400/30 transition-all duration-300 hover:bg-sao-cyan-500/10"
        >
          <Music className="w-5 h-5" />
          <span className="text-xs font-medium">LIBRARY</span>
        </TabsTrigger>
        <TabsTrigger
          value="search"
          className="flex flex-col items-center justify-center gap-1 text-sao-cyan-400 data-[state=active]:text-sao-cyan-300 data-[state=active]:bg-sao-cyan-500/20 rounded-lg h-full border border-transparent data-[state=active]:border-sao-cyan-400/30 transition-all duration-300 hover:bg-sao-cyan-500/10"
        >
          <Search className="w-5 h-5" />
          <span className="text-xs font-medium">SEARCH</span>
        </TabsTrigger>
        <TabsTrigger
          value="random"
          className="flex flex-col items-center justify-center gap-1 text-sao-cyan-400 data-[state=active]:text-sao-cyan-300 data-[state=active]:bg-sao-cyan-500/20 rounded-lg h-full border border-transparent data-[state=active]:border-sao-cyan-400/30 transition-all duration-300 hover:bg-sao-cyan-500/10"
        >
          <Shuffle className="w-5 h-5" />
          <span className="text-xs font-medium">RANDOM</span>
        </TabsTrigger>
        <TabsTrigger
          value="stats"
          className="flex flex-col items-center justify-center gap-1 text-sao-cyan-400 data-[state=active]:text-sao-cyan-300 data-[state=active]:bg-sao-cyan-500/20 rounded-lg h-full border border-transparent data-[state=active]:border-sao-cyan-400/30 transition-all duration-300 hover:bg-sao-cyan-500/10"
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-xs font-medium">STATS</span>
        </TabsTrigger>
      </TabsList>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-sao-cyan-400 to-transparent"></div>
    </div>
  )
}
