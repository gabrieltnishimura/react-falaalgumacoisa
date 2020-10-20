import React from 'react';
import styles from './AppLogo.module.css';

function AppLogo(props: { black?: boolean, yellow?: boolean, splash?: boolean }) {
  let color = props.black ?
    styles.black : styles.grey;

  if (props.yellow) {
    color = styles.yellow;
  }

  const splash = props.splash ? styles.splash : '';

  return (
    <h1 className={`${styles.logo} ${color} ${splash}`}>fale alguma coisa</h1>
  );
}

export default AppLogo;
