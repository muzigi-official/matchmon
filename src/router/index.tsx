import { lazy } from 'react';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import MainLayout from '@/components/layout/Main';
import PrivateRoute from './PrivateRoute';

const Main = lazy(() => import('../pages/Main'));
const CompetitionList = lazy(() => import('../pages/Competition/List'));
const Competition = lazy(() => import('../pages/Competition'));
const Team = lazy(() => import('../pages/Team/TeamPage'));
const PlayerList = lazy(() => import('../pages/Player/List'));
const Ranking = lazy(() => import('../pages/Ranking'));
const Bracket = lazy(() => import('../pages/Bracket'));

const AdminHome = lazy(() => import('../pages/admin/Home'));
const AdminCompetition = lazy(() => import('../pages/admin/competition'));
const ParticipateTeams = lazy(() => import('../pages/admin/competition/team/Team'));
const ParticipateTeamDetails = lazy(() => import('../pages/admin/competition/team/TeamDetails'));

const userRole = 'admin'; // 이 값은 실제 로그인된 사용자의 역할로 대체되어야 합니다.

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'main', element: <Main /> },
      { path: 'team', element: <Team /> },
      {
        path: 'competition',
        children: [
          { path: ':competitionId', element: <Competition /> },
          { path: 'list', element: <CompetitionList /> },
        ],
      },
      { path: 'player', element: <PlayerList /> },
      {
        path: 'admin',
        children: [
          { index: true, element: <PrivateRoute component={AdminHome} roles={['admin']} userRole={userRole} /> },
          {
            path: 'competitions',
            element: <PrivateRoute component={AdminCompetition} roles={['admin']} userRole={userRole} />,
          },
          {
            path: 'competitions/participateTeams',
            element: <PrivateRoute component={ParticipateTeams} roles={['admin']} userRole={userRole} />,
          },
          {
            path: 'competitions/participateTeams/:joinCompId',
            element: <PrivateRoute component={ParticipateTeamDetails} roles={['admin']} userRole={userRole} />,
          },
        ],
      },
      { path: 'ranking', element: <Ranking /> },
      { path: 'bracket', element: <Bracket /> },
      { path: '*', element: <Navigate to='/main' replace /> },
      { index: true, element: <Main /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
