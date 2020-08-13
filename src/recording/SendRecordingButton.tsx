import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecordingIntegrationService from './RecordingIntegrationService';

function SendRecordingButton(props: { data: Blob | null, word: string }) {
  const service = new RecordingIntegrationService()
  const navigate = useNavigate();
  const click = () => {
    if (!props || !props.data) {
      return;
    }
    service.send(props.data).subscribe(() => {
      navigate('/sucesso', { replace: true });
    })
  }

  return (
    <button onClick={click}>
      Enviar gravação
    </button>
  );
}

export default SendRecordingButton;
