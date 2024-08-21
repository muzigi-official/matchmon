import { useMemo, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { merge } from 'ts-deepmerge';
import { ReactQueryDevtools } from 'react-query/devtools';

import { AxiosError } from 'axios';
import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';

import router from '@/router';
import GlobalStyle from '@/styles/global-styles';
import { getDesignTokens, getThemedComponents } from '@/theme/Theme';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if ((error as AxiosError).code == 'ERR_NETWORK') {
        toast.error(`서버와 연결되지 않습니다`);
      }
      query.state.data;
    },
  }),

  defaultOptions: {
    queries: {
      // ✅ globally default to 600 seconds
      staleTime: 1000 * 600,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

const renderLoader = () => <p>Loading</p>;

function App() {
  const mode = 'light';
  let theme: Theme = useMemo(() => createTheme(merge(getDesignTokens(mode), getThemedComponents(mode))), [mode]);
  theme = responsiveFontSizes(theme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <Suspense fallback={renderLoader()}>
            <RouterProvider router={router} />
          </Suspense>
          <Toaster position='top-center' reverseOrder={false} gutter={8} />
          {/* 하단에 꽃 모양 제거하려면 이거 지우면 됨. */}
          <ReactQueryDevtools initialIsOpen={false} /> {/* Devtools 추가 */}
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
