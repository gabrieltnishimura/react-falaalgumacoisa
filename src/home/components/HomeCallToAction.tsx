import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as MicrophoneIcon } from '../../assets/icons/mic.svg';
import styles from './HomeCallToAction.module.css';

function HomeCallToAction(props: { redirectRecordingFn: () => void }) {
  const navigate = useNavigate();

  const redirectLoginFn = () => {
    navigate('/cadastro')
  }

  return (
    <>
      <button className={styles.startRecordingWrapper} onClick={props.redirectRecordingFn}>
        <MicrophoneIcon className={styles.startRecordingImg}></MicrophoneIcon>
        <span className={styles.startRecordingText}>Gravar de maneira anônima</span>
      </button>
      <button className={`${styles.startRecordingWrapper} ${styles.registerWrapper}`} onClick={redirectLoginFn}>
        <span className={`${styles.startRecordingText} ${styles.registerText}`}>Faça seu cadastro</span>
      </button>
    </>
  );
}

export default HomeCallToAction;
