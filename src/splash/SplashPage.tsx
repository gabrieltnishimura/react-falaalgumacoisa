import React, { useEffect, useState } from 'react';
import authenticationService from '../authentication/AuthenticationService';
import FacebookLoginButton from './FacebookLoginButton';
import GoogleLoginButton from './GoogleLoginButton';
import styles from './SplashPage.module.css';

function SplashPage() {
  const [loaded, setLoaded] = useState(false);
  const navigationTimeout = 1000;

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, navigationTimeout);
  });

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
    <div className={loaded ? styles.postAnimation : styles.preAnimation}>
      <div className={`${styles.header} ${styles.baseHeader}`}>
        <div className={styles.title}>
          <div className={styles.logoWrapper}>
            <img src={'logo.png'} className={styles.logo} alt='Logo fala alguma coisa'></img>
          </div>
          <h1>fala alguma coisa</h1>
        </div>
        <div className={styles.subtitle}>
          <span >O seu português à ciência em 15 minutos</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <FacebookLoginButton click={fbClick}></FacebookLoginButton>
        <GoogleLoginButton click={googleClick}></GoogleLoginButton>
      </div>
      <div className={`${styles.cover} ${styles.animatedCover}`}></div>
    </div>
  );
}

export default SplashPage;
