import React from "react";
import Modal from "./Modal";
import useModal from "./useModal";

export interface ModalContextInterface {
  modalRef: any,
  showModal: boolean;
  handleModal: (
    content?: ModalContentInterface,
    dismissable?: boolean,
  ) => void;
  modalContent?: ModalContentInterface;
  primaryButtonState: boolean,
  setPrimaryButtonState: (state: boolean) => void,
}

export interface ModalContentInterface {
  title: string,
  subtitle?: string,
  icon?: {
    src: string,
    alt: string,
  },
  content?: any,
  scoreChange?: string,
  buttons: {
    primary: {
      title: string,
      onClick: () => void,
    },
    secondary?: {
      title: string,
      onClick: () => void,
    }
  }
}

const ModalContext = React.createContext<ModalContextInterface | null>(null);

const ModalProvider: React.FC<{}> = ({ children }) => {
  let { modalRef, showModal, handleModal, modalContent, primaryButtonState, setPrimaryButtonState } = useModal();
  return (
    <ModalContext.Provider value={{ modalRef, showModal, handleModal, modalContent, primaryButtonState, setPrimaryButtonState }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };

