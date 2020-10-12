import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import useProgressiveImage from '../shared/useProgressiveImage';
import Header from '../shell/Header';
import HomeContent from './HomeContent';
import styles from './HomePage.module.css';
import SplashContent from './SplashContent';

let once = false;

function HomePage() {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [skipAnimations, setSkipAnimations] = useState(false);
  const imageLoaded = useProgressiveImage('/splash-cover.png')
  const navigationTimeout = 800;

  useEffect(() => {
    if (imageLoaded) {
      setLoading(false); // each page has to implement its own stop loading logic
      if (once) {
        setSkipAnimations(true);
        return;
      }
      setTimeout(() => {
        setAnimate(true);
        once = true;
      }, navigationTimeout);
    }
  }, [imageLoaded, setLoading]);


  const redirectLoginFn = () => {
    navigate('/login')
  }

  return (
    <div className={`${skipAnimations ? styles.skip : animate ? styles.animation : ''}`}>
      <div className={styles.banner}>
        <div className={styles.header}>
          <Header link={{ title: 'Entrar', onClick: redirectLoginFn }} />
        </div>
        {imageLoaded ?
          <img className={styles.bannerImage} src={imageLoaded} alt='Banner'></img> :
          null}
      </div>
      <div className={styles.carossel}>
        <div className={styles.splash}>
          <div className={styles.logo}>
            <SplashContent />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <HomeContent />
      </div>
    </div>
  );
}

export default HomePage;
