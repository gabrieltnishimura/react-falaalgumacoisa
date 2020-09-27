import React from 'react';
import styles from './CircleButtonWrapper.module.css';

function CircleButtonWrapper(props: {
  children: any,
  click: (e: React.MouseEvent) => void,
  success?: boolean,
}) {
  return (
    <div onClick={props.click} className={`${styles.button} ${props.success ? styles.success : styles.default}`}>
      {props.children}
    </div>
  );
}

export default CircleButtonWrapper;
