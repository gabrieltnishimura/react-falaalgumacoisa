let firebaseConfig: any;
try {
  const rawConfig = process.env.REACT_APP_FIREBASE_CONFIG;
  if (rawConfig) {
    firebaseConfig = JSON.parse(atob(rawConfig));
  }
} catch (error) {
  console.error('Could not load firebase config');
}

console.log(process.env);

const config = {
  firebaseConfig,
  baseUrl: process.env.REACT_APP_BACKEND_BASE_URL,
  endpoints: {
    phraseGroup: '/phrases/theme',
    randomPhraseGroup: '/phrases/random',
    sendRecording: '/user-recording/send',
    skipRecording: '/user-recording/skip',
    assignName: '/registration/assign-name',
    registration: '/registration/register',
    mergeUserData: '/registration/merge-user-data',
    referralCode: '/registration/referral-code',
    referralFriendName: '/registration/referral-friend-name',
    validateNickname: '/registration/validate-nickname',
    deleteUser: '/registration/remove-user-data',
    userMetadata: '/registration/metadata',
    dashboard: '/dashboard',
    globalLeaderboard: '/leaderboard/global',
    friendsLeaderboard: '/leaderboard/friends',
    searchFriends: '/friends',
    friendsActions: '/friends/actions',
    cleanNotifications: '/notifications/clean',
    simpleStats: '/stats/simple',
  },
};

export default config;
