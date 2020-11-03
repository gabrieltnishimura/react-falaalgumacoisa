import React from "react";
import styles from './ActionButtons.module.css';
import RectangularButton from './RectangularButton';

export interface ActionButtonsInput {
  primary: {
    title: string,
    enabled: boolean,
    onClick: () => void,
  }
  secondary: {
    title: string,
    disabled: boolean,
    onClick: () => void,
  }
}

function ActionButtons(props: ActionButtonsInput) {
  return (
    <div className={styles.action}>
      {props.primary ? <RectangularButton
        title={props.primary.title}
        onClick={props.primary.onClick}
        primary
        disabled={!props.primary.enabled}
      ></RectangularButton> : null}
      {props.secondary ? <RectangularButton
        title={props.secondary.title}
        onClick={props.secondary.onClick}
        disabled={props.secondary.disabled}
      ></RectangularButton> : null}
    </div>
  );
}

export default ActionButtons;