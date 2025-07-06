import { api } from '@/lib/api/axios';

export const getSongCountByCategory = async (): Promise<Record<string, number>> => {
  const res = await api.get<Record<string, number>>('/api/stats/song-count-by-category');
  return res.data;
};
