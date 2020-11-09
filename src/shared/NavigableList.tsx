import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LoaderContext, LoaderContextInterface } from './loader/LoaderContext';
import styles from './NavigableList.module.css';

export interface NavigableListInput {
  title?: string,
  list: {
    title: string,
    url: string,
    rightIcon?: any,
  }[],
  onSameRoute?: () => void,
}

function NavigableList(props: NavigableListInput) {
  const location = useLocation();
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);

  const checkSameRoute = (url: string) => {
    if (url === location.pathname && props.onSameRoute) {
      props.onSameRoute();
    } else {
      setLoading(true);
    }
  }

  const items = props.list.map(item => <li className={styles.item} key={item.title}>
    <Link to={item.url} onClick={() => checkSameRoute(item.url)}>{item.title}</Link>
  </li>);

  return (
    <div className={styles.wrapper}>
      {props.title ? <div className={styles.titleWrapper}>
        <span className={styles.title}>{props.title}</span>
      </div> : null}
      <ul className={styles.list}>
        {items}
      </ul>
    </div>
  );
}

export default NavigableList;
