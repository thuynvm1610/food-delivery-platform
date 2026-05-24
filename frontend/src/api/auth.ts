import { apiClient } from './client';
import type { BaseResponse } from '../types/api';
import type { LoginResponse, SessionUser } from '../types/auth';

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await apiClient.post<BaseResponse<LoginResponse>>('/auth/login', {
    email,
    password,
  });
  return data.data;
}

export async function fetchCurrentUser(): Promise<SessionUser> {
  const { data } = await apiClient.get<BaseResponse<SessionUser>>('/auth/me');
  return data.data;
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}
