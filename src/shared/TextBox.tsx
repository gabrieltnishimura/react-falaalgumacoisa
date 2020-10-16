import React from 'react';
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styles from './TextBox.module.css';
import transitions from './TextBoxTransitions.module.css';

function TextBox(props: { text: string }) {
  const nodeRef = React.useRef<any>(null);

  return (
    <SwitchTransition mode="out-in" >
      <CSSTransition
        nodeRef={nodeRef}
        key={props.text}
        addEndListener={(done: any) => {
          nodeRef.current?.addEventListener("transitionend", done, false);
        }}
        unmountOnExit
        classNames={transitions}
      >
        <div ref={nodeRef}>
          <div className={styles.box}>
            <span className={styles.text}>{props.text}</span>
          </div>
        </div>
      </CSSTransition>
    </SwitchTransition >
  );
}

export default TextBox;
