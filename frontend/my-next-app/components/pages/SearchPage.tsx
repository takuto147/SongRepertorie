"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Music } from "lucide-react"
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
    <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-amber-900">
          <Search className="w-5 h-5" />
          楽曲検索
        </CardTitle>
        <p className="text-amber-700">楽曲データベースから検索して簡単登録</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 検索フォーム */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
            <Input
              placeholder="楽曲名またはアーティスト名で検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-amber-300 focus:border-amber-500"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                検索中...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                検索
              </>
            )}
          </Button>
        </div>

        {/* 検索結果 */}
        {searchResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-amber-900">検索結果</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {searchResults.map((result, index) => (
                <Card key={index} className="bg-white border-amber-200 hover:border-amber-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md flex-shrink-0 bg-amber-100 flex items-center justify-center">
                        {result.artwork ? (
                          <img
                            src={result.artwork || "/placeholder.svg"}
                            alt={`${result.title} ジャケット`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Music className="w-6 h-6 text-amber-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-amber-900 truncate">{result.title}</h4>
                        <p className="text-amber-700 truncate">{result.artist}</p>
                        {result.album && <p className="text-sm text-amber-600 truncate">{result.album}</p>}
                        {result.releaseYear && <p className="text-xs text-amber-500">{result.releaseYear}年</p>}
                      </div>
                      <Button
                        onClick={() => onAddFromSearch(result)}
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        追加
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 検索履歴 */}
        {searchHistory.length > 0 && searchResults.length === 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-amber-900">検索履歴</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearHistory}
                className="text-amber-600 hover:text-amber-800"
              >
                クリア
              </Button>
            </div>
            <div className="space-y-2">
              {searchHistory.slice(0, 5).map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleHistorySearch(query)}
                  className="w-full justify-start text-left border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {query}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* 人気楽曲・おすすめ */}
        {searchResults.length === 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-amber-900">人気楽曲</h3>
            <div className="grid grid-cols-2 gap-2">
              {POPULAR_SONGS.map((song, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePopularSearch(song)}
                  className="text-xs border-amber-300 text-amber-700 hover:bg-amber-50 h-auto py-2 px-3"
                >
                  {song}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
