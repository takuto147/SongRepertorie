import { api } from '@/lib/api/axios';
import { User, CreateUserRequest } from '@/types';

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>('/api/users');
  return res.data;
};

export const createUser = async (user: CreateUserRequest): Promise<User> => {
  const res = await api.post<User>('/api/users', user);
  return res.data;
};
