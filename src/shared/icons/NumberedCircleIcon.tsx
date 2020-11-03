import React from 'react';
import styles from './NumberedCircleIcon.module.css';

function NumberedCircleIcon(props: { number: number, color: 'orange' | 'gray' }) {
  const color = props.color === 'orange' ? styles.orange : styles.gray;

  return (
    <div className={`${styles.wrapper} ${color}`}>
      <span className={styles.number}>{props.number}</span>
    </div>
  );
}

export default NumberedCircleIcon;