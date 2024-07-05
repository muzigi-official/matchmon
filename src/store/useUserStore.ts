import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getMe } from '@/auth/AuthService';
import { USER_ROLE } from '@/constant/DefaultSetting';

interface IUser {
  auth: 1;
  exp: number;
  iat: number;
  userId: number;
  username: string;
  role: TUserRole;
}

interface IUserState {
  isSignIn: boolean;
  logIn: (token: string) => void;
  logOut: () => void;
  user: IUser | null;
  setUser: () => void;
}

const useUserStore = create<IUserState>()(
  devtools(
    persist(
      set => ({
        isSignIn: !!localStorage.getItem('access_token'),
        user: null,
        logIn: (token: string) => {
          localStorage.setItem('access_token', token);
          set({ isSignIn: true });
        },
        logOut: () => {
          localStorage.removeItem('access_token');
          set({ isSignIn: false, user: null });
        },
        setUser: async () => {
          const token = localStorage.getItem('access_token');
          if (token) {
            try {
              const response = await getMe();

              set({ user: { ...response, role: USER_ROLE[response.auth] } });
            } catch (error) {
              console.error('Failed to fetch user profile:', error);
              // Handle token invalidation, logout, etc.
              set({ isSignIn: false, user: null });
              localStorage.removeItem('access_token');
            }
          }
        },
      }),
      {
        name: 'user-storage', // name of the item in the storage (must be unique)
      },
    ),
  ),
);

export default useUserStore;
