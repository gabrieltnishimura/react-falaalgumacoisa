import React from 'react';
import CardPageWrapper from '../shell/CardPageWrapper';
import DashboardHeader from '../shell/DashboardHeader';
import DashboardMenu from './DashboardMenu';
import styles from './DashboardPage.module.css';

function DashboardPageWrapper(props: {
  hideNotifications?: boolean,
  score?: number,
  children: any,
}) {
  return (
    <>
      <div className={styles.background}></div>
      <DashboardHeader
        score={props.score}
        hideNotications={props.hideNotifications} />
      <CardPageWrapper>
        <div className={styles.desktopGrid}>
          <div className={styles.desktopMenu}>
            <DashboardMenu notifications={2} />
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