import { useState } from 'react';
import { User, RegisterRequest, LoginRequest } from '@/types';
import { registerUser, loginUser, getUserById } from '@/lib/api/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ユーザー登録
  const register = async (req: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await registerUser(req);
      setUser(newUser);
      return newUser;
    } catch (e: any) {
      setError(e.message || '登録に失敗しました');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // ログイン
  const login = async (req: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const loginUserData = await loginUser(req);
      setUser(loginUserData);
      return loginUserData;
    } catch (e: any) {
      setError(e.message || 'ログインに失敗しました');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // ログアウト
  const logout = () => {
    setUser(null);
  };

  // ユーザー情報再取得
  const fetchUser = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUser = await getUserById(id);
      setUser(fetchedUser);
      return fetchedUser;
    } catch (e: any) {
      setError(e.message || 'ユーザー情報取得に失敗しました');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
    fetchUser,
    setUser, // 必要に応じて外部からもセット可能
  };
} 