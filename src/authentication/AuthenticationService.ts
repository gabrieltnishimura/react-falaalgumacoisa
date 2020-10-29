import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import config from '../config';
import UserModel from './UserModel';


const app = firebase.initializeApp(config.firebaseConfig);
console.log('initialized', app);
const auth = app.auth();
let _user: UserModel;
let _provider: firebase.auth.AuthProvider;

const authenticationService = {
  start: () => {
    var uiConfig = {
      autoUpgradeAnonymousUsers: true,
      signInSuccessUrl: '',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
      signInFlow: 'redirect',
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: '<your-tos-url>',
      // Privacy policy url/callback.
      privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
      }
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  },
  login: (type: 'facebook' | 'google'): Promise<void> => {
    _provider = type === 'google' ?
      new firebase.auth.GoogleAuthProvider() :
      new firebase.auth.FacebookAuthProvider();
    (_provider as firebase.auth.GoogleAuthProvider || firebase.auth.FacebookAuthProvider).addScope('profile');
    (_provider as firebase.auth.GoogleAuthProvider || firebase.auth.FacebookAuthProvider).addScope('email');
    auth.languageCode = 'pt';
    return auth.signInWithRedirect(_provider);
  },
  loginWithUsername: (username: string, password: string) => {
    return auth.signInWithEmailAndPassword(username, password);
  },
  createUserWithEmailAndPassword: (username: string, password: string) => {
    return auth.createUserWithEmailAndPassword(username, password);
  },
  anonymousLogin: () => {
    console.log('logging in anonymously');
    return auth.signInAnonymously();
  },
  logout: () => {
    console.log('logging off');
    return auth.signOut();
  },
  getRedirect: async () => {
    console.log("redirect pls");
    return auth.getRedirectResult().then(function (result) {
      console.log('thing', result);
      return Promise.resolve(result);
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
      return Promise.reject(error);
    });
  },
  linkUser: async (credential: firebase.auth.UserCredential) => {

    console.log(credential.credential, _user, _provider, auth.currentUser);
    if (credential.credential && _user.user) {
      return _user.user.linkWithCredential(credential.credential);
    }
    return Promise.reject('');
    // return auth.currentUser?.linkWithRedirect(_provider);
  },
  delete: () => {
    return auth.currentUser?.delete();
  },
  setUser: (user: UserModel) => {
    _user = user;
  },
  getUser: (): UserModel => {
    return _user;
  }
};

const setAnonymousCredential = (credential: firebase.auth.AuthCredential) => {
  console.log('anon set', credential);
  sessionStorage.setItem('anonymousCredential', JSON.stringify(credential));
}

const getAnonymousProvider = () => {
  const credentialString = sessionStorage.getItem('anonymousCredential');
  if (!credentialString) {
    return null;
  }

  const pendingCredential: any = JSON.parse(credentialString);
  let provider: firebase.auth.AuthProvider | null = null;
  if (pendingCredential.provider === "facebook.com") {
    provider = firebase.auth.FacebookAuthProvider.credential(pendingCredential);
  } else if (pendingCredential.provider === "google.com") {
    provider = firebase.auth.GoogleAuthProvider.credential(pendingCredential);
  }
  return provider;
}

export {
  authenticationService,
  auth,
};
