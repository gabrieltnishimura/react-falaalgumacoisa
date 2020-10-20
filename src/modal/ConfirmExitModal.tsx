import React from "react";
import AttentionIcon from "../shared/icons/AttentionIcon";
import Modal from './Modal';

function ConfirmExitModal(props: { onClose: (confirm: boolean) => void }) {
  return (
    <Modal
      title="Você realmente deseja voltar para o início?"
      subtitle="Você poderá retomar nesse passo quando quiser"
      headerIcon={<AttentionIcon></AttentionIcon>}
      primaryButton={{
        title: 'Não',
        enabled: true,
        onClick: () => props.onClose(false),
      }}
      secondaryButton={{
        title: 'Sim',
        disabled: false,
        onClick: () => props.onClose(true),
      }}>
    </Modal>
  );
}

export default ConfirmExitModal;