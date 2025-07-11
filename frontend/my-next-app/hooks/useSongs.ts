import { useEffect, useState } from "react";
import type { Song, SearchResult, SongRequest, Tag } from "@/types";
import {
  getSongs,
  createSong,
  updateSongApi,
  deleteSongApi,
} from "@/lib/api/songs";
import axios from "axios";

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
      jacket: song.jacket, // 追加
      memo: song.memo, // 追加
      tagIds: song.tags?.map((t) => t.id) || [],
    };

    const updated = await updateSongApi(songId, request);
    setSongs(songs.map((s) => (s.id === songId ? updated : s)));
  };

  const addSong = async (newSong: Omit<Song, "id">) => {
    const tagIds = newSong.tags.map((tag) => tag.id);

    const request: SongRequest = {
      title: newSong.title,
      artist: newSong.artist,
      key: newSong.key,
      score: newSong.score,
      category: newSong.category,
      machine: newSong.machine,
      isFavorite: newSong.isFavorite,
      jacket: newSong.jacket, // 追加
      memo: newSong.memo, // 追加
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
      jacket: updatedSong.jacket, // 追加
      memo: updatedSong.memo, // 追加
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
      const res = await axios.get("https://itunes.apple.com/search", {
        params: {
          term: query,
          entity: "song",
          country: "JP",
          limit: 20,
        },
      });
      const results: SearchResult[] = (res.data.results || []).map((item: any) => ({
        title: item.trackName || "",
        artist: item.artistName || "",
        album: item.collectionName || "",
        releaseYear: item.releaseDate ? new Date(item.releaseDate).getFullYear() : 0,
        artwork: item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '600x600bb') : null,
      }));
      setSearchResults(results);
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
