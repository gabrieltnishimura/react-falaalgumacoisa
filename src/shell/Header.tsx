import React from 'react';
import styles from './Header.module.css';
import LinkItem from './LinkItem';
import AppLogo from './AppLogo';
import { useNavigate } from 'react-router-dom'

function Header(props: {
  link?: {
    title: string,
    onClick: () => void,
  },
  icon?: {
    src: string,
    onClick: () => void,
  },
  logoColor?: 'black' | 'white',
  preventRedirect?: boolean,
}) {
  const navigate = useNavigate();
  const redirectHome = () => {
    if (props.preventRedirect) {
      console.log("Prevented redirect");
    } else {
      navigate('/');
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper} onClick={redirectHome}>
        <img src="/logo_light.png" alt='Logo fala alguma coisa'></img>
        <AppLogo black={props.logoColor === 'black'}></AppLogo>
      </div>
      <div>
        {props.link ?
          <LinkItem title={props.link.title} onclick={props.link.onClick} color="cobalt" ></LinkItem> :
          null}
        {props.icon ?
          <img src={props.icon.src} alt='icone' onClick={props.icon.onClick}></img> :
          null}
      </div>
    </header>
  );
}

export default Header;
