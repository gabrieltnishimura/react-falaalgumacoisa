import { get } from '../apis/api';
import config from '../config';
import DashboardModel from './DashboardModel';

export default class DashboardService {
  public async getDashboard(): Promise<DashboardModel> {
    const url = config.endpoints.dashboard;
    const response = await get<any>(url).toPromise()
    return new DashboardModel(response);
  }
}