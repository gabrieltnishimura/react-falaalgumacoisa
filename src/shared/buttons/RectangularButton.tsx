import React from 'react';
import styles from './RectangularButton.module.css';

function RectangularButton(props: {
  title: string,
  primary?: boolean,
  disabled?: boolean,
  submit?: boolean,
  fullWidth?: boolean,
  onClick: () => void,
}) {
  const relevance = props.primary ? styles.primary : styles.secondary;
  const disabled = props.disabled ? styles.disabled : '';
  const fullWidth = props.fullWidth ? styles.fullWidth : '';

  return (
    <button
      className={`${styles.button} ${relevance} ${disabled} ${fullWidth}`}
      type={props.submit ? 'submit' : 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
}

export default RectangularButton;
