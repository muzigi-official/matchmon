import React, { lazy, Suspense } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

const Main = lazy(() => import('../pages/Home/Main'));

const renderLoader = () => <p>Loading</p>;

export default function Router() {
  return (
    <Suspense fallback={renderLoader()}>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Suspense>
  );
}
