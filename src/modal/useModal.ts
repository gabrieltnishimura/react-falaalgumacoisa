import React, { useEffect, useRef } from "react";
import { ModalContentInterface } from "./ModalContext";

export default () => {
  const modalRef = useRef<any>(null);
  let [showModal, setModalVisibility] = React.useState(false);
  let [isDismissable, setIsDismissable] = React.useState(false);
  let [primaryButtonState, setPrimaryButtonState] = React.useState(false);
  let [modalContent, setModalContent] = React.useState<ModalContentInterface | undefined>({
    title: '',
    subtitle: '',
    icon: {
      src: '',
      alt: '',
    },
    content: null,
    scoreChange: '',
    buttons: {
      primary: {
        title: '',
        onClick: () => { },
      }
    }
  });

  const handleModal = (content?: ModalContentInterface, newIsDismissable?: boolean) => {
    setIsDismissable(!!newIsDismissable);
    if (content) {
      setModalVisibility(true);
      setModalContent(content);
    } else {
      setModalVisibility(false);
    }
  };

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (!isDismissable) {
      return;
    }

    if (event.key === "Escape") {
      setModalVisibility(false);
    }
  };

  const handleClickOutside = (event: any) => {
    if (!isDismissable) {
      return;
    }

    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return {
    modalRef,
    showModal,
    handleModal,
    modalContent,
    setIsDismissable,
    primaryButtonState,
    setPrimaryButtonState,
  };
};
