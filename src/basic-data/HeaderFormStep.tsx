import React from 'react';
import styles from './HeaderFormStep.module.css';

function HeaderFormStep(props: { title: string, step: string }) {
  return (
    <header className={styles.wrapper}>
      <div className={styles.title}>
        <h1>{props.title}</h1>
      </div>
      <div className={styles.step}>
        <span>{props.step}</span>
      </div>
    </header>
  );
}

export default HeaderFormStep;
