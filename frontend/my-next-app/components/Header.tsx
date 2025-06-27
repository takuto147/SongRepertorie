"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Star } from "lucide-react"
import type { Song } from "@/types"

interface HeaderProps {
  title: string
  onBack: () => void
  song?: Song | null
  onToggleFavorite?: (songId: number) => void
}

export function Header({ title, onBack, song, onToggleFavorite }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-amber-200">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-bold text-amber-900">{title}</h1>
        </div>
        {song && onToggleFavorite && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(song.id)}
              className={`${
                song.isFavorite ? "text-yellow-500 hover:text-yellow-600" : "text-gray-400 hover:text-yellow-500"
              } hover:bg-amber-100`}
            >
              <Star className={`w-5 h-5 ${song.isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
