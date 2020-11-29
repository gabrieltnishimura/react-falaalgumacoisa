import React from 'react';
import ActionButtons, { ActionButtonsInput } from '../shared/buttons/ActionButtons';
import styles from './FormPageWrapper.module.css';
import WhitePageWrapper from './WhitePageWrapper';

function FormPageWrapper(props: {
  children: JSX.Element | JSX.Element[],
  buttons?: ActionButtonsInput,
  image?: {
    src: string,
    alt: string,
  },
}) {
  return (
    <WhitePageWrapper>
      <div className={styles.content}>
        <div className={styles.form}>
          {props.children}
        </div>
        {props.image ? <div className={styles.image}>
          <img src={props.image.src} alt={props.image.alt} />
        </div> : null}
      </div>
      {props.buttons ? <ActionButtons
        primary={props.buttons.primary}
        secondary={props.buttons.secondary}
      ></ActionButtons> : null}
    </WhitePageWrapper>
  );
}




export default FormPageWrapper;
