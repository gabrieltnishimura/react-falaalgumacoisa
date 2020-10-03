import * as firebase from 'firebase/app';
import 'firebase/auth';
import { from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import config from '../config';
import UserModel from './UserModel';

const app = firebase.initializeApp(config.firebaseConfig);
const auth = app.auth();
let _user: UserModel;

const authenticationService = {
  login: (type: 'facebook' | 'google'): void => {
    const provider = type === 'google' ?
      new firebase.auth.GoogleAuthProvider() :
      new firebase.auth.FacebookAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    auth.languageCode = 'pt';
    auth.signInWithRedirect(provider);
  },
  anonymousLogin: () => {
    auth.signInAnonymously()
  },

  getLatestState: (): Observable<UserModel | null> => {
    if (!!_user) {
      return of(_user);
    }

    return new Observable(
      observer => {
        try {
          auth.onAuthStateChanged((firebaseUser) => {
            if (!firebaseUser) {
              console.error('Unauthenticated user')
              observer.next(null);
            } else {
              _user = new UserModel(firebaseUser);
              observer.next(_user);
            }
            observer.complete();
          });
        } catch (err) {
          observer.error(err);
          observer.complete();
        }
      }
    );
  },
  getAuthRedirect: (): Observable<UserModel | null> => {
    if (!!_user) {
      return of(_user);
    }

    return from(auth.getRedirectResult())
      .pipe(
        map(result => {
          return result?.user && new UserModel(result?.user);
        }),
        tap(data => {
          if (data) {
            _user = data;
          }
        }),
        catchError(error => {
          console.error('Error fetching auth redirect', error);
          return of(null);
        }),
      );
  },
  logout: (): Observable<void> => {
    return from(auth.signOut());
  },
  isLogged: (): boolean => {
    return !!_user;
  },
  getUser: (): UserModel => {
    return _user;
  },
};

export default authenticationService;