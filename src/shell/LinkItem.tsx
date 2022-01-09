import React from 'react';
import styles from './LinkItem.module.css';

function LinkItem(props: {
  title: string,
  onclick: any,
  color: 'cobalt' | 'citron' | 'white'
}) {
  const classS = styles[props.color];

  return (
    <div className={styles.wrapper}>
      <button
        onClick={props.onclick}
        type="button"
        className={`${styles.link} ${classS}`}
      >{props.title}</button>
    </div>
  );
}

export default LinkItem;
