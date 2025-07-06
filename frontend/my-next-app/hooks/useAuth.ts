"use client";

import { useState } from "react";
import { api } from "@/lib/api/axios";
import type { User } from "@/types";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.post<User>("/api/auth/register", null, {
        params: { email, password, displayName },
      });
      setCurrentUser(res.data);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "登録に失敗しました");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.post<User>("/api/auth/login", null, {
        params: { email, password },
      });
      setCurrentUser(res.data);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "ログインに失敗しました");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUser = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get<User>(`/api/auth/me/${id}`);
      setCurrentUser(res.data);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "ユーザー取得に失敗しました");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return {
    currentUser,
    isLoading,
    error,
    register,
    login,
    fetchUser,
    logout,
  };
};
