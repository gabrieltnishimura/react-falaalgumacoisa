import React from "react";
import ReactDOM from "react-dom";
import RectangularButton from '../shared/RectangularButton';
import styles from './Modal.module.css';
import { ModalContext, ModalContextInterface } from "./ModalContext";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

const Modal: React.FC<{}> = () => {
  let { modalRef, showModal, modalContent, primaryButtonState } = (React.useContext(ModalContext) as ModalContextInterface);
  const header = modalContent?.icon;
  const hasContent = !!modalContent?.content;

  if (showModal && modalContent) {
    return ReactDOM.createPortal(
      <div
        className={styles.overlay}
      >
        <div ref={modalRef} className={styles.modal}>
          <div className={`${styles.content} ${header ? '' : styles.noHeader} ${hasContent ? '' : styles.noContent}`}>
            {header ? <div className={styles.header}>
              <img src={header.src} alt={header.alt} />
            </div> : null}
            <div>
              {modalContent.scoreChange ? <div className={styles.scoreChange}>
                <span className={styles.scoreTitle}>{modalContent.scoreChange}</span>
              </div> : null}
              <div className={styles.titleWrapper}>
                <h1 className={styles.title}>{modalContent.title}</h1>
                {modalContent.subtitle ? <span className={styles.subtitle}>{modalContent.subtitle}</span> : null}
              </div>
              {modalContent.content}
            </div>
            <div className={styles.actions}>
              {modalContent.buttons.primary ? <RectangularButton
                title={modalContent.buttons.primary.title}
                onClick={modalContent.buttons.primary.onClick}
                primary
                disabled={!primaryButtonState}
              ></RectangularButton> : null}
              {modalContent.buttons.secondary ? <RectangularButton
                title={modalContent.buttons.secondary.title}
                onClick={modalContent.buttons.secondary.onClick}
              ></RectangularButton> : null}
            </div>
          </div>
        </div>
      </div>,
      modalRoot
    );
  } else return null;
};

export default Modal;
