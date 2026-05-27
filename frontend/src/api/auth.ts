import { apiClient } from './client';
import type { BaseResponse } from '../types/api';
import type { LoginResponse, RegisterResponse, RegisterRole, SessionUser } from '../types/auth';

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await apiClient.post<BaseResponse<LoginResponse>>('/auth/login', {
    email,
    password,
  });
  return data.data;
}

export async function register(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  roleName: RegisterRole;
}): Promise<RegisterResponse> {
  const { data } = await apiClient.post<BaseResponse<RegisterResponse>>('/auth/register', input);
  return data.data;
}

export async function fetchCurrentUser(): Promise<SessionUser> {
  const { data } = await apiClient.get<BaseResponse<SessionUser>>('/auth/me');
  return data.data;
}

export async function refreshAccessToken(): Promise<void> {
  await apiClient.post('/auth/refresh');
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}
