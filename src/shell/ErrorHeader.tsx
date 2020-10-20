import React from 'react';
import AppLogo from './AppLogo';
import styles from './Header.module.css';
import LinkItem from './LinkItem';

function ErrorHeader(props: {
  link?: {
    title: string,
    onClick: () => void,
  },
  icon?: {
    component: any,
    onClick: () => void,
  },
  logoColor?: 'black' | 'white',
  preventRedirect?: boolean,
}) {
  const redirectHome = () => {
    window.location.href = "/";
  }

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper} onClick={redirectHome}>
        <img src="/logo_light.png" alt='Logo'></img>
        <AppLogo black={props.logoColor === 'black'}></AppLogo>
      </div>
      <div>
        {props.link ?
          <LinkItem title={props.link.title} onclick={props.link.onClick} color="cobalt" ></LinkItem> :
          null}
        {props.icon ?
          <div className={styles.iconWrapper} onClick={props.icon.onClick}>
            {props.icon.component}
          </div> :
          null}
      </div>
    </header>
  );
}

export default ErrorHeader;
