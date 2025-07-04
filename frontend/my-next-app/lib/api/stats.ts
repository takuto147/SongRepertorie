import axios from 'axios';
import { SongCountByCategory } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getSongCountByCategory = async (): Promise<SongCountByCategory[]> => {
  const res = await api.get<SongCountByCategory[]>('/api/stats/song-count-by-category');
  return res.data;
};