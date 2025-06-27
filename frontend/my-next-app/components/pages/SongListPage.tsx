"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, SortAsc } from "lucide-react"
import { SongCard } from "@/components/SongCard"
import { SongForm } from "@/components/SongForm"
import type { Song } from "@/types"
import { CATEGORIES, TAGS } from "@/constants"

interface SongListPageProps {
  songs: Song[]
  onSongSelect: (song: Song) => void
  onToggleFavorite: (songId: number, event: React.MouseEvent) => void
  onAddSong: (song: Omit<Song, "id">) => void
}

export function SongListPage({ songs, onSongSelect, onToggleFavorite, onAddSong }: SongListPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterTag, setFilterTag] = useState("all")
  const [sortBy, setSortBy] = useState("title")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // フィルタリングとソート
  const filteredAndSortedSongs = songs
    .filter((song) => {
      const matchesSearch =
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filterCategory === "all" || song.category === filterCategory
      const matchesTag = filterTag === "all" || song.tags.includes(filterTag)
      return matchesSearch && matchesCategory && matchesTag
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "artist":
          return a.artist.localeCompare(b.artist)
        case "score":
          return (b.score || 0) - (a.score || 0)
        default:
          return 0
      }
    })

  const handleAddSong = (songData: Omit<Song, "id">) => {
    onAddSong(songData)
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      {/* 検索・フィルタ */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
          <Input
            placeholder="曲名・アーティストで検索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 backdrop-blur-sm border-amber-300 focus:border-amber-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-white/80 backdrop-blur-sm border-amber-300 focus:border-amber-500">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue placeholder="並び順" />
            </SelectTrigger>
            <SelectContent className="bg-white border-amber-300">
              <SelectItem value="title">曲名順</SelectItem>
              <SelectItem value="artist">アーティスト順</SelectItem>
              <SelectItem value="score">点数順</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="bg-white/80 backdrop-blur-sm border-amber-300 focus:border-amber-500">
              <SelectValue placeholder="カテゴリ" />
            </SelectTrigger>
            <SelectContent className="bg-white border-amber-300">
              <SelectItem value="all">すべて</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Select value={filterTag} onValueChange={setFilterTag}>
            <SelectTrigger className="bg-white/80 backdrop-blur-sm border-amber-300 focus:border-amber-500">
              <SelectValue placeholder="タグ" />
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
      </div>

      {/* 楽曲追加ボタン */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md">
            <Plus className="w-4 h-4 mr-2" />
            楽曲を追加
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm mx-auto bg-white border-amber-300 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-amber-900">新しい楽曲を追加</DialogTitle>
          </DialogHeader>
          <SongForm onSave={handleAddSong} onCancel={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* 楽曲リスト */}
      <div className="space-y-3">
        {filteredAndSortedSongs.map((song) => (
          <SongCard key={song.id} song={song} onToggleFavorite={onToggleFavorite} onClick={() => onSongSelect(song)} />
        ))}
      </div>
    </div>
  )
}
