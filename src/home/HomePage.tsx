import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as wordSuggestionService from '../recording/suggestions/WordSuggestionService';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import useProgressiveImage from '../shared/useProgressiveImage';
import { isDesktop } from '../shared/utils';
import Header from '../shell/Header';
import Footer from '../shell/Footer';
import HomeContent from './HomeContent';
import styles from './HomePage.module.css';
import redirectToRecording from './RecordingRedirectionService';
import SplashContent from './SplashContent';

function HomePage() {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const imageLoaded = useProgressiveImage(isDesktop() ? '/covers/homepage-desktop.jpg' : '/covers/homepage.jpeg');
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
    redirectToRecording(randomizedTheme, navigate);
  }

  const redirectRegisterFn = () => {
    navigate('/cadastro')
  }

  const redirectLoginFn = () => {
    navigate('/login')
  }

  return (
    <>
      <div className={`${styles.banner} ${animate && styles.bannerFadeIn}`}>
        {imageLoaded ?
          <img className={styles.bannerImage} src={imageLoaded} alt='Banner'></img> :
          null}
        <div className={styles.logo}>
          <SplashContent />
        </div>
      </div>
      {animate ? <div className={styles.fadeIn}>
        <div className={styles.header}>
          <Header links={[
            { title: 'Gravar anonimamente', onClick: redirectRecordingFn },
            { title: 'Cadastre-se', onClick: redirectRegisterFn },
            { title: 'Entrar', onClick: redirectLoginFn }
          ]} />
        </div>
        <div className={styles.content}>
          <HomeContent redirectRecordingFn={redirectRecordingFn} />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div> : null}
    </>
  );
}

export default HomePage;
