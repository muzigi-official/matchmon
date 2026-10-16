import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { checkLogin } from '@/api/loginChecker';
import { REQUEST_TIMEOUT_MS } from '@/constant/network';

// https://dev.to/vikirobles/how-to-create-an-auth-login-system-with-axios-interceptors-typescript-2k11
interface IResponseData {
  data?: string;
}

// 환경변수(VITE_APP_BACK_END_POINT)를 우선 사용하고, 없으면 로컬 기본값으로 폴백한다.
const SERVER_ADDRESS = import.meta.env.VITE_APP_BACK_END_POINT || 'http://localhost:3000';

const logOnDev = (message: string) => {
  if (import.meta.env.VITE_APP_NODE_ENV === 'dev') {
    console.log(message);
  }
};

function handleError(serverError: IResponseData) {
  if (serverError?.data) {
    console.log('handleError', serverError);
  }
}

const onResponse = (response: AxiosResponse): AxiosResponse['data'] => {
  const { method, url } = response.config;
  const { status } = response;
  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);
  return response.data;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  handleError(error?.response as IResponseData);
  return Promise.reject(error);
};

const requestAPI: AxiosInstance = axios.create({
  baseURL: SERVER_ADDRESS, // 기본 서버 주소 입력
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

requestAPI.interceptors.request.use(checkLogin);
requestAPI.interceptors.response.use(onResponse, onResponseError);

export default requestAPI;
