import React, { useEffect, useState } from 'react';
import { authenticationService } from '../authentication/AuthenticationService';
import CobaltPageWrapper from '../shell/CobaltPageWrapper';
import FacebookLoginButton from './FacebookLoginButton';
import GoogleLoginButton from './GoogleLoginButton';
import styles from './SplashPage.module.css';
import useProgressiveImage from './useProgressiveImage';

function SplashPage() {
  const [loaded, setLoaded] = useState(false);
  const imageLoaded = useProgressiveImage('/cover.png')
  const navigationTimeout = 1000;

  useEffect(() => {
    if (imageLoaded) {
      setTimeout(() => {
        setLoaded(true);
      }, navigationTimeout);
    }
  }, [imageLoaded]);

  const fbClick = () => {
    if (!loaded) {
      return;
    }
    authenticationService.login('facebook');
  }

  const googleClick = () => {
    if (!loaded) {
      return;
    }
    authenticationService.login('google');
  }

  return (
    <CobaltPageWrapper>
      <div className={`${loaded ? styles.postAnimation : styles.preAnimation} ${styles.contentWrapper}`}>
        <div className={`${styles.header} ${styles.baseHeader}`}>
          <div className={styles.title}>
            <div className={styles.logoWrapper}>
              <img src={'logo.png'} className={styles.logo} alt='Logo fala alguma coisa'></img>
            </div>
            <h1>fala alguma coisa</h1>
          </div>
          <div className={styles.subtitle}>
            <span>O seu português à ciência em 15 minutos</span>
          </div>
        </div>
        <div className={styles.buttons}>
          <FacebookLoginButton click={fbClick}></FacebookLoginButton>
          <GoogleLoginButton click={googleClick}></GoogleLoginButton>
        </div>
        {imageLoaded ?
          <div className={`${styles.cover} ${styles.animatedCover}`}
            style={{ backgroundImage: `url(${imageLoaded})` }}></div> : null}
      </div>
    </CobaltPageWrapper>
  );
}

export default SplashPage;
