import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../authentication/UserProvider';
import RectangularButton from '../shared/buttons/RectangularButton';
import AttentionIcon from '../shared/icons/AttentionIcon';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import { goHome } from '../shared/utils';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import styles from './ErrorPage.module.css';

function NotFoundPage() {
  const authenticationState = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);

  useEffect(() => {
    setLoading(false);
  });

  const back = () => {
    goHome(authenticationState, navigate, location, setLoading);
  }

  return (
    <>
      <Header />
      <WhitePageWrapper>
        <div className={styles.content}>
          <AttentionIcon></AttentionIcon>
          <h1 className={styles.title}>Página não encontrada</h1>
          <RectangularButton title="Voltar para Home" onClick={back} primary></RectangularButton>
        </div>
      </WhitePageWrapper>
      <div className={styles.footer}>
        <img src="/splash-cover.jpg" alt="cover" />
      </div>
    </>
  );
}

export default NotFoundPage;