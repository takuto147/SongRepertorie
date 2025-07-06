import { api } from '@/lib/api/axios';
import { Song, CreateSongRequest, UpdateSongRequest } from '@/types';

export const getSongs = async (): Promise<Song[]> => {
  const res = await api.get<Song[]>('/api/songs');
  return res.data;
};

export const getSong = async (id: number): Promise<Song> => {
  const res = await api.get<Song>(`/api/songs/${id}`);
  return res.data;
};

export const createSong = async (song: CreateSongRequest): Promise<Song> => {
  const res = await api.post<Song>('/api/songs', song);
  return res.data;
};

export const updateSongApi = async (id: number, song: UpdateSongRequest): Promise<Song> => {
  const res = await api.put<Song>(`/api/songs/${id}`, song);
  return res.data;
};

export const deleteSongApi = async (id: number): Promise<void> => {
  await api.delete(`/api/songs/${id}`);
};
