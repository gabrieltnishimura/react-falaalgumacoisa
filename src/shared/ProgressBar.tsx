import React from 'react';
import styles from './ProgressBar.module.css';
import { getBreakpointByPoints } from './ProgressBarService';

function ProgressBar(props: { points: number }) {
  const total = getBreakpointByPoints(props.points);
  const points = props.points;

  const percentStyle = {
    width: Math.round((points * 100) / total) + '%',
  }

  return (
    <div className={styles.progressWrapper}>
      <div className={styles.bar}>
        <div className={styles.progress} style={percentStyle}></div>
      </div>
      <div className={styles.total}>
        <span>{points}/<b>{total}</b></span>
      </div>
    </div>
  );
}

export default ProgressBar;
