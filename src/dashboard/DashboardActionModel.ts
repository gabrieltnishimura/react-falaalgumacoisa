export default interface DashboardActionModel {
  id: string;
  type: 'REGISTER' | 'RECORDING' | 'EXTRA' | 'RECOMMENDATION';
  points: number;
  isRecording: boolean;
  background: {
    src: string;
    alt: string;
  }
  banner?: {
    title: string,
    src: string,
    alt: string,
  }
}
