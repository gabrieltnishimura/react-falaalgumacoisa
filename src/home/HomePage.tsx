import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import useProgressiveImage from '../shared/useProgressiveImage';
import { isDesktop } from '../shared/utils';
import Header from '../shell/Header';
import Footer from '../shell/Footer';
import HomeContent from './HomeContent';
import HomeMission from './components/HomeMission';
import styles from './HomePage.module.css';
import redirectToRecording from './RecordingRedirectionService';
import SplashContent from './SplashContent';
import { useRandomGroup } from './hooks/useRandomGroup';
import ErrorPage from '../error/ErrorPage';

function HomePage() {
  const { setLoading } = React.useContext(LoaderContext) as LoaderContextInterface;
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const imageLoaded = useProgressiveImage(
    isDesktop() ? '/covers/homepage-desktop.jpg' : '/covers/homepage.jpeg',
  );
  const { group: randomizedTheme, isError } = useRandomGroup();

  useEffect(() => {
    // wait for image and theme to load
    if (imageLoaded && randomizedTheme) {
      setLoading(false); // each page has to implement its own stop loading logic
      setAnimate(true);
    }
  }, [imageLoaded, randomizedTheme, setLoading]);

  const redirectRecordingFn = () => {
    if (!randomizedTheme) {
      return;
    }
    redirectToRecording(randomizedTheme, navigate);
  };

  const redirectRegisterFn = () => {
    navigate('/cadastro');
  };

  const redirectLoginFn = () => {
    navigate('/login');
  };

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className={`${styles.banner} ${animate && styles.bannerFadeIn}`}>
        {imageLoaded ? (
          <img className={styles.bannerImage} src={imageLoaded} alt="Banner"></img>
        ) : null}
        <div className={styles.logo}>
          <SplashContent />
        </div>
      </div>
      {animate ? (
        <div className={styles.fadeIn}>
          <div className={styles.header}>
            <Header
              links={[
                { title: 'Gravar anonimamente', onClick: redirectRecordingFn },
                { title: 'Cadastre-se', onClick: redirectRegisterFn },
                { title: 'Entrar', onClick: redirectLoginFn },
              ]}
            />
          </div>
          <div className={styles.content}>
            <HomeContent redirectRecordingFn={redirectRecordingFn} />
            <HomeMission />
          </div>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default HomePage;
