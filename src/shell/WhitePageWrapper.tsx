import React from 'react';
import styles from './PageWrapper.module.css';

function WhitePageWrapper(props: { children: any }) {
  return (
    <div className={`${styles.pageWrapper} ${styles.whiteBackground}`}>
      {props.children}
    </div>
  );
}

export default WhitePageWrapper;
