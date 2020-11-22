import React from 'react';
import CardPageWrapper from '../shell/CardPageWrapper';
import DashboardHeader from '../shell/DashboardHeader';
import styles from './DashboardPage.module.css';

function DashboardPageWrapper(props: {
  hideNotifications?: boolean,
  children: any
}) {
  return (
    <>
      <div className={styles.background}></div>
      <DashboardHeader
        hideNotications={props.hideNotifications} />
      <CardPageWrapper>
        {props.children}
      </CardPageWrapper>
    </>
  );
}

export default DashboardPageWrapper;