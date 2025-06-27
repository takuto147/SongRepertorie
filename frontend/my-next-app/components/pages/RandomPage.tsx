"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shuffle, Star } from "lucide-react"
import type { Song } from "@/types"
import { TAGS } from "@/constants"
import { keyToString } from "@/utils/keyUtils"

interface RandomPageProps {
  songs: Song[]
}

export function RandomPage({ songs }: RandomPageProps) {
  const [randomTagFilter, setRandomTagFilter] = useState("all")
  const [randomSong, setRandomSong] = useState<Song | null>(null)

  const handleRandomSelect = () => {
    let filteredSongs = songs
    if (randomTagFilter !== "all") {
      filteredSongs = songs.filter((song) => song.tags.includes(randomTagFilter))
    }

    if (filteredSongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredSongs.length)
      setRandomSong(filteredSongs[randomIndex])
    }
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-amber-900">
          <Shuffle className="w-5 h-5" />
          ランダム選曲
        </CardTitle>
        <p className="text-amber-700">迷った時はお任せ！登録した楽曲からランダムに選びます</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* タグフィルタ */}
        <div className="space-y-2">
          <Label className="text-amber-800">タグで絞り込み</Label>
          <Select value={randomTagFilter} onValueChange={setRandomTagFilter}>
            <SelectTrigger className="bg-white border-amber-300 focus:border-amber-500">
              <SelectValue placeholder="タグを選択" />
            </SelectTrigger>
            <SelectContent className="bg-white border-amber-300">
              <SelectItem value="all">すべて</SelectItem>
              {TAGS.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleRandomSelect}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md"
          size="lg"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          {randomTagFilter === "all" ? "ランダムに選ぶ" : `${randomTagFilter}からランダムに選ぶ`}
        </Button>

        {randomSong && (
          <Card className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                  <img
                    src={randomSong.jacket || "/placeholder.svg"}
                    alt={`${randomSong.title} ジャケット`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-xl font-bold text-amber-900">{randomSong.title}</h3>
                    {randomSong.isFavorite && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                  </div>
                  <p className="text-lg text-amber-700">{randomSong.artist}</p>
                  <div className="flex justify-center gap-4 text-sm">
                    <span className="text-amber-600">
                      キー: <span className="text-amber-800 font-medium">{keyToString(randomSong.key)}</span>
                    </span>
                    {randomSong.score && (
                      <span className="text-amber-600">
                        点数: <span className="text-blue-700 font-medium">{randomSong.score}点</span>
                      </span>
                    )}
                  </div>
                  {/* タグ表示 */}
                  {randomSong.tags && randomSong.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1">
                      {randomSong.tags.map((tag) => (
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
                    </div>
                  )}
                  {randomSong.memo && <p className="text-sm text-amber-600 mt-2">{randomSong.memo}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
