import requestAPI from '@/utils/api';

const API_URL = '/auth';

interface ISignInDto {
  username: string;
  password: string;
}

interface ISignUpDto {
  username: string;
  password: string;
  //TODO: 이름, 성별, 이메일, 전화번호, 권한 등등
}

interface ISignInReturn {
  access_token: string;
}

export const signIn = (data: ISignInDto): Promise<ISignInReturn> => requestAPI.post(`${API_URL}/signIn`, data);

export const signUp = (data: ISignUpDto): Promise<TDefaultReturn> => requestAPI.post(`${API_URL}/signUp`, data);

export const getMe = (): Promise<void> => requestAPI.get(`${API_URL}/profile`);
