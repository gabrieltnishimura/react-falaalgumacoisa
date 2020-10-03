import React from 'react';
import Loader from 'react-loader-spinner';

const LoaderWrapper = (props: { children: any, loading: boolean }) => {
  return props.loading ?
    props.children :
    <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
};

export default LoaderWrapper;
