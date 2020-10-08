import { map } from 'rxjs/operators';
import { get } from '../apis/api';
import config from '../config';
import DashboardModel from './DashboardModel';

export default class DashboardService {
  public getDashboard(): Promise<DashboardModel> {
    const url = config.endpoints.dashboard;
    return get<any>(url)
      .pipe(
        map((data: any) => new DashboardModel(data))
      ).toPromise();
  }

}