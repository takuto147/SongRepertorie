import axios from 'axios';
import { Song, CreateSongRequest, UpdateSongRequest } from '@/types';

// APIエンドポイント
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 楽曲一覧取得
export const getSongs = async (): Promise<Song[]> => {
  const res = await api.get<Song[]>('/api/songs');
  return res.data;
};

// 楽曲詳細取得
export const getSongById = async (id: number): Promise<Song> => {
  const res = await api.get<Song>(`/api/songs/${id}`);
  return res.data;
};

// 楽曲新規登録
export const createSong = async (data: CreateSongRequest): Promise<Song> => {
  const res = await api.post<Song>('/api/songs', data);
  return res.data;
};

// 楽曲更新
export const updateSong = async (id: number, data: UpdateSongRequest): Promise<Song> => {
  const res = await api.put<Song>(`/api/songs/${id}`, data);
  return res.data;
};

// 楽曲削除
export const deleteSong = async (id: number): Promise<void> => {
  await api.delete(`/api/songs/${id}`);
};
