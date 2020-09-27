import React from 'react';
import styles from './TextBox.module.css';

function TextBox(props: {
  text: string,
}) {
  return (
    <div className={styles.box}>
      <span className={styles.text}>{props.text}</span>
    </div>
  );
}

export default TextBox;
