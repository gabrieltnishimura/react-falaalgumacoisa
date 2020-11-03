import React from 'react';
import styles from './Typography.module.css';

function SectionText(props: { children: string }) {
  return (
    <div className={styles.sectionTextWrapper}>
      <span className={styles.sectionText}>{props.children}</span>
    </div>
  );
}

export default SectionText;
