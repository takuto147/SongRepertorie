//型定義
export interface Song {
  id: number
  title: string
  artist: string
  key: number
  score: number | null
  memo: string
  lyrics: string
  jacket: string
  category: string
  machine: string
  isFavorite: boolean
  tags: string[]
}

export interface SearchResult {
  title: string
  artist: string
  album: string
  releaseYear: number
  artwork: string | null
}

export type ViewType = "login" | "songList" | "songDetail"
export type SortType = "title" | "artist" | "score"
