import { lazy } from 'react';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import MainLayout from '@/components/layout/Main';
import PrivateRoute from './PrivateRoute';

const Main = lazy(() => import('../pages/Main'));
const Competition = lazy(() => import('../pages/user/Competition'));
const CompetitionList = lazy(() => import('../pages/user/Competition/List'));
const Result = lazy(() => import('../pages/user/Competition/Result'));
const Bracket = lazy(() => import('../pages/user/Bracket'));
const Team = lazy(() => import('../pages/user/team'));

const AdminHome = lazy(() => import('../pages/admin/Home'));
const AdminUsers = lazy(() => import('../pages/admin/users'));
const AdminCompetition = lazy(() => import('../pages/admin/competition'));
const AdminTeams = lazy(() => import('../pages/admin/teams/TeamPage'));
const AdminPlayers = lazy(() => import('../pages/admin/players'));

const CompetitionUserHome = lazy(() => import('../pages/competitionUser/Home'));
const ParticipateTeams = lazy(() => import('../pages/competitionUser/competition'));
const ParticipateTeamDetails = lazy(() => import('../pages/competitionUser/competition/Details'));
const CompetitionBracket = lazy(() => import('../pages/competitionUser/bracket'));
const CompetitionMatchReport = lazy(() => import('../pages/competitionUser/matchReport'));
const CompetitionRank = lazy(() => import('../pages/competitionUser/rank'));

const userRole = 'competitionUser'; // 이 값은 실제 로그인된 사용자의 역할로 대체되어야 합니다.

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'main', element: <Main /> },
      { path: 'team', element: <Team /> },
      { path: 'results', element: <Result /> },
      { path: 'bracket', element: <Bracket /> },
      {
        path: 'competitions',
        children: [
          { path: '', element: <CompetitionList /> },
          { path: ':competitionId', element: <Competition /> },
        ],
      },
      {
        path: 'admin',
        children: [
          { index: true, element: <PrivateRoute component={AdminHome} roles={['admin']} userRole={userRole} /> },
          {
            path: 'competitions',
            element: <PrivateRoute component={AdminCompetition} roles={['admin']} userRole={userRole} />,
          },
          {
            path: 'users',
            element: <PrivateRoute component={AdminUsers} roles={['admin']} userRole={userRole} />,
          },
          {
            path: 'players',
            element: <PrivateRoute component={AdminPlayers} roles={['admin']} userRole={userRole} />,
          },
          {
            path: 'teams',
            element: <PrivateRoute component={AdminTeams} roles={['admin']} userRole={userRole} />,
          },
        ],
      },
      {
        path: 'competition',
        children: [
          {
            index: true,
            element: <PrivateRoute component={CompetitionUserHome} roles={['competitionUser']} userRole={userRole} />,
          },
          {
            path: 'participateTeams',
            element: <PrivateRoute component={ParticipateTeams} roles={['competitionUser']} userRole={userRole} />,
          },
          {
            path: 'participateTeams/:joinCompId',
            element: (
              <PrivateRoute component={ParticipateTeamDetails} roles={['competitionUser']} userRole={userRole} />
            ),
          },
          {
            path: 'baracket',
            element: <PrivateRoute component={CompetitionBracket} roles={['competitionUser']} userRole={userRole} />,
          },
          {
            path: 'results',
            element: (
              <PrivateRoute component={CompetitionMatchReport} roles={['competitionUser']} userRole={userRole} />
            ),
          },
          {
            path: 'rank',
            element: <PrivateRoute component={CompetitionRank} roles={['competitionUser']} userRole={userRole} />,
          },
        ],
      },
      { path: '*', element: <Navigate to='/main' replace /> },
      { index: true, element: <Main /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
