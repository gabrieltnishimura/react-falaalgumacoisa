import React from 'react';
import styles from './AttentionIcon.module.css';

function AttentionIcon() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.attention}>!</span>
    </div>
  );
}

export default AttentionIcon;