import { useEffect, useState } from "react";
import type { Song, SearchResult, SongRequest, Tag } from "@/types";
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


const addSong = async (newSong: Song) => {
  const tagIds = newSong.tags.map((tag) => tag.id);

  const request: SongRequest = {
    title: newSong.title,
    artist: newSong.artist,
    key: newSong.key,
    score: newSong.score,
    category: newSong.category,
    machine: newSong.machine,
    isFavorite: newSong.isFavorite,
    tagIds,
  };

  const created = await createSong(request);
  console.log("送信内容の確認:", request);
  setSongs((prev) => [...prev, created]);
};


  const updateSong = async (songId: number, updatedSong: Song) => {
    const tagIds = updatedSong.tags?.map((tag: Tag) => tag.id) || [];

    const request: SongRequest = {
      title: updatedSong.title,
      artist: updatedSong.artist,
      key: updatedSong.key,
      score: updatedSong.score,
      category: updatedSong.category,
      machine: updatedSong.machine,
      isFavorite: updatedSong.isFavorite,
      tagIds,
    };
    
    const updated = await updateSongApi(songId, request);
      console.log("送信内容の確認_update:", updated);
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
