"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Song } from "@/types"

interface StatsPageProps {
  songs: Song[]
}

export function StatsPage({ songs }: StatsPageProps) {
  const favoriteCount = songs.filter((s) => s.isFavorite).length
  const expertCount = songs.filter((s) => s.tags.includes("得意曲")).length
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-700">{songs.length}</div>
            <div className="text-sm text-amber-600">登録楽曲数</div>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{favoriteCount}</div>
            <div className="text-sm text-amber-600">お気に入り</div>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{expertCount}</div>
            <div className="text-sm text-amber-600">得意曲</div>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{averageScore}</div>
            <div className="text-sm text-amber-600">平均点数</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-amber-900">よく歌うアーティスト</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topArtists.map(([artist, count]) => (
              <div key={artist} className="flex justify-between items-center">
                <span className="text-sm text-amber-800">{artist}</span>
                <Badge variant="outline" className="border-amber-400 text-amber-700">
                  {count}曲
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
