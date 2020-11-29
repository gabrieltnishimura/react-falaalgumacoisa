import React, { useContext } from 'react';
import { UserContext } from '../authentication/UserProvider';
import CardPageWrapper from '../shell/CardPageWrapper';
import DashboardHeader from '../shell/DashboardHeader';
import DashboardMenu from './DashboardMenu';
import styles from './DashboardPage.module.css';

function DashboardPageWrapper(props: {
  hideNotifications?: boolean,
  score?: number,
  children: any,
}) {
  const authenticationState = useContext(UserContext);
  const notifications = authenticationState?.metadata?.notifications.length || 0;

  return (
    <>
      <div className={styles.background}></div>
      <DashboardHeader
        score={props.score}
        notifications={notifications}
        hideNotications={props.hideNotifications} />
      <CardPageWrapper>
        <div className={styles.desktopGrid}>
          <div className={styles.desktopMenu}>
            <DashboardMenu notifications={notifications} />
          </div>
          <div>
            {props.children}
          </div>
        </div>
      </CardPageWrapper>
    </>
  );
}

export default DashboardPageWrapper;