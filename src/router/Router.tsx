import React, { lazy, Suspense } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from 'src/components/layout/Main';

const Main = lazy(() => import('../pages/Main'));
const Competition = lazy(() => import('../pages/Competition'));
const Team = lazy(() => import('../pages/Team/TeamPage'));
const Player = lazy(() => import('../pages/Player'));
const Ranking = lazy(() => import('../pages/Ranking'));
const Bracket = lazy(() => import('../pages/Bracket'));

const renderLoader = () => <p>Loading</p>;

export default function Router() {
  return (
    <Suspense fallback={renderLoader()}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='main' element={<Main />} />
          <Route path='team' element={<Team />} />
          <Route path='competition' element={<Competition />} />
          <Route path='player' element={<Player />} />
          <Route path='ranking' element={<Ranking />} />
          <Route path='bracket' element={<Bracket />} />
          <Route path='*' element={<Navigate to='/main' replace />} />
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
