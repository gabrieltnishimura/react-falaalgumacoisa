
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
    phraseGroup: process.env.REACT_APP_PHRASE_GROUP_URL || 'NOT_SET',
    randomPhraseGroup: process.env.REACT_APP_PHRASE_RANDOM_THEME_URL || 'NOT_SET',
    sendRecording: process.env.REACT_APP_SEND_RECORDING_URL || 'NOT_SET',
    skipRecording: process.env.REACT_APP_SKIP_RECORDING_URL || 'NOT_SET',
    assignName: process.env.REACT_APP_ASSIGN_NAME_URL || 'NOT_SET',
    dashboard: process.env.REACT_APP_DASHBOARD_URL || 'NOT_SET',
    registration: process.env.REACT_APP_REGISTRATION_URL || 'NOT_SET',
  },
};

export default config;