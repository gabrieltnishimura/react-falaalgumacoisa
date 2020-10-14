import React, { useState } from "react";
import { assignName } from "../recording/RecordingStateService";
import { LoaderContext, LoaderContextInterface } from "../shared/loader/LoaderContext";
import FirstRecordingModalContent, { FirstRecordingModalOutput } from './FirstRecordingModalContent';
import Modal from './Modal';

interface FirstRecordingModalInput {
  onClose: (data?: any) => void,
}

function FirstRecordingModal(props: FirstRecordingModalInput) {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [namingData, setNamingData] = useState<FirstRecordingModalOutput>({ namingChoice: null });

  const chooseNamingFn = async () => {
    const name = namingData.firstName || namingData.randomName;
    if (!name) {
      console.log('Anon user');
      return;
    }

    setLoading(true);
    await assignName(name);
    props.onClose();
  }

  return (
    <Modal
      title="Parabéns pela sua primeira gravação!"
      subtitle="Gostaria de se identificar?"
      scoreChange="+ 100pts"
      headerIcon={{
        src: '/icons/party.svg',
        alt: 'champagne cheers'
      }}
      primaryButton={{
        title: 'Continuar',
        enabled: !!namingData,
        onClick: chooseNamingFn,
      }}>
      <FirstRecordingModalContent onChange={setNamingData} allowAnon />
    </Modal>
  );
}

export default FirstRecordingModal;