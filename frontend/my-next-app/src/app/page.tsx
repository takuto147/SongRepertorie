"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { LoginPage } from "@/components/pages/LoginPage"
import { SongListPage } from "@/components/pages/SongListPage"
import { SearchPage } from "@/components/pages/SearchPage"
import { RandomPage } from "@/components/pages/RandomPage"
import { StatsPage } from "@/components/pages/StatsPage"
import { SongDetailPage } from "@/components/pages/SongDetailPage"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/BottomNavigation"
import { useSongs } from "@/hooks/useSongs"
import type { Song, SearchResult, ViewType } from "@/types"

export default function KaraokeApp() {
  const [currentView, setCurrentView] = useState<ViewType>("login")
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingSong, setEditingSong] = useState<Song | null>(null)

  const {
    songs,
    searchResults,
    isSearching,
    searchHistory,
    toggleFavorite,
    addSong,
    updateSong,
    deleteSong,
    searchSongs,
    clearSearchHistory,
  } = useSongs()

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song)
    setCurrentView("songDetail")
  }

  const handleToggleFavorite = (songId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    toggleFavorite(songId)

    // 詳細画面で表示中の楽曲の場合、selectedSongも更新
    if (selectedSong && selectedSong.id === songId) {
      setSelectedSong({ ...selectedSong, isFavorite: !selectedSong.isFavorite })
    }
  }

  const handleEdit = (song: Song) => {
    setEditingSong({
      ...song,
      score: song.score ? song.score.toString() : "",
    } as any)
    setIsEditMode(true)
  }

  const handleSave = (updatedSong: Song) => {
    const songToSave = {
      ...updatedSong,
      score:
        typeof updatedSong.score === "string"
          ? updatedSong.score
            ? Number.parseInt(updatedSong.score)
            : null
          : updatedSong.score,
    }
    updateSong(songToSave)
    setSelectedSong(songToSave)
    setIsEditMode(false)
    setEditingSong(null)
  }

  const handleSaveNew = (newSong: Omit<Song, "id">) => {
    addSong(newSong)
    setIsEditMode(false)
    setEditingSong(null)
    setCurrentView("songList")
    alert(`「${newSong.title}」を楽曲リストに追加しました！`)
  }

  const handleDelete = (songId: number) => {
    deleteSong(songId)
    setCurrentView("songList")
    setSelectedSong(null)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setEditingSong(null)

    if (!selectedSong) {
      setCurrentView("songList")
    }
  }

  const handleAddFromSearch = (result: SearchResult) => {
    const songFromSearch = {
      title: result.title,
      artist: result.artist,
      key: 0,
      score: "",
      memo: "",
      jacket: result.artwork || `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(result.title)}`,
      category: "J-POP",
      machine: "DAM",
      isFavorite: false,
      tags: [],
    } as any

    setSelectedSong(null)
    setEditingSong(songFromSearch)
    setIsEditMode(true)
    setCurrentView("songDetail")
  }

  const handleBack = () => {
    if (selectedSong) {
      setCurrentView("songList")
    } else {
      setCurrentView("songList")
      setIsEditMode(false)
      setEditingSong(null)
    }
  }

  // ログイン画面
  if (currentView === "login") {
    return <LoginPage onLogin={() => setCurrentView("songList")} />
  }

  // 楽曲詳細・編集画面
  if (currentView === "songDetail") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        {(isEditMode || selectedSong) && (
          <Header
            title={selectedSong ? "楽曲詳細" : "楽曲を追加"}
            onBack={handleBack}
            song={selectedSong}
            onToggleFavorite={
              selectedSong ? (songId) => handleToggleFavorite(songId, {} as React.MouseEvent) : undefined
            }
          />
        )}
        <SongDetailPage
          song={selectedSong}
          isEditMode={isEditMode}
          editingSong={editingSong}
          onEdit={handleEdit}
          onSave={handleSave}
          onSaveNew={handleSaveNew}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="max-w-md mx-auto">
        <Tabs defaultValue="songs" className="w-full">
          <div className="pb-20">
            <div className="p-4">
              <TabsContent value="songs" className="space-y-4 mt-0">
                <SongListPage
                  songs={songs}
                  onSongSelect={handleSongSelect}
                  onToggleFavorite={handleToggleFavorite}
                  onAddSong={addSong}
                />
              </TabsContent>

              <TabsContent value="search" className="space-y-4 mt-0">
                <SearchPage
                  searchResults={searchResults}
                  isSearching={isSearching}
                  searchHistory={searchHistory}
                  onSearch={searchSongs}
                  onAddFromSearch={handleAddFromSearch}
                  onClearHistory={clearSearchHistory}
                />
              </TabsContent>

              <TabsContent value="random" className="space-y-4 mt-0">
                <RandomPage songs={songs} />
              </TabsContent>

              <TabsContent value="stats" className="space-y-4 mt-0">
                <StatsPage songs={songs} />
              </TabsContent>
            </div>
          </div>

          <BottomNavigation />
        </Tabs>
      </div>
    </div>
  )
}
