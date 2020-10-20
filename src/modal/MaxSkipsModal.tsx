import React from "react";
import AttentionIcon from "../shared/icons/AttentionIcon";
import Modal from './Modal';

function MaxSkipsModal(props: { onClose: () => void }) {
  return (
    <Modal
      title="Você já pulou a quantidade máxima de frases desse módulo"
      subtitle="Você pode desistir do módulo clicando no logo do Fale Alguma Coisa"
      headerIcon={<AttentionIcon></AttentionIcon>}
      primaryButton={{
        title: 'Ok!',
        enabled: true,
        onClick: () => props.onClose(),
      }}>
    </Modal>
  );
}

export default MaxSkipsModal;