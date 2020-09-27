import React from 'react';
import AppLogo from '../shell/AppLogo';
import styles from './RecordingHeader.module.css';

function RecordingHeader() {

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.recordingLogo} src={"logo_light.png"} alt="Microfone sinalizando gravação"></img>
        <AppLogo color="recordingTextGrey"></AppLogo>
      </div>
      <div className={styles.infoButton}><span>i</span></div>
    </div>
  );
}

export default RecordingHeader;
