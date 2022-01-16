import React from 'react';
import styles from './LinkItem.module.css';


function getColorStyle(color: string) {
  switch (color) {
    case 'cobalt':
      return styles.dark;
    case 'citron':
      return styles.orange;
    case 'white':
      return styles.white;
    case 'gray':
      return styles.gray;
    default:
      return styles.cobalt;
  }
}

function LinkItem(props: {
  title: string,
  onclick: any,
  color: 'cobalt' | 'citron' | 'white' | 'gray'
}) {
  return (
    <div className={styles.wrapper}>
      <button
        onClick={props.onclick}
        type="button"
        className={`${styles.link} ${getColorStyle(props.color)}`}
      >{props.title}</button>
    </div>
  );
}

export default LinkItem;
