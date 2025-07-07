"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shuffle, Star, Zap, Activity, Target, Cpu } from "lucide-react"
import type { Song } from "@/types"
import { TAGS } from "@/constants"
import { keyToString } from "@/utils/keyUtils"

interface RandomPageProps {
  songs: Song[]
}

export function RandomPage({ songs }: RandomPageProps) {
  const [randomTagFilter, setRandomTagFilter] = useState("all")
  const [randomSong, setRandomSong] = useState<Song | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleRandomSelect = async () => {
    setIsGenerating(true)

    // SAO風のランダム生成アニメーション
    await new Promise((resolve) => setTimeout(resolve, 1500))

    let filteredSongs = songs
    if (randomTagFilter !== "all") {
      filteredSongs = songs.filter((song) => song.tags.some((tag) => tag.name === randomTagFilter))
    }

    if (filteredSongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredSongs.length)
      setRandomSong(filteredSongs[randomIndex])
    }

    setIsGenerating(false)
  }

  return (
    <div className="space-y-6">
      {/* Random Generator Header */}
      <Card className="sao-panel border-2 border-sao-cyan-500/40">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-3 text-sao-cyan-300 text-xl font-semibold">
            <div className="p-2 rounded-full bg-sao-purple-500/20 border border-sao-purple-400/30 animate-glow-pulse">
              <Cpu className="w-6 h-6 text-sao-purple-400" />
            </div>
            NEURAL SONG SELECTOR
          </CardTitle>
          <div className="flex items-center justify-center gap-2 text-sao-cyan-400/70 text-sm">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>QUANTUM RANDOMIZATION ALGORITHM</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filter Selection */}
          <div className="space-y-3">
            <Label className="text-sao-cyan-300 text-sm font-medium tracking-wide flex items-center gap-2">
              <Target className="w-4 h-4" />
              TARGET FILTER
            </Label>
            <Select value={randomTagFilter} onValueChange={setRandomTagFilter}>
              <SelectTrigger className="sao-input h-11 text-sao-cyan-200">
                <SelectValue placeholder="Select filter criteria" />
              </SelectTrigger>
              <SelectContent className="sao-panel border-sao-cyan-500/30">
                <SelectItem value="all" className="text-sao-cyan-200 hover:bg-sao-cyan-500/20">
                  All Songs (No Filter)
                </SelectItem>
                {TAGS.map((tag) => (
                  <SelectItem key={tag} value={tag} className="text-sao-cyan-200 hover:bg-sao-cyan-500/20">
                    {tag} Only
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleRandomSelect}
            disabled={isGenerating || songs.length === 0}
            className="w-full h-14 bg-gradient-to-r from-sao-purple-600 to-sao-blue-600 hover:from-sao-purple-500 hover:to-sao-blue-500 text-white font-semibold border border-sao-purple-400/50 shadow-lg shadow-sao-purple-500/30 hover:shadow-xl hover:shadow-sao-purple-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-base"
          >
            {isGenerating ? (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>PROCESSING NEURAL PATTERNS...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Shuffle className="w-5 h-5" />
                <span>
                  {randomTagFilter === "all"
                    ? "GENERATE RANDOM SELECTION"
                    : `GENERATE FROM ${randomTagFilter.toUpperCase()}`}
                </span>
                <Zap className="w-5 h-5" />
              </div>
            )}
          </Button>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sao-cyan-500/20">
            <div className="text-center">
              <div className="text-lg font-bold text-sao-cyan-300">{songs.length}</div>
              <div className="text-xs text-sao-cyan-400/70">TOTAL SONGS</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-sao-purple-300">
                {randomTagFilter === "all"
                  ? songs.length
                  : songs.filter((song) => song.tags.some((tag) => tag.name === randomTagFilter)).length}
              </div>
              <div className="text-xs text-sao-cyan-400/70">FILTERED</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Song Result */}
      {randomSong && (
        <Card className="sao-panel border-2 border-sao-purple-500/40 animate-fade-in-up">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-sao-purple-300 text-lg">
              <div className="w-3 h-3 bg-sao-purple-400 rounded-full animate-pulse"></div>
              NEURAL SELECTION RESULT
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              {/* Album Art */}
              <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-sao-purple-500/30 shadow-lg shadow-sao-purple-500/20 flex-shrink-0 relative group">
                <img
                  src={randomSong.jacket || "/placeholder.svg"}
                  alt={`${randomSong.title} ジャケット`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-sao-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Song Info */}
              <div className="flex-1 text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-xl font-bold text-sao-cyan-300">{randomSong.title}</h3>
                  {randomSong.isFavorite && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
                </div>
                <p className="text-lg text-sao-cyan-400">{randomSong.artist}</p>

                {/* Stats */}
                <div className="flex justify-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-sao-cyan-400" />
                    <span className="text-sao-cyan-300">
                      Key: <span className="text-sao-cyan-200 font-medium">{keyToString(randomSong.key)}</span>
                    </span>
                  </div>
                  {randomSong.score && (
                    <div className="flex items-center gap-1">
                      <Activity className="w-4 h-4 text-sao-blue-400" />
                      <span className="text-sao-cyan-300">
                        Score: <span className="text-sao-blue-300 font-medium">{randomSong.score}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {randomSong.tags && randomSong.tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {randomSong.tags.map((tag) => (
                      <Badge
                        key={tag.name}
                        variant="outline"
                        className={`text-xs transition-colors duration-300 ${
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
                  </div>
                )}

                {/* Memo */}
                {randomSong.memo && (
                  <div className="mt-4 p-3 sao-panel border border-sao-cyan-500/20">
                    <p className="text-sm text-sao-cyan-400/80 italic">"{randomSong.memo}"</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {songs.length === 0 && (
        <Card className="sao-panel border border-sao-cyan-500/20">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sao-cyan-500/10 flex items-center justify-center">
              <Shuffle className="w-8 h-8 text-sao-cyan-400/50" />
            </div>
            <h3 className="text-lg font-semibold text-sao-cyan-300 mb-2">No Songs Available</h3>
            <p className="text-sao-cyan-400/70 text-sm">Add some songs to your library to use the random selector</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
