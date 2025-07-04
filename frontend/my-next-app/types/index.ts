// 型定義

// Song 関連
export interface Song {
  id: number;
  title: string;
  artist: string;
  key: number;
  score: number | null;
  memo: string;
  lyrics: string;
  jacket: string;
  category: string;
  machine: string;
  isFavorite: boolean;
  tags: string[];
  createdAt?: string; // DB管理用
  updatedAt?: string; // DB管理用
}

// POST / PUT 用リクエスト型
export type CreateSongRequest = {
  title: string;
  artist: string;
  key: number;
  score?: number | null;
  memo?: string;
  lyrics?: string;
  jacket?: string;
  category?: string;
  machine?: string;
  isFavorite?: boolean;
  tags?: string[];
};

export type UpdateSongRequest = Partial<CreateSongRequest>;

// 検索結果
export interface SearchResult {
  title: string;
  artist: string;
  album: string;
  releaseYear: number;
  artwork: string | null;
}

// User 関連
export interface User {
  id: number;
  username: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateUserRequest = {
  username: string;
  password: string;
};

// Stats 関連
export type SongCountByCategory = {
  category: string;
  count: number;
};

// 表示・ソート用
export type ViewType = "login" | "songList" | "songDetail";
export type SortType = "title" | "artist" | "score";
