import React from "react";
import RectangularButton from '../shared/buttons/RectangularButton';
import styles from './Modal.module.css';

export interface ModalInput {
  title: string,
  subtitle?: string,
  headerIcon?: any,
  scoreChange?: string,
  primaryButton: {
    title: string,
    enabled: boolean,
    onClick: () => void,
  },
  secondaryButton?: {
    title: string,
    disabled: boolean,
    onClick: () => void,
  },
  children?: any,
};

const Modal: React.FC<ModalInput> = ({
  title,
  subtitle,
  headerIcon,
  scoreChange,
  primaryButton,
  secondaryButton,
  children,
}) => {
  const header = headerIcon ? <div className={styles.header}>{headerIcon}</div> : null;
  const bodyStyle = `${styles.body} ${header ? '' : styles.noHeader}`;
  const contentStyle = `${styles.content} ${!!children ? '' : styles.noContent}`;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          <div className={bodyStyle}>
            <div className={contentStyle}>
              {scoreChange ? <div className={styles.scoreChange}>
                <span className={styles.scoreTitle}>{scoreChange}</span>
              </div> : null}
              <div className={styles.titleWrapper}>
                <h1 className={styles.title}>{title}</h1>
                {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
              </div>
              {children}
            </div>
            <div className={styles.actions}>
              {primaryButton ? <RectangularButton
                title={primaryButton.title}
                onClick={primaryButton.onClick}
                primary
                disabled={!primaryButton.enabled}
              ></RectangularButton> : null}
              {secondaryButton ? <RectangularButton
                title={secondaryButton.title}
                onClick={secondaryButton.onClick}
                disabled={secondaryButton.disabled}
              ></RectangularButton> : null}
            </div>
          </div>
          {header}
        </div>
      </div>
    </div>
  );
};

export default Modal;
