"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, Activity } from "lucide-react"
import type { Song } from "@/types"

interface HeaderProps {
  title: string
  onBack: () => void
  song?: Song | null
  onToggleFavorite?: (songId: number) => void
}

export function Header({ title, onBack, song, onToggleFavorite }: HeaderProps) {
  return (
    <header className="sao-panel border-b-2 border-sao-cyan-500/30 relative overflow-hidden">
      {/* Scan line effect */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sao-cyan-400 to-transparent animate-pulse"></div>

      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-sao-cyan-400 hover:text-sao-cyan-300 hover:bg-sao-cyan-500/10 border border-sao-cyan-500/30 rounded-lg p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-sao-cyan-300 tracking-wide">{title}</h1>
            <div className="flex items-center gap-2 text-xs text-sao-cyan-400/60">
              <Activity className="w-3 h-3" />
              <span>NEURAL LINK ACTIVE</span>
            </div>
          </div>
        </div>

        {song && onToggleFavorite && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(song.id)}
              className={`${
                song.isFavorite
                  ? "text-yellow-400 hover:text-yellow-300 bg-yellow-500/10 border-yellow-400/30"
                  : "text-sao-cyan-400 hover:text-yellow-400 border-sao-cyan-500/30"
              } border rounded-lg p-2 transition-all duration-300`}
            >
              <Star className={`w-5 h-5 ${song.isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
        )}
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sao-cyan-500 to-transparent"></div>
    </header>
  )
}
