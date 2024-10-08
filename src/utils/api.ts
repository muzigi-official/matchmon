import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { checkLogin } from '@/api/loginChecker';

// https://dev.to/vikirobles/how-to-create-an-auth-login-system-with-axios-interceptors-typescript-2k11
interface IResponseData {
  data?: string;
}

// const SERVER_ADDRESS = import.meta.env.VITE_APP_BACK_END_POINT;
const SERVER_ADDRESS = 'http://localhost:3000';

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
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
  },
});

requestAPI.interceptors.request.use(checkLogin);
requestAPI.interceptors.response.use(onResponse, onResponseError);

export default requestAPI;
