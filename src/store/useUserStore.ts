import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  isSignIn: boolean;
  logIn: (token: string) => void;
  logOut: () => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      set => ({
        isSignIn: !!localStorage.getItem('access_token'),
        logIn: (token: string) => {
          console.log('access_token', token);
          localStorage.setItem('access_token', token);
          set({ isSignIn: true });
        },
        logOut: () => {
          localStorage.removeItem('access_token');
          set({ isSignIn: false });
        },
      }),
      {
        name: 'user-storage', // name of the item in the storage (must be unique)
      },
    ),
  ),
);

export default useUserStore;
