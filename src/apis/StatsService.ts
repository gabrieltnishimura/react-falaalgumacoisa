import { lastValueFrom } from 'rxjs';
import { get } from './api';
import config from '../config';
import SimpleStatsModel from '../home/models/SimpleStatsModel';

export const getSimpleStats = async (): Promise<SimpleStatsModel> => {
  const url = config.endpoints.simpleStats;
  const response = await lastValueFrom(get<any>(url));
  const stats = new SimpleStatsModel(response);

  return stats;
};
