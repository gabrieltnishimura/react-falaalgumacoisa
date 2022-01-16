import React, { useEffect, useState } from 'react';
import { getSimpleStats } from '../../apis/StatsService';
import SimpleStatsModel from '../models/SimpleStatsModel';
import { ReactComponent as MagicIcon } from '../../assets/icons/magic.svg';
import { ReactComponent as TimeIcon } from '../../assets/icons/time.svg';
import styles from './SimpleStats.module.css';

function SimpleStats() {
  const [simpleStats, setSimpleStats] = useState<SimpleStatsModel | undefined>()

  useEffect(() => {
    const fetch = async () => {
      setSimpleStats(await getSimpleStats());
    };

    fetch();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.square} ${styles.green}`}>
        <MagicIcon className={styles.icon} />
        <div>
          <span className={styles.stat}>{simpleStats?.uniqueUsers}</span>
          <span className={styles.description}>pessoas já contribuiram com o Fale Alguma Coisa</span>
        </div>
      </div>
      <div className={`${styles.square} ${styles.orange}`}>
        <TimeIcon className={styles.icon} />
        <div>
          <span className={styles.stat}>{simpleStats?.hoursRecorded}</span>
          <span className={styles.description}>horas de material gravado 100% em português</span>
        </div>
      </div>
    </div>
  );
}

export default SimpleStats;
