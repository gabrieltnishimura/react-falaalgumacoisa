import React, { useRef } from 'react';
import { CSSTransition } from "react-transition-group";
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
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
            <button className={transitions.trashButton} onClick={props.trash}>
              <CircleButtonWrapper>
                <TrashIcon />
              </CircleButtonWrapper>
            </button>
            <button className={transitions.checkButton} onClick={props.confirm}>
              <CircleButtonWrapper success>
                <CheckIcon />
              </CircleButtonWrapper>
            </button>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default AnimatedRecordedContent;
