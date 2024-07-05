import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface CompetitionState {
  selectedCompetition: number | undefined;
  setCompetition: (competition: number) => void;
}

const useUserStore = create<CompetitionState>()(
  devtools(
    persist(
      set => ({
        selectedCompetition: 0,
        setCompetition: (competition: number) => set({ selectedCompetition: competition }),
      }),
      {
        name: 'competition-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default useUserStore;
