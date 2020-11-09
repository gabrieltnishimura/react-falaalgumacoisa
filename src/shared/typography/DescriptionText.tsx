import React from 'react';
import styles from './Typography.module.css';

function DescriptionText(props: { children: string }) {
  return (
    <div className={styles.descriptionWrapper}>
      <span className={styles.description}>{props.children}</span>
    </div>
  );
}

export default DescriptionText;
