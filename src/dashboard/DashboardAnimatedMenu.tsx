import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import AppLogo from '../shell/AppLogo';
import DashboardMenu from './DashboardMenu';
import styles from './DashboardMenu.module.css';
import transitions from './DashboardMenuAnimations.module.css';

function DashboardAnimatedMenu(props: {
  show?: boolean,
  close?: () => void,
  notifications?: number,
}) {
  const ref = useRef<any>(null);

  return (
    <>
      {props.show ? <div className={styles.background} onClick={props.close}></div> : null}
      <CSSTransition
        in={props.show}
        unmountOnExit
        addEndListener={(done: any) => {
          ref.current?.addEventListener("transitionend", done, false);
        }}
        nodeRef={ref}
        classNames={transitions}
      >
        <div className={styles.overlay} ref={ref}>
          <div className={styles.header}>
            <AppLogo black />
            <button className={styles.closeIcon} onClick={props.close} >
              <CloseIcon />
            </button>
          </div>
          <DashboardMenu closeMenu={props.close} notifications={props.notifications}></DashboardMenu>
        </div>
      </CSSTransition>
    </>
  );
}

export default DashboardAnimatedMenu;