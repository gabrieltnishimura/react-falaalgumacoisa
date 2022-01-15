import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../authentication/UserProvider';
import ConfirmExitModal from '../modal/ConfirmExitModal';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import { goHome } from '../shared/utils';
import AppLogo from './AppLogo';
import styles from './Header.module.css';
import LinkItem from './LinkItem';

function Header(props: {
  links?: {
    title: string,
    onClick: () => void,
  }[],
  icon?: any,
  logoColor?: 'black' | 'white',
  preventRedirect?: boolean,
}) {
  const authenticationState = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const redirectHome = () => {
    if (props.preventRedirect) {
      setShowConfirmModal(true);
    } else {
      goHome(authenticationState, navigate, location, setLoading);
    }
  }

  const closeModalFn = (confirmedExit: boolean) => {
    setShowConfirmModal(false);
    if (confirmedExit) {
      setLoading(true);
      goHome(authenticationState, navigate, location, setLoading);
    }
  }

  return (
    <header className={styles.header}>
      <button className={styles.logoWrapper} onClick={redirectHome}>
        <img src="/logo_light.png" alt='Logo'></img>
        <AppLogo black={props.logoColor === 'black'}></AppLogo>
      </button>
      <div className={styles.links}>
        {props.links?.map(link => (
          <LinkItem title={link.title} onclick={link.onClick} color="cobalt" ></LinkItem>
        ))}
        {props.icon ? props.icon : null}
      </div>
      {showConfirmModal ? <ConfirmExitModal onClose={closeModalFn} /> : null}
    </header>
  );
}

export default Header;
