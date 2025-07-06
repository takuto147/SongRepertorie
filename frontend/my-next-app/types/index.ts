// 型定義

// Song 関連
export type Song = {
  id: number;
  userid?: number;
  title: string;
  artist: string;
  key: number ; // キー調整。nullは原曲
  score: number | null;
  memo: string;
  lyrics?: string;
  jacket: string;
  category: string;
  machine: string;
  isFavorite: boolean;
  tags: Tag[];
  createdAt?: string; // DB管理用
  updatedAt?: string; // DB管理用
};

// POST / PUT 用リクエスト型
export type CreateSongRequest = {
  title: string;
  artist: string;
  key?: number | null; // キー調整。nullは原曲
  score?: number | null;
  memo?: string;
  lyrics?: string;
  jacket?: string;
  category?: string;
  machine?: string;
  isFavorite?: boolean;
  tagIds?: number[];
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
  email: string;
  displayName: string;
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

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  displayName: string;
};

export type AuthResponse = {
  user: User;
  token?: string; // JWTを使う場合
};

export type Tag = {
  id: number;
  name: string;
};

export type SongRequest = {
  title: string;
  artist: string;
  key: number | null;
  score: number | null;
  category: string;
  machine: string;
  isFavorite: boolean;
  tagIds?: number[];
};


export type FormData = {
  title: string;
  artist: string;
  key: number;
  score: string;
  memo: string;
  jacket: string;
  category: string;
  machine: string;
  isFavorite: boolean;
  tags: string[];
};


// 表示・ソート用
export type ViewType = "login" | "songList" | "songDetail";
export type SortType = "title" | "artist" | "score";
