import React from 'react';
import styles from './PageWrapper.module.css';

function CobaltPageWrapper(props: { children: any }) {
  return (
    <div className={`${styles.pageWrapper} ${styles.cobaltBackground}`}>
      {props.children}
    </div>
  );
}

export default CobaltPageWrapper;
