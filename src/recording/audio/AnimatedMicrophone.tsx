import React, { useRef } from 'react';
import { CSSTransition } from "react-transition-group";
import transitions from './AnimatedMicrophoneTransitions.module.css';
import Microphone from './Microphone';

export interface AnimatedMicrophoneInput {
  mount: boolean,
  started: () => void;
  finished: (e: Blob, durationMs: number) => void;
}

function AnimatedMicrophone(props: AnimatedMicrophoneInput) {
  const ref = useRef<any>(null);
  return (
    <>
      <CSSTransition
        in={props.mount}
        unmountOnExit
        addEndListener={(done: any) => {
          ref.current?.addEventListener("transitionend", done, false);
        }}
        nodeRef={ref}
        classNames={transitions}
      >
        <div className={transitions.initial} ref={ref}>
          <Microphone started={props.started} finished={props.finished} />
        </div>
      </CSSTransition>
    </>
  )
}

export default AnimatedMicrophone;
