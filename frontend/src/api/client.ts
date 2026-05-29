import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { BaseResponse } from '../types/api';
import { emitAuthExpired } from './authSessionEvents';

export const apiClient = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshQueue: Array<(success: boolean) => void> = [];

function processRefreshQueue(success: boolean) {
  refreshQueue.forEach((callback) => callback(success));
  refreshQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/refresh')
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push((success) => {
          if (success) {
            resolve(apiClient(originalRequest));
          } else {
            reject(error);
          }
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await apiClient.post<BaseResponse<unknown>>('/auth/refresh');
      processRefreshQueue(true);
      return apiClient(originalRequest);
    } catch (refreshError) {
      processRefreshQueue(false);
      emitAuthExpired();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

apiClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers = config.headers ?? {};
    delete (config.headers as any)['Content-Type'];
    delete (config.headers as any)['content-type'];
  }

  return config;
});
