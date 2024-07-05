import axios, { AxiosInstance } from 'axios';
import setupInterceptorsTo from './errorHandler';
import { checkLogin } from './loginChecker';

// const SERVER_ADDRESS = process.env.REACT_APP_BACK_END_POINT;
const SERVER_ADDRESS = 'http://localhost:3000';

const customAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`, // 기본 서버 주소 입력
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
  },
});

customAxios.interceptors.request.use(checkLogin);

setupInterceptorsTo(customAxios);

export default customAxios;
