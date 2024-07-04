import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompetitionState {
  selectedCompetition: number | undefined;
  setCompetition: (competition: number) => void;
}

const useCompetitionStore = create(
  persist<CompetitionState>(
    set => ({
      selectedCompetition: 0,
      setCompetition: (competition: number) => set({ selectedCompetition: competition }),
    }),
    {
      name: 'competitionStorage',
    },
  ),
);

export default useCompetitionStore;
