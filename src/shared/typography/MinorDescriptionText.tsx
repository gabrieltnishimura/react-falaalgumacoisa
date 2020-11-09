import React from 'react';
import styles from './Typography.module.css';

function MinorDescriptionText(props: { children: string }) {
  return (
    <div className={styles.minorDescriptionWrapper}>
      <span className={styles.minorDescription}>{props.children}</span>
    </div>
  );
}

export default MinorDescriptionText;
