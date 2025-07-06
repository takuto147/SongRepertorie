"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, SortAsc, Filter, Zap } from "lucide-react"
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
    <div className="space-y-6">
      {/* Search & Filter Panel */}
      <div className="sao-panel p-4 space-y-4 border border-sao-cyan-500/30">
        {/* Header */}
        <div className="flex items-center gap-2 pb-2 border-b border-sao-cyan-500/20">
          <Filter className="w-4 h-4 text-sao-cyan-400" />
          <span className="text-sm font-medium text-sao-cyan-300 tracking-wide">SEARCH & FILTER</span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sao-cyan-400 w-4 h-4" />
          <Input
            placeholder="Search songs or artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 sao-input h-11 text-sao-cyan-200 placeholder-sao-cyan-400/50"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs text-sao-cyan-400/80 font-medium tracking-wide">SORT BY</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="sao-input h-10 text-sao-cyan-200 border-sao-cyan-500/30">
                <SortAsc className="w-4 h-4 mr-2 text-sao-cyan-400" />
                <SelectValue placeholder="Sort order" />
              </SelectTrigger>
              <SelectContent className="sao-panel border-sao-cyan-500/30">
                <SelectItem value="title" className="text-sao-cyan-200 hover:bg-sao-cyan-500/20">
                  Title
                </SelectItem>
                <SelectItem value="artist" className="text-sao-cyan-200 hover:bg-sao-cyan-500/20">
                  Artist
                </SelectItem>
                <SelectItem value="score" className="text-sao-cyan-200 hover:bg-sao-cyan-500/20">
                  Score
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-sao-cyan-400/80 font-medium tracking-wide">CATEGORY</label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="sao-input h-10 text-sao-cyan-200 border-sao-cyan-500/30">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="sao-panel border-sao-cyan-500/30">
                <SelectItem value="all" className="text-sao-cyan-200 hover:bg-sao-cyan-500/20">
                  All Categories
                </SelectItem>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category} className="text-sao-cyan-200 hover:bg-sao-cyan-500/20">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-sao-cyan-400/80 font-medium tracking-wide">TAG FILTER</label>
          <Select value={filterTag} onValueChange={setFilterTag}>
            <SelectTrigger className="sao-input h-10 text-sao-cyan-200 border-sao-cyan-500/30">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent className="sao-panel border-sao-cyan-500/30">
              <SelectItem value="all" className="text-sao-cyan-200 hover:bg-sao-cyan-500/20">
                All Tags
              </SelectItem>
              {TAGS.map((tag) => (
                <SelectItem key={tag} value={tag} className="text-sao-cyan-200 hover:bg-sao-cyan-500/20">
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Add Song Button */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full h-12 bg-gradient-to-r from-sao-cyan-600 to-sao-blue-600 hover:from-sao-cyan-500 hover:to-sao-blue-500 text-white font-semibold border border-sao-cyan-400/50 shadow-lg shadow-sao-cyan-500/30 hover:shadow-xl hover:shadow-sao-cyan-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-95">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-white/20">
                <Plus className="w-4 h-4" />
              </div>
              <span className="tracking-wide">ADD NEW SONG</span>
              <Zap className="w-4 h-4" />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm mx-auto sao-panel border-2 border-sao-cyan-500/40 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-sao-cyan-300 text-lg font-semibold tracking-wide">
              REGISTER NEW SONG
            </DialogTitle>
            <div className="h-px bg-gradient-to-r from-transparent via-sao-cyan-500 to-transparent mt-2"></div>
          </DialogHeader>
          <SongForm onSave={handleAddSong} onCancel={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-sao-cyan-400/80">
          <div className="w-2 h-2 bg-sao-cyan-400 rounded-full animate-pulse"></div>
          <span>{filteredAndSortedSongs.length} songs found</span>
        </div>
        {(searchTerm || filterCategory !== "all" || filterTag !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm("")
              setFilterCategory("all")
              setFilterTag("all")
            }}
            className="text-sao-cyan-400/60 hover:text-sao-cyan-300 hover:bg-sao-cyan-500/10 text-xs"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Song List */}
      <div className="space-y-4">
        {filteredAndSortedSongs.length > 0 ? (
          filteredAndSortedSongs.map((song, index) => (
            <div key={song.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <SongCard song={song} onToggleFavorite={onToggleFavorite} onClick={() => onSongSelect(song)} />
            </div>
          ))
        ) : (
          <div className="sao-panel p-8 text-center border border-sao-cyan-500/20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sao-cyan-500/10 flex items-center justify-center">
              <Search className="w-8 h-8 text-sao-cyan-400/50" />
            </div>
            <h3 className="text-lg font-semibold text-sao-cyan-300 mb-2">No Songs Found</h3>
            <p className="text-sao-cyan-400/70 text-sm">
              {searchTerm || filterCategory !== "all" || filterTag !== "all"
                ? "Try adjusting your search criteria"
                : "Add your first song to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
