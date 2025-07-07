"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, X, Music } from "lucide-react"
import type { Song } from "@/types"
import { CATEGORIES, MACHINES, TAGS } from "@/constants"
import { keyToString } from "@/utils/keyUtils"

interface SongFormProps {
  song?: Song | null
  onSave: (song: Omit<Song, "id"> | Song) => void
  onCancel: () => void
  isEditing?: boolean
}

export function SongForm({ song, onSave, onCancel, isEditing = false }: SongFormProps) {
  const [formData, setFormData] = useState({
    title: song?.title || "",
    artist: song?.artist || "",
    key: song?.key || 0,
    score: song?.score?.toString() || "",
    memo: song?.memo || "",
    jacket: song?.jacket || "/placeholder.svg?height=300&width=300&text=新しい楽曲",
    category: song?.category || "J-POP",
    machine: song?.machine || "DAM",
    isFavorite: song?.isFavorite || false,
    tags: song?.tags?.map((tag) => tag.name) || [],
  })

  const toggleTag = (tag: string) => {
    const newTags = formData.tags.includes(tag) ? formData.tags.filter((t) => t !== tag) : [...formData.tags, tag]
    setFormData({ ...formData, tags: newTags })
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.artist) return

    const songData = {
      ...formData,
      score: formData.score ? Number.parseInt(formData.score) : null,
      jacket: formData.jacket || `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(formData.title)}`,
      // tagsは文字列配列からTag配列に変換（実際のバックエンド実装時に調整）
      tags: formData.tags.map((tagName, index) => ({ id: index + 1, name: tagName })),
    }

    if (isEditing && song) {
      onSave({ ...songData, id: song.id })
    } else {
      onSave(songData)
    }
  }

  return (
    <div className="space-y-6">
      {/* Album Art Preview */}
      <div className="text-center">
        <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden border-2 border-sao-cyan-500/30 shadow-lg shadow-sao-cyan-500/20 relative group">
          <img
            src={formData.jacket || "/placeholder.svg"}
            alt={`${formData.title} ジャケット`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-sao-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Music className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
        </div>
      </div>

      {/* Basic Info */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-black text-sm font-semibold tracking-wide drop-shadow-lg">
            SONG TITLE *
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="sao-input h-11 text-white bg-sao-dark-600/80 border-sao-cyan-400/50 placeholder:text-sao-cyan-300/60"
            placeholder="Enter song title..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="artist" className="text-black text-sm font-semibold tracking-wide drop-shadow-lg">
            ARTIST *
          </Label>
          <Input
            id="artist"
            value={formData.artist}
            onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
            className="sao-input h-11 text-white bg-sao-dark-600/80 border-sao-cyan-400/50 placeholder:text-sao-cyan-300/60"
            placeholder="Enter artist name..."
          />
        </div>
      </div>

      {/* Key Slider */}
      <div className="space-y-4">
        <Label htmlFor="key" className="text-black text-sm font-semibold tracking-wide drop-shadow-lg">
          KEY: {keyToString(formData.key)}
        </Label>
        <div className="relative p-4 sao-panel border border-sao-cyan-500/20">
          <Slider
            id="key"
            min={-5}
            max={5}
            step={1}
            value={[formData.key]}
            onValueChange={(value) => setFormData({ ...formData, key: value[0] })}
            className="w-full"
          />
          <div className="flex justify-between mt-3 px-2">
            {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((key) => (
              <div key={key} className="flex flex-col items-center">
                <div className="w-0.5 h-2 bg-sao-cyan-400/50"></div>
                <span className="text-xs text-sao-cyan-400/70 mt-1">{keyToString(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score and Categories */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="score" className="text-black text-sm font-semibold tracking-wide drop-shadow-lg">
            SCORE
          </Label>
          <Input
            id="score"
            type="number"
            value={formData.score}
            onChange={(e) => setFormData({ ...formData, score: e.target.value })}
            className="sao-input h-11 text-white bg-sao-dark-600/80 border-sao-cyan-400/50 placeholder:text-sao-cyan-300/60"
            min="0"
            max="100"
            placeholder="0-100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-black text-sm font-semibold tracking-wide drop-shadow-lg">
            CATEGORY
          </Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger className="sao-input h-11 text-white bg-sao-dark-600/80 border-sao-cyan-400/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="sao-panel border-sao-cyan-500/30">
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
        <Label htmlFor="machine" className="text-black text-sm font-semibold tracking-wide drop-shadow-lg">
          MACHINE TYPE
        </Label>
        <Select value={formData.machine} onValueChange={(value) => setFormData({ ...formData, machine: value })}>
          <SelectTrigger className="sao-input h-11 text-white bg-sao-dark-600/80 border-sao-cyan-400/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="sao-panel border-sao-cyan-500/30">
            {MACHINES.map((machine) => (
              <SelectItem key={machine} value={machine} className="text-sao-cyan-200 hover:bg-sao-cyan-500/20">
                {machine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <Label className="text-black text-sm font-semibold tracking-wide drop-shadow-lg">TAGS</Label>
        <div className="grid grid-cols-2 gap-2">
          {TAGS.map((tag) => (
            <Button
              key={tag}
              type="button"
              variant={formData.tags.includes(tag) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleTag(tag)}
              className={`text-xs h-9 transition-all duration-300 ${
                formData.tags.includes(tag)
                  ? "bg-gradient-to-r from-sao-cyan-600 to-sao-blue-600 text-white border-sao-cyan-400/50 shadow-lg shadow-sao-cyan-500/30"
                  : "border-sao-cyan-500/30 text-sao-cyan-300 hover:bg-sao-cyan-500/20 hover:border-sao-cyan-400/50"
              }`}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Memo */}
      <div className="space-y-2">
        <Label htmlFor="memo" className="text-black text-sm font-semibold tracking-wide drop-shadow-lg">
          MEMO
        </Label>
        <Textarea
          id="memo"
          value={formData.memo}
          onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
          className="sao-input min-h-[80px] text-white bg-sao-dark-600/80 border-sao-cyan-400/50 placeholder:text-sao-cyan-300/60 resize-none"
          rows={3}
          placeholder="Add your notes here..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!formData.title || !formData.artist}
          className="flex-1 h-12 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold border border-green-400/50 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-95"
        >
          <div className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span>{isEditing ? "UPDATE" : "REGISTER"}</span>
          </div>
        </Button>

        <Button
          onClick={onCancel}
          variant="outline"
          className="flex-1 h-12 border-sao-cyan-500/30 text-sao-cyan-300 hover:bg-sao-cyan-500/10 hover:border-sao-cyan-400/50 transition-all duration-300 bg-transparent"
        >
          <div className="flex items-center gap-2">
            <X className="w-4 h-4" />
            <span>CANCEL</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
