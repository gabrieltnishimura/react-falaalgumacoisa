
let firebaseConfig: any;
try {
  const rawConfig = process.env.REACT_APP_FIREBASE_CONFIG
  if (rawConfig) {
    firebaseConfig = JSON.parse(atob(rawConfig))
  }
} catch (error) {
  console.error('Could not load firebase config');
}

const config = {
  firebaseConfig
};

export default config;