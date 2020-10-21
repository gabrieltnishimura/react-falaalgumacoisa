import React from 'react';
import cardStyles from './CardPageWrapper.module.css';
import styles from './PageWrapper.module.css';

function CardPageWrapper(props: { children: any }) {
  return (
    <div className={`${styles.pageWrapper} ${styles.whiteBackground} ${cardStyles.roundedCorners} ${cardStyles.useAllHeight}`}>
      {props.children}
    </div>
  );
}

export default CardPageWrapper;
