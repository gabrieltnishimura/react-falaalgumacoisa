import React from 'react';
import styles from './Typography.module.css';

function HeadingTitle(props: { children: string }) {
  return (
    <div className={styles.titleWrapper}>
      <h1 className={styles.title}>{props.children}</h1>
    </div>
  );
}

export default HeadingTitle;
