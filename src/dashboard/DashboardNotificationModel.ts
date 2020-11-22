export default interface DashboardNotificationModel {
  type: 'FOLLOW' | 'REFER';
  follow?: {
    id: string,
    name: string,
  };
}
