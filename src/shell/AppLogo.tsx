import React from 'react';
import styles from './AppLogo.module.css';

function AppLogo(props: { black?: boolean }) {
  const color = props.black ?
    styles.black : styles.grey;

  return (
    <h1 className={`${styles.logo} ${color}`}>fala alguma coisa</h1>
  );
}

export default AppLogo;
