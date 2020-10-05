import React from 'react';
import styles from './RectangularButton.module.css';

function RectangularButton(props: {
  title: string,
  primary?: boolean,
  disabled?: boolean,
  onClick: () => void,
}) {
  const relevance = props.primary ? styles.primary : styles.secondary;
  const disabled = props.disabled ? styles.disabled : '';

  return (
    <button
      className={`${styles.button} ${relevance} ${disabled}`}
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
}

export default RectangularButton;
