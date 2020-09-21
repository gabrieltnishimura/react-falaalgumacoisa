import React from 'react';
import styles from './AppLogo.module.css';

function AppLogo(props: { color: string }) {
  const color = props.color === 'recordingTextGrey' ?
    styles.grey : styles.grey;


  return (
    <h1 className={`${styles.logo} ${color}`}>fala alguma coisa</h1>
  );
}

export default AppLogo;
