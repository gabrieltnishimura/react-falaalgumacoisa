import React, { useRef } from 'react';
import { CSSTransition } from "react-transition-group";
import CircleButtonWrapper from '../../shared/buttons/CircleButtonWrapper';
import TextBox from '../../shared/TextBox';
import AudioPlayer from '../audio/AudioPlayer';
import transitions from './AnimatedRecordedContentTransitions.module.css';

function AnimatedRecordedContent(props: {
  mount: boolean,
  text: string,
  blob: Blob | null,
  trash: () => void,
  confirm: () => void,
}) {
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
        <div ref={ref}>
          <div className={transitions.toasty}>
            <TextBox text={props.text}></TextBox>
          </div>
          <div className={transitions.player}>
            <AudioPlayer data={props.blob}></AudioPlayer>
          </div>
          <div className={transitions.actionButtons}>
            <div>
              <CircleButtonWrapper click={props.trash}>
                <img src="/icons/trash.svg" alt="trashcan"></img>
              </CircleButtonWrapper>
            </div>
            <div>
              <CircleButtonWrapper click={props.confirm} success>
                <img src="/icons/check.svg" alt="check"></img>
              </CircleButtonWrapper>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default AnimatedRecordedContent;
