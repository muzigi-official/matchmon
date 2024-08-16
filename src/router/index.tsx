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

<<<<<<< HEAD
const AdminHome = lazy(() => import('../pages/admin/Home'));
const AdminCompetition = lazy(() => import('../pages/admin/competition'));
const AdminMatchReport = lazy(() => import('../pages/admin/matchReport'));
const AdminMatchDetail = lazy(() => import('../pages/admin/matchReport/Detail'));
const ParticipateTeams = lazy(() => import('../pages/admin/competition/team/Team'));
const ParticipateTeamDetails = lazy(() => import('../pages/admin/competition/team/TeamDetails'));
// const AdminCompetitionDetails = lazy(() => import('../pages/admin/competition/Details'));
=======
const AdminHome = lazy(() => import('@/pages/admin/Home'));
const AdminUsers = lazy(() => import('@/pages/admin/users'));
const AdminCompetition = lazy(() => import('@/pages/admin/competition'));
const AdminCompetitionDetail = lazy(() => import('@/pages/admin/competition/PageDetails'));
const AdminTeams = lazy(() => import('@/pages/admin/teams/TeamPage'));
const AdminPlayers = lazy(() => import('@/pages/admin/players'));
>>>>>>> e522dfb9a8f9368eb18405f71b49c68e2e332e9b

const CompetitionUserHome = lazy(() => import('@/pages/competitionUser/Home'));
const MyCompetitionList = lazy(() => import('@/pages/competitionUser/competition/List'));
const ParticipateTeams = lazy(() => import('@/pages/competitionUser/team/Team'));
const ParticipateTeamsMatching = lazy(() => import('@/pages/competitionUser/matching'));
const ParticipateTeamDetails = lazy(() => import('@/pages/competitionUser/team/TeamDetails'));
const CompetitionBracket = lazy(() => import('@/pages/competitionUser/bracket'));
const CompetitionMatchReport = lazy(() => import('@/pages/competitionUser/matchReport'));
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

<<<<<<< HEAD
      <Route path='admin'>
        <Route index element={<AdminHome />} />
        <Route path='competition'>
          <Route index element={<AdminCompetition />} />
          {/* <Route path=':competitionId' element={<AdminCompetitionDetails />} /> */}
          <Route path='participateTeams'>
            <Route index element={<ParticipateTeams />} />
            <Route path=':joinCompId' element={<ParticipateTeamDetails />} />
          </Route>
        </Route>
        <Route path='matchReport'>
          <Route index element={<AdminMatchReport />} />
          <Route path=':matchId' element={<AdminMatchDetail />} />
        </Route>
      </Route>

      <Route path='ranking' element={<Ranking />} />
      <Route path='bracket' element={<Bracket />} />
      <Route path='*' element={<Navigate to='/main' replace />} />
      <Route index element={<Main />} />
    </Route>,
  ),
);
=======
const router = createBrowserRouter(routes);
>>>>>>> e522dfb9a8f9368eb18405f71b49c68e2e332e9b

export default router;
