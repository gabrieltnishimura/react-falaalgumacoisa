import React from 'react';
import styles from './Typography.module.css';

export interface ItemizedListInput {
  list: {
    title: string,
    description?: string,
  }[],
  ordered?: boolean,
}

function ItemizedList(props: ItemizedListInput) {
  const content = props.list.map(item =>
    <li className={styles.itemizedItem} key={item.title}>
      <span className={styles.itemizedTitle}>{item.title}</span>
      {item.description ? <span className={styles.itemizedDescription}>{item.description}</span> : null}
    </li>
  )
  return (
    <div className={styles.iteliz}>
      {props.ordered ? <ol className={styles.itemizedList}>{content}</ol> :
        <ul className={styles.itemizedList}>{content}</ul>}
    </div>
  );
}

export default ItemizedList;
