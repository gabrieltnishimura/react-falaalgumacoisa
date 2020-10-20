import React from 'react';
import styles from './BigCircleIcon.module.css';

function BigCircleIconWrapper(props: { icon: any, color: 'orange' | 'gray' }) {
  const color = props.color === 'orange' ? styles.orange : styles.gray;

  return (
    <div className={`${styles.wrapper} ${color}`}>
      {props.icon}
    </div>
  );
}

export default BigCircleIconWrapper;