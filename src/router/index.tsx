import { lazy } from 'react';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import MainLayout from '@/components/layout/Main';
import PrivateRoute from './PrivateRoute';
import ProtectedLayout from './ProtectedLayout';

const Main = lazy(() => import('@/pages/Main'));
const Competition = lazy(() => import('@/pages/user/Competition'));
const CompetitionList = lazy(() => import('@/pages/user/Competition/List'));
const Result = lazy(() => import('@/pages/user/Competition/Result'));
const Bracket = lazy(() => import('@/pages/user/Bracket'));
const Team = lazy(() => import('@/pages/user/team'));

const AdminHome = lazy(() => import('@/pages/admin/Home'));
const AdminUsers = lazy(() => import('@/pages/admin/users'));
const AdminCompetition = lazy(() => import('@/pages/admin/competition'));
const AdminCompetitionDetail = lazy(() => import('@/pages/admin/competition/PageDetails'));
const AdminTeams = lazy(() => import('@/pages/admin/teams/TeamPage'));
const AdminPlayers = lazy(() => import('@/pages/admin/players'));

const CompetitionUserHome = lazy(() => import('@/pages/competitionUser/Home'));
const MyCompetitionList = lazy(() => import('@/pages/competitionUser/competition/List'));
const ParticipateTeams = lazy(() => import('@/pages/competitionUser/team/Team'));
const ParticipateTeamsMatching = lazy(() => import('@/pages/competitionUser/matching'));
const ParticipateTeamDetails = lazy(() => import('@/pages/competitionUser/team/TeamDetails'));
const CompetitionBracket = lazy(() => import('@/pages/competitionUser/bracket'));
const CompetitionMatchReport = lazy(() => import('@/pages/competitionUser/matchReport'));
const CompetitionInputMatchReport = lazy(() => import('@/pages/competitionUser/matchReport/Detail'));
const CompetitionRank = lazy(() => import('@/pages/competitionUser/rank'));

const Login = lazy(() => import('@/pages/login'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedLayout>
        <MainLayout />
      </ProtectedLayout>
    ),
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
          { index: true, element: <PrivateRoute component={AdminHome} roles={['admin']} /> },
          {
            path: 'competitions',
            element: <PrivateRoute component={AdminCompetition} roles={['admin']} />,
          },
          {
            path: 'competitions/:compId',
            element: <PrivateRoute component={AdminCompetitionDetail} roles={['admin']} />,
          },
          {
            path: 'users',
            element: <PrivateRoute component={AdminUsers} roles={['admin']} />,
          },
          {
            path: 'players',
            element: <PrivateRoute component={AdminPlayers} roles={['admin']} />,
          },
          {
            path: 'teams',
            element: <PrivateRoute component={AdminTeams} roles={['admin']} />,
          },
        ],
      },
      {
        path: 'competition',
        children: [
          {
            index: true,
            element: <PrivateRoute component={CompetitionUserHome} roles={['competitionUser']} />,
          },
          {
            path: 'list',
            element: <PrivateRoute component={MyCompetitionList} roles={['competitionUser']} />,
          },
          {
            path: 'participateTeams',
            element: <PrivateRoute component={ParticipateTeams} roles={['competitionUser']} />,
          },
          {
            path: 'participateTeams/:joinCompId',
            element: <PrivateRoute component={ParticipateTeamDetails} roles={['competitionUser']} />,
          },
          {
            path: 'participateTeams/matching',
            element: <PrivateRoute component={ParticipateTeamsMatching} roles={['competitionUser']} />,
          },
          {
            path: 'baracket',
            element: <PrivateRoute component={CompetitionBracket} roles={['competitionUser']} />,
          },
          {
            path: 'results',
            element: <PrivateRoute component={CompetitionMatchReport} roles={['competitionUser']} />,
          },
          {
            path: 'results/:matchId',
            element: <PrivateRoute component={CompetitionInputMatchReport} roles={['competitionUser']} />,
          },
          {
            path: 'rank',
            element: <PrivateRoute component={CompetitionRank} roles={['competitionUser']} />,
          },
        ],
      },
      { path: '*', element: <Navigate to='/main' replace /> },
      { index: true, element: <Main /> },
    ],
  },
  { path: '/login', element: <Login /> },
];

const router = createBrowserRouter(routes);

export default router;
