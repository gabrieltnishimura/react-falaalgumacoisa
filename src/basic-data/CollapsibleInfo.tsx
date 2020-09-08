import React, { useState } from 'react';
import styles from './CollapsibleInfo.module.css';

function CollapsibleInfo(props: { title: string, content: string, hide: string }) {
  const [showInfo, setShowInfo] = useState(false);
  const enableInfoFn = () => {
    setShowInfo(true);
  }
  const disableInfoFn = () => {
    setShowInfo(false);
  }
  if (!showInfo) {
    return (
      <div className={styles.wrapper}>
        <button onClick={enableInfoFn} className={styles.link}>{props.title}</button>
      </div>
    );
  } else {
    return (
      <div>
        <div className={styles.openWrapper}>
          <span className={styles.content}>{props.content}</span>
          <button onClick={disableInfoFn} className={`${styles.link} ${styles.linkSpacing}`}>{props.hide}</button>
        </div>
      </div>
    );
  }
}

export default CollapsibleInfo;
