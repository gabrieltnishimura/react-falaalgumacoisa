import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RectangularButton from '../shared/buttons/RectangularButton';
import AttentionIcon from '../shared/icons/AttentionIcon';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import styles from './ErrorPage.module.css';

function ErrorPage() {
  const navigate = useNavigate();
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);

  useEffect(() => {
    setLoading(false);
  });

  const back = () => {
    navigate(-1);
  }

  return (
    <>
      <Header />
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