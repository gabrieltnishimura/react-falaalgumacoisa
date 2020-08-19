import React from 'react';

function SendRecordingButton(props: { pressed: () => void }) {
  return (
    <button onClick={props.pressed}>
      Enviar gravação
    </button>
  );
}

export default SendRecordingButton;
