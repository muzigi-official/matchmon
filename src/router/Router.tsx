import React, { lazy, Suspense } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from 'src/components/layout/Main';

const Main = lazy(() => import('../pages/Home/Main'));

const renderLoader = () => <p>Loading</p>;

export default function Router() {
  return (
    <Suspense fallback={renderLoader()}>
      <Routes>
        <Route
          path='/'
          element={
            <MainLayout>
              <Main />
            </MainLayout>
          }
        />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Suspense>
  );
}
