import React, { useEffect } from 'react';
import RectangularButton from '../shared/buttons/RectangularButton';
import AttentionIcon from '../shared/icons/AttentionIcon';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import ErrorHeader from '../shell/ErrorHeader';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import styles from './ErrorPage.module.css';

function ErrorPage() {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);

  useEffect(() => {
    setLoading(false);
  });

  const back = () => {
    window.location.href = "/";
  }

  return (
    <>
      <ErrorHeader />
      <WhitePageWrapper>
        <div className={styles.content}>
          <AttentionIcon></AttentionIcon>
          <h1 className={styles.title}>Não foi possível carregar a aplicação</h1>
          <RectangularButton title="Tentar novamente" onClick={back} primary></RectangularButton>
        </div>
      </WhitePageWrapper>
      <div className={styles.footer}>
        <img src="/splash-cover.jpg" alt="cover" />
      </div>
    </>
  );
}

export default ErrorPage;