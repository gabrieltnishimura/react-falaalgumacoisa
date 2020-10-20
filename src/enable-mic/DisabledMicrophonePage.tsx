import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RectangularButton from '../shared/buttons/RectangularButton';
import BigCircleIconWrapper from '../shared/icons/BigCircleIconWrapper';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import styles from './EnableMicrophonePage.module.css';

function DisabledMicrophonePage() {
  const navigate = useNavigate();
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);

  useEffect(() => {
    setLoading(false);
  });

  const back = () => {
    navigate('/');
  }

  return (
    <>
      <Header />
      <WhitePageWrapper>
        <div className={styles.content}>
          <h1 className={styles.title}>Parece que não temos permissão para acessar seu microfone ):</h1>
          <h2 className={styles.subtitle}>Acesse as configurações do seu navegador para permitir o uso do microfone do seu dispositivo para o Fale Alguma Coisa</h2>
          <div className={styles.center}>
            <BigCircleIconWrapper icon={<span className={styles.alert}>!</span>} color="orange" />
          </div>
        </div>
        <div className={styles.footer}>
          <RectangularButton title="Voltar" onClick={back}></RectangularButton>
        </div>
      </WhitePageWrapper>
    </>
  );
}

export default DisabledMicrophonePage;