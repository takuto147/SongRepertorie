import { api } from '@/lib/api/axios';
import { User, RegisterRequest, LoginRequest } from '@/types';

// ユーザー登録
export const registerUser = async (req: RegisterRequest): Promise<User> => {
  const params = new URLSearchParams({
    email: req.email,
    password: req.password,
    displayName: req.displayName,
  });
  const res = await api.post<User>(`/api/auth/register?${params.toString()}`);
  return res.data;
};

// ログイン
export const loginUser = async (req: LoginRequest): Promise<User> => {
  const params = new URLSearchParams({
    email: req.email,
    password: req.password,
  });
  const res = await api.post<User>(`/api/auth/login?${params.toString()}`);
  return res.data;
};

// ユーザー情報取得
export const getUserById = async (id: number): Promise<User> => {
  const res = await api.get<User>(`/api/auth/me/${id}`);
  return res.data;
};
