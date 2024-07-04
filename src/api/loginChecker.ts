import { InternalAxiosRequestConfig } from 'axios';

export const checkLogin = async (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers['access_token'] = `Bearer ${token}`;
  }

  return config;
};
