import React from "react";
import Modal from './Modal';

interface FirstThemeModalInput {
  onClose: () => void,
}

function FirstThemeModal(props: FirstThemeModalInput) {
  const closeThemeModalFn = () => {
    props.onClose();
  }

  return (
    <Modal
      title="Você concluiu o primeiro módulo!"
      scoreChange="+ 300pts"
      headerIcon={{
        src: '/icons/baloons.svg',
        alt: 'baloons'
      }}
      primaryButton={{
        title: 'Avançar',
        enabled: true,
        onClick: closeThemeModalFn,
      }}>
    </Modal>
  );
}

export default FirstThemeModal;

