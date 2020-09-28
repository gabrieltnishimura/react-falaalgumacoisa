
let firebaseConfig: any;
try {
  const rawConfig = process.env.REACT_APP_FIREBASE_CONFIG
  if (rawConfig) {
    firebaseConfig = JSON.parse(atob(rawConfig))
  }
} catch (error) {
  console.error('Could not load firebase config');
}

console.log(process.env);

const config = {
  firebaseConfig,
  baseUrl: process.env.REACT_APP_BACKEND_BASE_URL,
  endpoints: {
    phraseGroup: process.env.REACT_APP_PHRASE_GROUP || 'NOT_SET',
    sendRecording: process.env.REACT_APP_SEND_RECORDING_URL || 'NOT_SET',
    skipRecording: process.env.REACT_APP_SKIP_RECORDING_URL || 'NOT_SET',
    basicData: process.env.REACT_APP_BASIC_DATA_URL || 'NOT_SET',
  },
};

export default config;