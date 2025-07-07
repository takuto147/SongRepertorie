"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Star, Trophy, Music, Target } from "lucide-react"
import type { Song } from "@/types"

interface StatsPageProps {
  songs: Song[]
}

export function StatsPage({ songs }: StatsPageProps) {
  const favoriteCount = songs.filter((s) => s.isFavorite).length
  const expertCount = songs.filter((s) => s.tags.some((tag) => tag.name === "得意曲")).length
  const practiceCount = songs.filter((s) => s.tags.some((tag) => tag.name === "練習中")).length
  const averageScore =
    songs.filter((s) => s.score).length > 0
      ? Math.round(
          songs.filter((s) => s.score).reduce((sum, s) => sum + (s.score || 0), 0) /
            songs.filter((s) => s.score).length,
        )
      : 0

  const artistCounts = songs.reduce(
    (acc, song) => {
      acc[song.artist] = (acc[song.artist] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topArtists = Object.entries(artistCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const categoryCounts = songs.reduce(
    (acc, song) => {
      acc[song.category] = (acc[song.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  const highScoreSongs = songs
    .filter((s) => s.score && s.score >= 85)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <Card className="sao-panel border-2 border-sao-cyan-500/40">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-3 text-sao-cyan-300 text-xl font-semibold">
            <div className="p-2 rounded-full bg-sao-blue-500/20 border border-sao-blue-400/30 animate-glow-pulse">
              <BarChart3 className="w-6 h-6 text-sao-blue-400" />
            </div>
            NEURAL ANALYTICS DASHBOARD
          </CardTitle>
          <div className="flex items-center justify-center gap-2 text-sao-cyan-400/70 text-sm">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>REAL-TIME DATA ANALYSIS</span>
          </div>
        </CardHeader>
      </Card>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="sao-card group hover:scale-105 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Music className="w-5 h-5 text-sao-cyan-400 mr-2" />
              <div className="text-2xl font-bold text-sao-cyan-300">{songs.length}</div>
            </div>
            <div className="text-xs text-sao-cyan-400/70 tracking-wide">TOTAL SONGS</div>
            <div className="mt-2 h-1 bg-sao-cyan-500/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sao-cyan-500 to-sao-blue-500 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        <Card className="sao-card group hover:scale-105 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <div className="text-2xl font-bold text-yellow-300">{favoriteCount}</div>
            </div>
            <div className="text-xs text-sao-cyan-400/70 tracking-wide">FAVORITES</div>
            <div className="mt-2 h-1 bg-yellow-500/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-1000"
                style={{ width: `${songs.length > 0 ? (favoriteCount / songs.length) * 100 : 0}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="sao-card group hover:scale-105 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-5 h-5 text-green-400 mr-2" />
              <div className="text-2xl font-bold text-green-300">{expertCount}</div>
            </div>
            <div className="text-xs text-sao-cyan-400/70 tracking-wide">EXPERT LEVEL</div>
            <div className="mt-2 h-1 bg-green-500/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000"
                style={{ width: `${songs.length > 0 ? (expertCount / songs.length) * 100 : 0}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="sao-card group hover:scale-105 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-5 h-5 text-sao-blue-400 mr-2" />
              <div className="text-2xl font-bold text-sao-blue-300">{averageScore}</div>
            </div>
            <div className="text-xs text-sao-cyan-400/70 tracking-wide">AVG SCORE</div>
            <div className="mt-2 h-1 bg-sao-blue-500/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sao-blue-500 to-sao-blue-400 rounded-full transition-all duration-1000"
                style={{ width: `${averageScore}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Artists */}
      <Card className="sao-panel border border-sao-cyan-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sao-cyan-300 text-lg">
            <div className="w-1 h-6 bg-gradient-to-b from-sao-cyan-400 to-sao-blue-400"></div>
            <TrendingUp className="w-5 h-5" />
            TOP ARTISTS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topArtists.length > 0 ? (
              topArtists.map(([artist, count], index) => (
                <div
                  key={artist}
                  className="flex justify-between items-center p-3 sao-panel border border-sao-cyan-500/20 hover:border-sao-cyan-400/40 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sao-cyan-500/20 to-sao-blue-500/20 border border-sao-cyan-400/30 flex items-center justify-center text-xs font-bold text-sao-cyan-300">
                      {index + 1}
                    </div>
                    <span className="text-sm text-sao-cyan-200 group-hover:text-sao-cyan-100 transition-colors duration-300">
                      {artist}
                    </span>
                  </div>
                  <Badge variant="outline" className="border-sao-cyan-400/50 text-sao-cyan-300 bg-sao-cyan-500/10">
                    {count} songs
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-sao-cyan-400/60">No data available</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Categories & High Scores */}
      <div className="grid grid-cols-1 gap-6">
        {/* Top Categories */}
        <Card className="sao-panel border border-sao-cyan-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sao-cyan-300 text-lg">
              <div className="w-1 h-6 bg-gradient-to-b from-sao-purple-400 to-sao-blue-400"></div>
              TOP CATEGORIES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {topCategories.map(([category, count]) => (
                <div
                  key={category}
                  className="text-center p-3 sao-panel border border-sao-purple-500/20 hover:border-sao-purple-400/40 transition-all duration-300"
                >
                  <div className="text-lg font-bold text-sao-purple-300">{count}</div>
                  <div className="text-xs text-sao-cyan-400/70">{category}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* High Score Songs */}
        {highScoreSongs.length > 0 && (
          <Card className="sao-panel border border-sao-cyan-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sao-cyan-300 text-lg">
                <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-400"></div>
                <Trophy className="w-5 h-5 text-yellow-400" />
                HIGH SCORE ACHIEVEMENTS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {highScoreSongs.map((song, index) => (
                  <div
                    key={song.id}
                    className="flex justify-between items-center p-3 sao-panel border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 flex items-center justify-center text-xs font-bold text-yellow-300">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-sm text-sao-cyan-200 group-hover:text-sao-cyan-100 transition-colors duration-300">
                          {song.title}
                        </div>
                        <div className="text-xs text-sao-cyan-400/70">{song.artist}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-yellow-400/50 text-yellow-300 bg-yellow-500/10">
                      {song.score} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="sao-panel border border-sao-cyan-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-lg font-bold text-orange-300">{practiceCount}</div>
            <div className="text-xs text-sao-cyan-400/70">PRACTICE MODE</div>
          </CardContent>
        </Card>
        <Card className="sao-panel border border-sao-cyan-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-lg font-bold text-purple-300">
              {songs.filter((s) => s.score && s.score >= 90).length}
            </div>
            <div className="text-xs text-sao-cyan-400/70">90+ SCORES</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
