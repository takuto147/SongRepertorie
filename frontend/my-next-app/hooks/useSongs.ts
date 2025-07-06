import { useEffect, useState } from "react";
import type { Song, SearchResult, SongRequest } from "@/types";
import { getSongs, createSong, updateSongApi, deleteSongApi } from "@/lib/api/songs";

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 初回ロード時に曲一覧を取得
  useEffect(() => {
    (async () => {
      try {
        const data = await getSongs();
        setSongs(data);
      } catch (err) {
        console.error("曲一覧取得失敗:", err);
      }
    })();
  }, []);

  const toggleFavorite = async (songId: number) => {
    const song = songs.find((s) => s.id === songId);
    if (!song) return;

    const request: SongRequest = {
      title: song.title,
      artist: song.artist,
      key: song.key,
      score: song.score,
      category: song.category,
      machine: song.machine,
      isFavorite: !song.isFavorite,
      tagIds: song.tags?.map((t) => t.id) || [],
    };

    const updated = await updateSongApi(songId, request);
    setSongs(songs.map((s) => (s.id === songId ? updated : s)));
  };

  const addSong = async (newSong: SongRequest) => {
    const created = await createSong(newSong);
    console.log("newsongの内容確認:", newSong);
    setSongs([...songs, created]);
  };

  const updateSong = async (songId: number, updatedSong: SongRequest) => {
    const updated = await updateSongApi(songId, updatedSong);
    setSongs(songs.map((s) => (s.id === songId ? updated : s)));
  };

  const deleteSong = async (songId: number) => {
    await deleteSongApi(songId);
    setSongs(songs.filter((s) => s.id !== songId));
  };

  const searchSongs = async (query: string) => {
    if (!query.trim()) return;
    setIsSearching(true);

    if (!searchHistory.includes(query)) {
      setSearchHistory([query, ...searchHistory.slice(0, 4)]);
    }

    try {
      // 本来は外部APIやサーバへ問い合わせる
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockResults: SearchResult[] = [
        {
          title: `${query} - Example1`,
          artist: "Artist1",
          album: "Album1",
          releaseYear: 2000,
          artwork: null,
        },
        {
          title: `${query} - Example2`,
          artist: "Artist2",
          album: "Album2",
          releaseYear: 2010,
          artwork: null,
        },
      ];
      setSearchResults(mockResults);
    } catch (err) {
      console.error("検索失敗:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearchHistory = () => setSearchHistory([]);

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
  };
}
