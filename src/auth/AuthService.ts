import customAxios from '@/api/customAxios';

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

export async function signIn(data: ISignInDto) {
  const response = await customAxios.post<ISignInReturn>('/auth/signIn', data);
  return response.data.access_token;
}

export async function signUp(data: ISignUpDto) {
  const response = await customAxios.post<TDefaultReturn>('/auth/signUp', data);
  return response.data;
}
