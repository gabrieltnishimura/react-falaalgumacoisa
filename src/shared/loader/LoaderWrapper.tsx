import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './LoaderWrapper.module.css';

const LoaderWrapper = (props: { loading: boolean }) => {
  return props.loading ?
    <div className={styles.loader}>
      <Loader type="Rings" color="#08bee1" height={200} width={200} />
    </div> :
    null;
};

export default LoaderWrapper;
