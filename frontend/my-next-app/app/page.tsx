"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SongListPage } from "@/components/pages/SongListPage"
import { SearchPage } from "@/components/pages/SearchPage"
import { RandomPage } from "@/components/pages/RandomPage"
import { StatsPage } from "@/components/pages/StatsPage"
import { SongDetailPage } from "@/components/pages/SongDetailPage"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/BottomNavigation"
import { useSongs } from "@/hooks/useSongs"
import { useAuth } from "@/hooks/useAuth"
import type { Song, SearchResult } from "@/types"
import GlobalHeader from "@/components/GlobalHeader"

export default function KaraokeApp() {
  const router = useRouter()
  const { user, logout, loading } = useAuth()
  const isLoggedIn = !!user

  // アプリケーション状態
  const [activeTab, setActiveTab] = useState("songs")
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

  // 認証状態をチェックしてリダイレクト
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn, loading, router])

  // Matrix background effect
  useEffect(() => {
    if (isLoggedIn) {
      const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
      const newMatrixChars = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        char: chars[Math.floor(Math.random() * chars.length)],
        left: Math.random() * 100,
        delay: Math.random() * 3,
      }))
      setMatrixChars(newMatrixChars)
    }
  }, [isLoggedIn])

  const handleLogout = () => {
    logout()
    setActiveTab("songs")
    setSelectedSong(null)
    setIsEditMode(false)
    setEditingSong(null)
    router.push('/login')
  }

  // 楽曲選択処理
  const handleSongSelect = (song: Song) => {
    setSelectedSong(song)
  }

  // お気に入り切り替え処理
  const handleToggleFavorite = (songId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    toggleFavorite(songId)

    if (selectedSong && selectedSong.id === songId) {
      setSelectedSong({ ...selectedSong, isFavorite: !selectedSong.isFavorite })
    }
  }

  // 編集処理
  const handleEdit = (song: Song) => {
    setEditingSong({
      ...song,
      score: song.score ? song.score.toString() : "",
    } as any)
    setIsEditMode(true)
  }

  // 保存処理
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
    updateSong(songToSave.id, songToSave)
    setSelectedSong(songToSave)
    setIsEditMode(false)
    setEditingSong(null)
  }

  // 新規保存処理
  const handleSaveNew = (newSong: Omit<Song, "id">) => {
    addSong(newSong)
    setIsEditMode(false)
    setEditingSong(null)
    setSelectedSong(null)
    setActiveTab("songs")
  }

  // 削除処理
  const handleDelete = (songId: number) => {
    deleteSong(songId)
    setSelectedSong(null)
    setActiveTab("songs")
  }

  // キャンセル処理
  const handleCancel = () => {
    setIsEditMode(false)
    setEditingSong(null)

    if (!selectedSong) {
      setActiveTab("songs")
    }
  }

  // 検索から追加処理
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
  }

  // 戻る処理
  const handleBack = () => {
    if (selectedSong) {
      setSelectedSong(null)
    } else {
      setSelectedSong(null)
      setIsEditMode(false)
      setEditingSong(null)
    }
  }

  // タブ変更処理
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setSelectedSong(null)
    setIsEditMode(false)
    setEditingSong(null)
  }

  // ローディング中または認証されていない場合は何も表示しない
  if (loading || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sao-dark-900 via-sao-dark-800 to-sao-dark-700 flex items-center justify-center">
        <div className="text-sao-cyan-300 text-lg">LOADING...</div>
      </div>
    )
  }

  // 楽曲詳細・編集画面
  if (selectedSong || isEditMode) {
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

        <Header
          title={selectedSong ? "SONG DETAILS" : "ADD NEW SONG"}
          onBack={handleBack}
          song={selectedSong}
          onToggleFavorite={selectedSong ? (songId) => handleToggleFavorite(songId, {} as React.MouseEvent) : undefined}
        />
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

  // タブコンテンツのレンダリング
  const renderTabContent = () => {
    switch (activeTab) {
      case "songs":
        return (
          <SongListPage
            songs={songs}
            onSongSelect={handleSongSelect}
            onToggleFavorite={handleToggleFavorite}
            onAddSong={addSong}
          />
        )
      case "search":
        return (
          <SearchPage
            searchResults={searchResults}
            isSearching={isSearching}
            searchHistory={searchHistory}
            onSearch={searchSongs}
            onAddFromSearch={handleAddFromSearch}
            onClearHistory={clearSearchHistory}
          />
        )
      case "random":
        return <RandomPage songs={songs} />
      case "stats":
        return <StatsPage songs={songs} />
      default:
        return null
    }
  }

  // メインアプリケーション画面
  return (
    <div className="min-h-screen bg-gradient-to-br from-sao-dark-900 via-sao-dark-800 to-sao-dark-700 relative overflow-hidden">
      <GlobalHeader onLogout={handleLogout} />
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

      {/* Fixed width container */}
      <div
        className="relative z-10 mx-auto"
        style={{
          width: "100%",
          maxWidth: "448px",
          minHeight: "100vh",
        }}
      >
        <div className="pb-24">
          <div className="p-4 space-y-4" style={{ width: "100%" }}>
            {renderTabContent()}
          </div>
        </div>

        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  )
}
