import React from 'react';
import styles from './Typography.module.css';

function MinorHeadingTitle(props: { children: string }) {
  return (
    <div className={styles.minorTitleWrapper}>
      <h1 className={styles.minorTitle}>{props.children}</h1>
    </div>
  );
}

export default MinorHeadingTitle;
