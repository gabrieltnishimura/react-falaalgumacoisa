
export default interface UserMetadataModel {
  nickname: string;
  gender: 'M' | 'F' | 'O' | undefined;
  ageInterval: string;
  region: string;
  dialect: string;
}