import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Toasty.module.css';
import transitions from './ToastyTransitions.module.css';

export interface ToastyInput {
  text: string;
  color: 'green' | 'red';
  done?: () => void;
}

function Toasty(props: ToastyInput) {
  return (
    <CSSTransition
      appear
      timeout={1000}
      classNames={transitions}
    >
      <div className={styles.toasty}>
        <span className={styles.text}>{props.text}</span>
      </div>
    </CSSTransition >
  );
}

export default Toasty;
