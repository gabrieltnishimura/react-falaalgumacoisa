import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmExitModal from '../modal/ConfirmExitModal';
import AppLogo from './AppLogo';
import styles from './Header.module.css';
import LinkItem from './LinkItem';

function Header(props: {
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
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const redirectHome = () => {
    if (props.preventRedirect) {
      setShowConfirmModal(true);
    } else {
      navigate('/');
    }
  }

  const closeModalFn = (confirmedExit: boolean) => {
    setShowConfirmModal(false);
    if (confirmedExit) {
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
          <div className={styles.iconWrapper} onClick={props.icon.onClick}>
            {props.icon.component}
          </div> :
          null}
      </div>
      {showConfirmModal ? <ConfirmExitModal onClose={closeModalFn} /> : null}
    </header>
  );
}

export default Header;
