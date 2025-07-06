"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api/axios";

export function useStats() {
  const [categoryStats, setCategoryStats] = useState<Record<string, number>>(
    {}
  );
  const [artistStats, setArtistStats] = useState<Record<string, number>>({});
  const [averageScore, setAverageScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoryStats = async () => {
    try {
      setLoading(true);
      const res = await api.get<Record<string, number>>(
        "/api/stats/categories"
      );
      setCategoryStats(res.data);
    } catch (err) {
      console.error(err);
      setError("カテゴリ統計の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const fetchArtistStats = async () => {
    try {
      setLoading(true);
      const res = await api.get<Record<string, number>>("/api/stats/artists");
      setArtistStats(res.data);
    } catch (err) {
      console.error(err);
      setError("アーティスト統計の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const fetchAverageScore = async () => {
    try {
      setLoading(true);
      const res = await api.get<number>("/api/stats/average-score");
      setAverageScore(res.data);
    } catch (err) {
      console.error(err);
      setError("平均スコアの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  // 必要に応じてまとめて取得する関数
  const fetchAllStats = async () => {
    setError(null);
    await Promise.all([
      fetchCategoryStats(),
      fetchArtistStats(),
      fetchAverageScore(),
    ]);
  };

  return {
    categoryStats,
    artistStats,
    averageScore,
    loading,
    error,
    fetchCategoryStats,
    fetchArtistStats,
    fetchAverageScore,
    fetchAllStats,
  };
}
