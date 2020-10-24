import React, { useState } from "react";
import RecordingStateModel from "../recording/models/RecordingStateModel";
import { skipPhrase } from "../recording/RecordingIntegrationService";
import { LoaderContext, LoaderContextInterface } from "../shared/loader/LoaderContext";
import Modal from './Modal';
import SkipRecordingModalContent, { SkipRecordingOutput } from './SkipRecordingModalContent';

interface SkipRecordingInput {
  recordingState: RecordingStateModel,
  onClose: (skipped: boolean) => void,
}

function SkipRecordingModal(props: SkipRecordingInput) {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [skipReason, setSkipReason] = useState<SkipRecordingOutput>({ reason: '', customReason: '' });

  const confirmSkipPhraseFn = async () => {
    if (!skipReason?.reason) {
      console.error('Invalid parameters to skip', skipReason);
      return;
    }

    setLoading(true);
    await skipPhrase(
      props.recordingState.phrase,
      props.recordingState.groupId,
      skipReason.reason,
      skipReason.customReason,
    );
    setLoading(false);
    props.onClose(true);
  }

  const cancelSkipPhraseFn = () => {
    props.onClose(false);
  }

  return (
    <Modal
      title="Pular frase"
      subtitle="Gostaria de colocar o porquê decidiu pular essa frase? Estamos trabalhando para melhorar a qualidade do conteúdo da nossa aplicação."
      primaryButton={{
        title: 'Continuar',
        enabled: !!skipReason?.reason,
        onClick: confirmSkipPhraseFn,
      }}
      secondaryButton={{
        title: 'Voltar',
        disabled: false,
        onClick: cancelSkipPhraseFn,
      }}>
      <SkipRecordingModalContent onChange={setSkipReason} />
    </Modal>
  );
}

export default SkipRecordingModal;