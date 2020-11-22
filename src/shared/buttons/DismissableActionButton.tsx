import React from 'react';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import styles from './DismissableActionButton.module.css';
import RectangularButton from './RectangularButton';

function DismissableActionButton(props: {
  initials: string,
  content: any,
  buttonTitle: string,
  onClick: () => void,
  onClose: () => void,
  primary: boolean,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dismissButton}>
        <button className={styles.closeIcon} onClick={props.onClose} >
          <CloseIcon />
        </button>
      </div>
      <div className={styles.content}>
        <div>
          <div className={styles.bubble}>
            <span>{props.initials}</span>
          </div>
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.text}>
            {props.content}
          </div>
          <div className={styles.action}>
            <RectangularButton title={props.buttonTitle} onClick={props.onClick}
              primary={props.primary} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DismissableActionButton;
