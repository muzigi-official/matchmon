export const teamQueryKeys = {
  team: (id: number | string) => ['TEAM', id],
  teamList: (page: number, itemPerPage: number = 10) => ['TEAM_LIST', page, itemPerPage],
};
