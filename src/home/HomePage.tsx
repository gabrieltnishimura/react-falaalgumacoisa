import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TermsOfServiceModal from '../modal/TermsOfServiceModal';
import * as wordSuggestionService from '../recording/suggestions/WordSuggestionService';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import useProgressiveImage from '../shared/useProgressiveImage';
import { checkMicPermissions } from '../shared/utils';
import Header from '../shell/Header';
import HomeContent from './HomeContent';
import styles from './HomePage.module.css';
import SplashContent from './SplashContent';

function HomePage() {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [tos, setToS] = useState(false);
  const imageLoaded = useProgressiveImage('/splash-cover.jpg')
  const [randomizedTheme, setRandomizedTheme] = useState<string>('');

  useEffect(() => {
    // wait for image and theme to load
    if (imageLoaded && randomizedTheme) {
      setLoading(false); // each page has to implement its own stop loading logic
      setAnimate(true);
    }
  }, [imageLoaded, randomizedTheme, setLoading]);

  useEffect(() => {
    const getRandomGroup = async () => {
      const theme = await wordSuggestionService.getRandomGroup();
      setRandomizedTheme(theme);
    };
    getRandomGroup();
  }, []);

  const redirectRecordingFn = () => {
    if (localStorage.getItem('tos')) {
      const grantedFn = () => {
        navigate(`/fale/${randomizedTheme}`);
      }

      const notGrantedFn = () => {
        navigate(`/habilitar-microfone`, { state: { theme: randomizedTheme } });
      }

      checkMicPermissions(grantedFn, notGrantedFn);
    } else {
      setToS(true);
    }
  }

  const redirectLoginFn = () => {
    navigate('/login')
  }

  const agree = () => {
    localStorage.setItem('tos', 'agreed');
    redirectRecordingFn();
  }

  const disagree = () => {
    setToS(false);
  }

  return (
    <>
      <div className={styles.banner}>
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
      {animate ? <div>
        <div className={styles.header}>
          <Header link={{ title: 'Entrar', onClick: redirectLoginFn }} />
        </div>
        <div className={styles.content}>
          <HomeContent redirectRecordingFn={redirectRecordingFn} />
        </div>
      </div> : null}
      {tos ? <TermsOfServiceModal onAgree={agree} onDisagree={disagree} /> : null}
    </>
  );
}

export default HomePage;
