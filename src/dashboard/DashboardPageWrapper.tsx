import React from 'react';
import CardPageWrapper from '../shell/CardPageWrapper';
import DashboardHeader from '../shell/DashboardHeader';
import styles from './DashboardPage.module.css';

function DashboardPageWrapper(props: { children: any }) {
  return (
    <>
      <div className={styles.background}></div>
      <DashboardHeader />
      <CardPageWrapper>
        {props.children}
      </CardPageWrapper>
    </>
  );
}

export default DashboardPageWrapper;