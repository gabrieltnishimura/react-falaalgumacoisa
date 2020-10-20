import React from 'react';
import AppLogo from '../shell/AppLogo';
import styles from './SplashContent.module.css';

function SplashContent() {

  // the current logo has colored borders, pay attention when replacing to the new one
  return (
    <div className={styles.content}>
      <div>
        <div className={styles.horizontallyCenter}>
          <img src={'logo.png'} className={styles.logo} alt='Logo'></img>
        </div>
        <div className={styles.logoWrapper}>
          <AppLogo yellow splash></AppLogo>
        </div>
        <div>
          <span className={styles.subtitle}>O seu português à ciência em 15 minutos</span>
        </div>
      </div>
    </div>
  );
}

export default SplashContent;
