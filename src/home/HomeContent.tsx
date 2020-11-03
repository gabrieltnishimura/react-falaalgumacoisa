import React from 'react';
import { ReactComponent as MicrophoneIcon } from '../assets/icons/mic.svg';
import styles from './HomeContent.module.css';

function HomeContent(props: { redirectRecordingFn: () => void }) {
  return (
    <>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Comece já a sua jornada na ciência!</h1>
      </div>
      <button className={styles.startRecordingWrapper} onClick={props.redirectRecordingFn}>
        <MicrophoneIcon className={styles.startRecordingImg}></MicrophoneIcon>
        <span className={styles.startRecordingText}>Iniciar gravação de voz</span>
      </button>
      <div className={styles.descriptionWrapper}>
        <span className={styles.description}>
          O Fale Alguma Coisa é uma iniciativa colaborativa para criação de uma base de vozes em português brasileiro. Essa base será anônima e open-source para pesquisa e uso pessoal.<br /><br />
          Contribuia para ciência doando a sua voz e utilizando o aplicativo. Compita com outros contribuidores e até adicione amigos.<br /><br />
          O cadastro é opcional, mas pode nos ajudar a categorizar melhor a sua voz.
        </span>
      </div>
    </>
  );
}

export default HomeContent;
