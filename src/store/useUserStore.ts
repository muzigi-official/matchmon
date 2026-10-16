import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { getMe } from '@/auth/AuthService';
import { USER_ROLE } from '@/constant/DefaultSetting';

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
          window.location.href = '/login';
        },
        setUser: async () => {
          const token = localStorage.getItem('access_token');
          if (token) {
            try {
              const response = await getMe();

              if (typeof response === 'object' && response !== null) {
                set({ user: { ...response, role: USER_ROLE[response.auth] as TUserRole } });
              }
            } catch (error) {
              console.error('Failed to fetch user profile:', error);
              set(state => {
                state.logOut();
                return state;
              });
            }
          }
        },
      }),
      {
        name: 'user-storage',
      },
    ),
  ),
);

export default useUserStore;
