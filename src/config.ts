
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
    sendRecording: process.env.REACT_APP_SEND_RECORDING_URL || 'NOT_SET',
    suggestions: process.env.REACT_APP_SUGGESTIONS_URL || 'NOT_SET',
    blacklist: process.env.REACT_APP_SUGGESTIONS_BLACKLIST_URL || 'NOT_SET',
    basicData: process.env.REACT_APP_BASIC_DATA_URL || 'NOT_SET',
  },
};

export default config;