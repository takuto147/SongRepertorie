"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  const [matrixChars, setMatrixChars] = useState<Array<{ id: number; char: string; left: number; delay: number }>>([])

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

  // Matrix background effect for main app
  useEffect(() => {
    if (currentView !== "login") {
      const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
      const newMatrixChars = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        char: chars[Math.floor(Math.random() * chars.length)],
        left: Math.random() * 100,
        delay: Math.random() * 3,
      }))
      setMatrixChars(newMatrixChars)
    }
  }, [currentView])

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song)
    setCurrentView("songDetail")
  }

  const handleToggleFavorite = (songId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    toggleFavorite(songId)

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
    const songId = updatedSong.id
    const songToSave = {
      ...updatedSong,
      score:
        typeof updatedSong.score === "string"
          ? updatedSong.score
            ? Number.parseInt(updatedSong.score)
            : null
          : updatedSong.score,
    }
    
    updateSong(songId,songToSave)
    setSelectedSong(songToSave)
    setIsEditMode(false)
    setEditingSong(null)
  }

  const handleSaveNew = (newSong: Omit<Song, "id">) => {
    addSong(newSong)
    setIsEditMode(false)
    setEditingSong(null)
    setCurrentView("songList")
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

  // Login screen
  if (currentView === "login") {
    return <LoginPage onLogin={() => setCurrentView("songList")} />
  }

  // Song detail/edit screen
  if (currentView === "songDetail") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sao-dark-900 via-sao-dark-800 to-sao-dark-700 relative overflow-hidden">
        {/* Matrix Background */}
        <div className="animate-matrix-bg">
          {matrixChars.map((char) => (
            <div
              key={char.id}
              className="matrix-char"
              style={{
                left: `${char.left}%`,
                animationDelay: `${char.delay}s`,
              }}
            >
              {char.char}
            </div>
          ))}
        </div>

        {/* Cyber Grid Background */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>

        {(isEditMode || selectedSong) && (
          <Header
            title={selectedSong ? "SONG DETAILS" : "ADD NEW SONG"}
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
    <div className="min-h-screen bg-gradient-to-br from-sao-dark-900 via-sao-dark-800 to-sao-dark-700 relative overflow-hidden">
      {/* Matrix Background */}
      <div className="animate-matrix-bg">
        {matrixChars.map((char) => (
          <div
            key={char.id}
            className="matrix-char"
            style={{
              left: `${char.left}%`,
              animationDelay: `${char.delay}s`,
            }}
          >
            {char.char}
          </div>
        ))}
      </div>

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>

      <div className="relative z-10 max-w-md mx-auto">
        <Tabs defaultValue="songs" className="w-full">
          <div className="pb-24">
            <div className="p-4 space-y-4">
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
