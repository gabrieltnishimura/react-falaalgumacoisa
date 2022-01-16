export default class SimpleStatsModel {
  hoursRecorded: number;
  uniqueUsers: number;

  constructor(data: any) {
    this.hoursRecorded = Number(Number(data.hoursRecorded).toFixed(2));
    this.uniqueUsers = Number(data.uniqueUsers);
  }
}
