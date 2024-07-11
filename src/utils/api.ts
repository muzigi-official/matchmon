import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// https://dev.to/vikirobles/how-to-create-an-auth-login-system-with-axios-interceptors-typescript-2k11
interface IResponseData {
  data?: string;
}

const SERVER_ADDRESS = import.meta.env.VITE_APP_BACK_END_POINT;

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

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const { method, url } = config;
  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);
  return config;
};

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

requestAPI.interceptors.request.use(onRequest);
requestAPI.interceptors.response.use(onResponse, onResponseError);

export default requestAPI;
