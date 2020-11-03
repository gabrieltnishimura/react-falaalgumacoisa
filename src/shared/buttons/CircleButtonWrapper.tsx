import React from 'react';
import styles from './CircleButtonWrapper.module.css';

function CircleButtonWrapper(props: {
  children: any,
  success?: boolean,
}) {
  return (
    <div className={`${styles.button} ${props.success ? styles.success : styles.default}`}>
      {props.children}
    </div>
  );
}

export default CircleButtonWrapper;
