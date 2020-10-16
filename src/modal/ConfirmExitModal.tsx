import React from "react";
import Modal from './Modal';

function ConfirmExitModal(props: { onClose: (confirm: boolean) => void }) {
  return (
    <Modal
      title="Deseja sair?"
      subtitle="Seu progresso foi salvo até o momento."
      primaryButton={{
        title: 'Sair',
        enabled: true,
        onClick: () => props.onClose(true),
      }}
      secondaryButton={{
        title: 'Voltar',
        disabled: false,
        onClick: () => props.onClose(false),
      }}>
    </Modal>
  );
}

export default ConfirmExitModal;