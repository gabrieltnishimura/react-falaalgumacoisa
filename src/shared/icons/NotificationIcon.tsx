import React from 'react';
import styles from './NotificationIcon.module.css';

function NotificationIcon() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.notification}>!</span>
    </div>
  );
}

export default NotificationIcon;