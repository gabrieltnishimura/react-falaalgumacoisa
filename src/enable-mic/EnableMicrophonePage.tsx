import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as MicrophoneIcon } from '../assets/icons/mic.svg';
import RectangularButton from '../shared/buttons/RectangularButton';
import BigCircleIconWrapper from '../shared/icons/BigCircleIconWrapper';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import styles from './EnableMicrophonePage.module.css';

function EnableMicrophonePage() {
  const navigate = useNavigate();
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);

  useEffect(() => {
    setLoading(false);
  });

  const triggerMicrophonePrompt = () => {
    navigate(-1);
  }

  return (
    <>
      <Header />
      <WhitePageWrapper>
        <div className={styles.content}>
          <h1 className={styles.title}>Por favor, habilite o microfone no seu navegador</h1>
          <h2 className={styles.subtitle}>Um aviso aparecerá para que possa aceitar a abertura do seu microfone para o Fale Alguma Coisa</h2>
          <div className={styles.center}>
            <BigCircleIconWrapper icon={<MicrophoneIcon className={styles.mic} />} color="gray" />
          </div>
        </div>
        <div className={styles.footer}>
          <RectangularButton title="Continuar" onClick={triggerMicrophonePrompt} primary></RectangularButton>
        </div>
      </WhitePageWrapper>
    </>
  );
}

export default EnableMicrophonePage;