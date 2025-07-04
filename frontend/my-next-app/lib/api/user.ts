import axios from 'axios';
import { User, CreateUserRequest } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>('/api/users');
  return res.data;
};

export const createUser = async (data: CreateUserRequest): Promise<User> => {
  const res = await api.post<User>('/api/users', data);
  return res.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const res = await api.get<User>(`/api/users/${id}`);
  return res.data;
};
