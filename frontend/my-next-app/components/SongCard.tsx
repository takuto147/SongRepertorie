"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
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
      className="hover:shadow-lg transition-all cursor-pointer bg-white/90 backdrop-blur-sm border-amber-200 hover:bg-white hover:border-amber-300 overflow-hidden relative"
      onClick={onClick}
    >
      {/* お気に入りボタン */}
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => onToggleFavorite(song.id, e)}
        className={`absolute top-2 right-2 z-20 p-2 rounded-full ${
          song.isFavorite
            ? "text-yellow-500 hover:text-yellow-600 bg-white/80 hover:bg-white/90"
            : "text-gray-400 hover:text-yellow-500 bg-white/60 hover:bg-white/80"
        } shadow-sm`}
      >
        <Star className={`w-5 h-5 ${song.isFavorite ? "fill-current" : ""}`} />
      </Button>

      <div className="relative">
        {/* ジャケット背景 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${song.jacket})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent" />

        <CardContent className="p-4 relative z-10">
          <div className="flex items-center gap-4">
            {/* ジャケット画像 */}
            <div className="w-16 h-16 rounded-lg overflow-hidden shadow-md flex-shrink-0">
              <img
                src={song.jacket || "/placeholder.svg"}
                alt={`${song.title} ジャケット`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0 pr-8">
              <div className="mb-2">
                <h3 className="font-semibold text-lg text-amber-900 truncate">{song.title}</h3>
                <p className="text-amber-700 truncate">{song.artist}</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-amber-600 mb-2">
                <span>
                  キー: <span className="text-amber-800 font-medium">{keyToString(song.key)}</span>
                </span>
                {song.score && (
                  <span>
                    点数: <span className="text-blue-700 font-medium">{song.score}点</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-amber-600 mb-2">
                <span>
                  <span className="text-purple-700 font-medium">{song.category}</span>
                </span>
                <span>
                  <span className="text-indigo-700 font-medium">{song.machine}</span>
                </span>
              </div>

              {/* タグ表示 */}
              {song.tags && song.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {song.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`text-xs ${
                        tag === "得意曲"
                          ? "border-green-400 text-green-700 bg-green-50"
                          : tag === "練習中"
                            ? "border-blue-400 text-blue-700 bg-blue-50"
                            : "border-amber-400 text-amber-700"
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {song.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs border-amber-400 text-amber-700">
                      +{song.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              {song.memo && <p className="text-sm text-amber-600 truncate">{song.memo}</p>}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
