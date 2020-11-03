import React from 'react';
import styles from './Typography.module.css';

function SectionTitle(props: { children: string }) {
  return (
    <div className={styles.sectionWrapper}>
      <h2 className={styles.sectionTitle}>{props.children}</h2>
    </div>
  );
}

export default SectionTitle;
