"use client"

import { useState } from "react"
import type { Song, SearchResult } from "@/types"
import { sampleSongs } from "@/data/sampleData"

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>(sampleSongs)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const toggleFavorite = (songId: number) => {
    setSongs(songs.map((song) => (song.id === songId ? { ...song, isFavorite: !song.isFavorite } : song)))
  }

  const addSong = (newSong: Omit<Song, "id">) => {
    const song: Song = {
      id: Date.now(),
      ...newSong,
      jacket: `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(newSong.title)}`,
    }
    setSongs([...songs, song])
  }

  const updateSong = (updatedSong: Song) => {
    setSongs(songs.map((song) => (song.id === updatedSong.id ? updatedSong : song)))
  }

  const deleteSong = (songId: number) => {
    setSongs(songs.filter((song) => song.id !== songId))
  }

  const searchSongs = async (query: string) => {
    if (!query.trim()) return

    setIsSearching(true)

    // 検索履歴に追加
    if (!searchHistory.includes(query)) {
      setSearchHistory([query, ...searchHistory.slice(0, 4)])
    }

    try {
      // モックAPI呼び出し
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockResults: SearchResult[] = [
        {
          title: query.includes("津軽") ? "津軽海峡冬景色" : `${query} - 楽曲1`,
          artist: query.includes("津軽") ? "石川さゆり" : "アーティスト1",
          album: "ベストアルバム",
          releaseYear: 1988,
          artwork: "/placeholder.svg?height=100&width=100&text=Album",
        },
        {
          title: `${query} - 楽曲2`,
          artist: "アーティスト2",
          album: "シングル",
          releaseYear: 2020,
          artwork: null,
        },
        {
          title: `${query} - 楽曲 3`,
          artist: "アーティスト3",
          album: "アルバム名",
          releaseYear: 2015,
          artwork: "/placeholder.svg?height=100&width=100&text=Cover",
        },
      ]

      setSearchResults(mockResults)
    } catch (error) {
      console.error("検索エラー:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
  }

  return {
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
  }
}
