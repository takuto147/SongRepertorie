import { useState, useEffect } from 'react';
import { User, RegisterRequest, LoginRequest } from '@/types';
import { registerUser, loginUser, getUserById } from '@/lib/api/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 初期化中はtrue
  const [error, setError] = useState<string | null>(null);

  // 初期化時にlocalStorageから認証状態を読み込む
  useEffect(() => {
    const savedAuthState = localStorage.getItem('songRepertoire_auth');
    if (savedAuthState) {
      try {
        const authData = JSON.parse(savedAuthState);
        if (authData.user) {
          setUser(authData.user);
        }
      } catch (error) {
        console.error('認証状態の読み込みに失敗しました:', error);
        localStorage.removeItem('songRepertoire_auth');
      }
    }
    setLoading(false); // 初期化完了
  }, []);

  // ユーザー登録
  const register = async (req: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await registerUser(req);
      setUser(newUser);

      // 認証状態をlocalStorageに保存
      const authData = {
        isLoggedIn: true,
        user: newUser
      };
      localStorage.setItem('songRepertoire_auth', JSON.stringify(authData));

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

      // 認証状態をlocalStorageに保存
      const authData = {
        isLoggedIn: true,
        user: loginUserData
      };
      localStorage.setItem('songRepertoire_auth', JSON.stringify(authData));

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
    localStorage.removeItem('songRepertoire_auth');
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