"use client"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, Search, Shuffle, Star } from "lucide-react"

export function BottomNavigation() {
  return (
    <TabsList className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md grid grid-cols-4 bg-white/95 backdrop-blur-sm border-t border-amber-200 rounded-none h-16 p-1">
      <TabsTrigger
        value="songs"
        className="flex flex-col items-center justify-center gap-1 text-amber-700 data-[state=active]:text-amber-900 data-[state=active]:bg-amber-100 rounded-lg h-full"
      >
        <Music className="w-4 h-4" />
        <span className="text-xs">楽曲一覧</span>
      </TabsTrigger>
      <TabsTrigger
        value="search"
        className="flex flex-col items-center justify-center gap-1 text-amber-700 data-[state=active]:text-amber-900 data-[state=active]:bg-amber-100 rounded-lg h-full"
      >
        <Search className="w-4 h-4" />
        <span className="text-xs">楽曲検索</span>
      </TabsTrigger>
      <TabsTrigger
        value="random"
        className="flex flex-col items-center justify-center gap-1 text-amber-700 data-[state=active]:text-amber-900 data-[state=active]:bg-amber-100 rounded-lg h-full"
      >
        <Shuffle className="w-4 h-4" />
        <span className="text-xs">ランダム</span>
      </TabsTrigger>
      <TabsTrigger
        value="stats"
        className="flex flex-col items-center justify-center gap-1 text-amber-700 data-[state=active]:text-amber-900 data-[state=active]:bg-amber-100 rounded-lg h-full"
      >
        <Star className="w-4 h-4" />
        <span className="text-xs">統計</span>
      </TabsTrigger>
    </TabsList>
  )
}
