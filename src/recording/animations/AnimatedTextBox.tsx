import React, { useRef } from 'react';
import { CSSTransition } from "react-transition-group";
import TextBox from '../../shared/TextBox';
import transitions from './AnimatedRecordedContentTransitions.module.css';
import styles from './AnimatedTextBox.module.css';

function AnimatedTextBox(props: {
  mount: boolean,
  text: string,
}) {
  const ref = useRef<any>(null);
  return (
    <CSSTransition
      in={props.mount}
      unmountOnExit
      addEndListener={(done: any) => {
        ref.current?.addEventListener("transitionend", done, false);
      }}
      nodeRef={ref}
      classNames={transitions}
    >
      <div ref={ref} className={styles.initial}>
        <TextBox text={props.text}></TextBox>
      </div>
    </CSSTransition>
  )
}

export default AnimatedTextBox;
