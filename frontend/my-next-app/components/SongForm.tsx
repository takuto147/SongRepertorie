"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
    tags: song?.tags || [],
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
      lyrics: song?.lyrics || "",
    }

    if (isEditing && song) {
      onSave({ ...songData, id: song.id })
    } else {
      onSave(songData)
    }
  }

  return (
    <div className="space-y-4">
      {/* ジャケット画像 */}
      <div className="text-center">
        <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden shadow-md">
          <img
            src={formData.jacket || "/placeholder.svg"}
            alt={`${formData.title} ジャケット`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title" className="text-amber-800">
          曲名 *
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="bg-white border-amber-300 focus:border-amber-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="artist" className="text-amber-800">
          アーティスト *
        </Label>
        <Input
          id="artist"
          value={formData.artist}
          onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
          className="bg-white border-amber-300 focus:border-amber-500"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="key" className="text-amber-800">
          キー: {keyToString(formData.key)}
        </Label>
        <div className="relative">
          <Slider
            id="key"
            min={-5}
            max={5}
            step={1}
            value={[formData.key]}
            onValueChange={(value) => setFormData({ ...formData, key: value[0] })}
            className="w-full"
          />
          <div className="flex justify-between mt-2 px-2">
            {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((key) => (
              <div key={key} className="flex flex-col items-center">
                <div className="w-0.5 h-2 bg-amber-400"></div>
                <span className="text-xs text-amber-600 mt-1">{keyToString(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="score" className="text-amber-800">
          点数
        </Label>
        <Input
          id="score"
          type="number"
          value={formData.score}
          onChange={(e) => setFormData({ ...formData, score: e.target.value })}
          className="bg-white border-amber-300 focus:border-amber-500"
          min="0"
          max="100"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-amber-800">
          カテゴリ
        </Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger className="bg-white border-amber-300 focus:border-amber-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-amber-300">
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="machine" className="text-amber-800">
          機種
        </Label>
        <Select value={formData.machine} onValueChange={(value) => setFormData({ ...formData, machine: value })}>
          <SelectTrigger className="bg-white border-amber-300 focus:border-amber-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-amber-300">
            {MACHINES.map((machine) => (
              <SelectItem key={machine} value={machine}>
                {machine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* タグ選択 */}
      <div className="space-y-2">
        <Label className="text-amber-800">タグ</Label>
        <div className="grid grid-cols-2 gap-2">
          {TAGS.map((tag) => (
            <Button
              key={tag}
              type="button"
              variant={formData.tags.includes(tag) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleTag(tag)}
              className={`text-xs ${formData.tags.includes(tag)
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : "border-amber-300 text-amber-700 hover:bg-amber-100"
                }`}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="memo" className="text-amber-800">
          メモ
        </Label>
        <Textarea
          id="memo"
          value={formData.memo}
          onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
          className="bg-white border-amber-300 focus:border-amber-500"
          rows={3}
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-green-500 hover:bg-green-600 text-white"
        disabled={!formData.title || !formData.artist}
      >
        {isEditing ? "保存" : "楽曲を登録"}
      </Button>

      <Button onClick={onCancel} variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-100">
        キャンセル
      </Button>
    </div>
  )
}
