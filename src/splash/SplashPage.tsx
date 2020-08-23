import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SplashPage.module.css';

function SplashPage() {
  const navigate = useNavigate();
  const navigationTimeout = 4000;

  useEffect(() => {
    setTimeout(() => {
      navigate('/login', { replace: true });
    }, navigationTimeout);
  });

  return (
    <div>
      <div className={styles.logoWrapper}>
        <img src={'logo.png'} className={styles.logo} alt='Logo fala alguma coisa'></img>
      </div>
      <div className={styles.title}>
        <h1>fala alguma coisa</h1>
      </div>
      <div>
        <span className={styles.subtitle}>O seu português à ciência em 15 minutos</span>
      </div>
      <div className={styles.bottomCover}></div>
    </div>
  );
}

export default SplashPage;
