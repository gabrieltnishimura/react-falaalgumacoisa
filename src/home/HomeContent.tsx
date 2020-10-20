import React from 'react';
import { ReactComponent as MicrophoneIcon } from '../assets/icons/mic.svg';
import styles from './HomeContent.module.css';

function HomeContent(props: { redirectRecordingFn: () => void }) {
  return (
    <>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Comece já a sua jornada na ciência!</h1>
      </div>
      <div className={styles.startRecordingWrapper} onClick={props.redirectRecordingFn}>
        <MicrophoneIcon className={styles.startRecordingImg}></MicrophoneIcon>
        <span className={styles.startRecordingText}>Iniciar gravação de voz</span>
      </div>
      <div className={styles.descriptionWrapper}>
        <span className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam mauris, convallis eu pharetra nec, facilisis id massa. Sed vel libero sed dolor iaculis dignissim. Aenean mollis, est ac malesuada facilisis, est dui bibendum elit, non ornare orci velit sed tortor. Nullam vitae ultricies augue. Donec pellentesque mauris sed felis tristique lacinia. </span>
      </div>
    </>
  );
}

export default HomeContent;
