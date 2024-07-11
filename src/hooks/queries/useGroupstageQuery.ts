import { useQuery } from 'react-query';

import { requestGroupstage } from '@/api/groupStage';
import { groupstageQueryKeys } from '@/queryKeys/groupstage';

export default function useGroupStages() {
  return useQuery(groupstageQueryKeys.groupstage(), () => requestGroupstage());
}
