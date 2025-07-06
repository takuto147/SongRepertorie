"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, Activity, Music } from "lucide-react"
import type { Song } from "@/types"
import { keyToString } from "@/utils/keyUtils"

interface SongCardProps {
  song: Song
  onToggleFavorite: (songId: number, event: React.MouseEvent) => void
  onClick: () => void
}

export function SongCard({ song, onToggleFavorite, onClick }: SongCardProps) {
  return (
    <Card
      className="sao-card hover:scale-[1.02] cursor-pointer group relative overflow-hidden animate-fade-in-up"
      onClick={onClick}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-sao-cyan-500/0 via-sao-cyan-500/5 to-sao-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Favorite button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => onToggleFavorite(song.id, e)}
        className={`absolute top-3 right-3 z-20 p-2 rounded-lg border transition-all duration-300 ${
          song.isFavorite
            ? "text-yellow-400 bg-yellow-500/20 border-yellow-400/50 hover:bg-yellow-500/30"
            : "text-sao-cyan-400 bg-sao-cyan-500/10 border-sao-cyan-500/30 hover:bg-sao-cyan-500/20 hover:text-yellow-400"
        }`}
      >
        <Star className={`w-4 h-4 ${song.isFavorite ? "fill-current" : ""}`} />
      </Button>

      <CardContent className="p-4 relative z-10">
        <div className="flex items-center gap-4">
          {/* Album Art */}
          <div className="w-16 h-16 rounded-lg overflow-hidden border border-sao-cyan-500/30 flex-shrink-0 relative group">
            <img
              src={song.jacket || "/placeholder.svg"}
              alt={`${song.title} ジャケット`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-sao-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Music className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
          </div>

          <div className="flex-1 min-w-0 pr-8">
            <div className="mb-3">
              <h3 className="font-semibold text-lg text-sao-cyan-300 truncate group-hover:text-sao-cyan-200 transition-colors duration-300">
                {song.title}
              </h3>
              <p className="text-sao-cyan-400/80 truncate">{song.artist}</p>
            </div>

            <div className="flex items-center gap-4 text-sm mb-3">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-sao-cyan-400" />
                <span className="text-sao-cyan-300">
                  Key: <span className="text-sao-cyan-200 font-medium">{keyToString(song.key)}</span>
                </span>
              </div>
              {song.score && (
                <div className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-sao-blue-400" />
                  <span className="text-sao-cyan-300">
                    Score: <span className="text-sao-blue-300 font-medium">{song.score}</span>
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm mb-3">
              <Badge
                variant="outline"
                className="border-sao-purple-400/50 text-sao-purple-300 bg-sao-purple-500/10 text-xs"
              >
                {song.category}
              </Badge>
              <Badge variant="outline" className="border-sao-blue-400/50 text-sao-blue-300 bg-sao-blue-500/10 text-xs">
                {song.machine}
              </Badge>
            </div>

            {/* Tags */}
            {song.tags && song.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {song.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className={`text-xs border transition-colors duration-300 ${
                      tag.name === "得意曲"
                        ? "border-green-400/50 text-green-300 bg-green-500/10"
                        : tag.name === "練習中"
                          ? "border-blue-400/50 text-blue-300 bg-blue-500/10"
                          : "border-sao-cyan-400/50 text-sao-cyan-300 bg-sao-cyan-500/10"
                    }`}
                  >
                    {tag.name}
                  </Badge>
                ))}
                {song.tags.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-xs border-sao-cyan-400/50 text-sao-cyan-300 bg-sao-cyan-500/10"
                  >
                    +{song.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {song.memo && <p className="text-sm text-sao-cyan-400/70 truncate italic">"{song.memo}"</p>}
          </div>
        </div>
      </CardContent>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-sao-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Card>
  )
}
