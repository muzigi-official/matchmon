import requestAPI from '@/utils/api';

export const requestGroupstage = (): Promise<any[]> => requestAPI.get('/group-stage');
