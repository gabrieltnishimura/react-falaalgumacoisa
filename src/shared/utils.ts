import { Location } from 'history';
import { UserContextInput } from '../authentication/UserProvider';

const getAudioFormat = (() => {
  const preferredFormat = 'audio/ogg; codecs=opus';
  const audio = document.createElement('audio');
  const format = audio.canPlayType(preferredFormat) ? preferredFormat : 'audio/wav';
  return function getAudioFormat() {
    return format;
  };
})();

const timeToDuration = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const remainingSeconds = Math.floor(timeInSeconds - minutes * 60);
  const padLeft = (str: any, pad: string, length: number) => {
    return (new Array(length + 1).join(pad) + str).slice(-length);
  };
  return `${minutes}:${padLeft(remainingSeconds, '0', 2)}`;
};

const isEmail = (text: string): boolean => {
  if (!text) {
    return false;
  }

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(text).toLowerCase());
};

const checkMicPermissions = (ok: () => void, nok: () => void) => {
  const permissionsApi = navigator?.permissions?.query;
  if (!permissionsApi) {
    nok();
    return;
  }

  navigator?.permissions
    ?.query({ name: 'microphone' } as any)
    .then(permission => {
      if (!permission) {
        nok();
      }

      console.log('Mic permission:', permission.state); // granted, denied, prompt
      if (permission.state === 'granted') {
        ok();
      } else {
        nok();
      }
    })
    .catch(err => {
      nok();
    });
};

const goHome = (
  authenticationState: UserContextInput,
  navigate: any,
  location: Location,
  setLoading: any,
) => {
  const user = authenticationState.user;

  if (user && (authenticationState?.metadata?.nickname || !user.isAnonymous)) {
    if (location.pathname !== '/dashboard') {
      setLoading(true);
      navigate('/dashboard');
    }
  } else {
    if (location.pathname !== '/') {
      setLoading(true);
      navigate('/');
    }
  }
};

const isDesktop = (): boolean => {
  return window.innerWidth >= 1200;
};

export { getAudioFormat, timeToDuration, isEmail, checkMicPermissions, goHome, isDesktop };
