"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Music, Trash2, Clock, TrendingUp, Zap, Database } from "lucide-react"
import type { SearchResult } from "@/types"
import { POPULAR_SONGS } from "@/constants"

interface SearchPageProps {
  searchResults: SearchResult[]
  isSearching: boolean
  searchHistory: string[]
  onSearch: (query: string) => void
  onAddFromSearch: (result: SearchResult) => void
  onClearHistory: () => void
}

export function SearchPage({
  searchResults,
  isSearching,
  searchHistory,
  onSearch,
  onAddFromSearch,
  onClearHistory,
}: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery)
    }
  }

  const handleHistorySearch = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
  }

  const handlePopularSearch = (song: string) => {
    setSearchQuery(song)
    onSearch(song)
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="sao-panel border-2 border-sao-cyan-500/40">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-3 text-sao-cyan-300 text-xl font-semibold">
            <div className="p-2 rounded-full bg-sao-cyan-500/20 border border-sao-cyan-400/30">
              <Database className="w-6 h-6 text-sao-cyan-400" />
            </div>
            SONG DATABASE SEARCH
          </CardTitle>
          <div className="flex items-center justify-center gap-2 text-sao-cyan-400/70 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>NEURAL NETWORK CONNECTION ACTIVE</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sao-cyan-400 w-5 h-5" />
              <Input
                placeholder="Search neural database for songs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 sao-input h-12 text-sao-cyan-200 text-base"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="w-full h-12 bg-gradient-to-r from-sao-cyan-600 to-sao-blue-600 hover:from-sao-cyan-500 hover:to-sao-blue-500 text-white font-semibold border border-sao-cyan-400/50 shadow-lg shadow-sao-cyan-500/30 hover:shadow-xl hover:shadow-sao-cyan-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              {isSearching ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>SCANNING DATABASE...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  <span>INITIATE SEARCH</span>
                  <Zap className="w-4 h-4" />
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sao-cyan-300">
            <div className="w-1 h-6 bg-gradient-to-b from-sao-cyan-400 to-sao-blue-400"></div>
            <h3 className="text-lg font-semibold tracking-wide">SEARCH RESULTS</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-sao-cyan-500/50 to-transparent"></div>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {searchResults.map((result, index) => (
              <Card
                key={index}
                className="sao-card hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                onClick={() => onAddFromSearch(result)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-sao-cyan-500/30 flex-shrink-0 bg-sao-dark-600/50 flex items-center justify-center relative group">
                      {result.artwork ? (
                        <img
                          src={result.artwork || "/placeholder.svg"}
                          alt={`${result.title} ジャケット`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <Music className="w-6 h-6 text-sao-cyan-400/60" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-br from-sao-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sao-cyan-300 truncate group-hover:text-sao-cyan-200 transition-colors duration-300">
                        {result.title}
                      </h4>
                      <p className="text-sao-cyan-400/80 truncate">{result.artist}</p>
                      {result.album && <p className="text-sm text-sao-cyan-500/70 truncate">{result.album}</p>}
                      {result.releaseYear && <p className="text-xs text-sao-cyan-500/60">{result.releaseYear}</p>}
                    </div>
                    <div className="ml-2">
                      <Plus className="w-5 h-5 text-green-400 group-hover:scale-125 transition-transform duration-200" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && searchResults.length === 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sao-cyan-300">
              <div className="w-1 h-6 bg-gradient-to-b from-sao-cyan-400 to-sao-blue-400"></div>
              <h3 className="text-lg font-semibold tracking-wide flex items-center gap-2">
                <Clock className="w-5 h-5" />
                SEARCH HISTORY
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearHistory}
              className="text-sao-cyan-400/60 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-400/30 transition-all duration-300"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              CLEAR
            </Button>
          </div>
          <div className="space-y-2">
            {searchHistory.slice(0, 5).map((query, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleHistorySearch(query)}
                className="w-full justify-start text-left border-sao-cyan-500/30 text-sao-cyan-300 hover:bg-sao-cyan-500/20 hover:border-sao-cyan-400/50 h-10 transition-all duration-300"
              >
                <Search className="w-4 h-4 mr-3 text-sao-cyan-400" />
                {query}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Songs */}
      {searchResults.length === 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sao-cyan-300">
            <div className="w-1 h-6 bg-gradient-to-b from-sao-cyan-400 to-sao-blue-400"></div>
            <h3 className="text-lg font-semibold tracking-wide flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              TRENDING SONGS
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-sao-cyan-500/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {POPULAR_SONGS.map((song, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handlePopularSearch(song)}
                className="text-xs border-sao-cyan-500/30 text-sao-cyan-300 hover:bg-sao-cyan-500/20 hover:border-sao-cyan-400/50 h-auto py-3 px-3 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sao-cyan-400 rounded-full animate-pulse"></div>
                  <span className="truncate">{song}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
