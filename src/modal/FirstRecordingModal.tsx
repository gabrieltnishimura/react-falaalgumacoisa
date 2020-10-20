import React, { useState } from "react";
import { ReactComponent as PartyIcon } from '../assets/icons/party.svg';
import { assignName } from "../recording/RecordingStateService";
import { LoaderContext, LoaderContextInterface } from "../shared/loader/LoaderContext";
import FirstRecordingModalContent from './FirstRecordingModalContent';
import Modal from './Modal';
interface FirstRecordingModalInput {
  onClose: (data?: any) => void,
}

function FirstRecordingModal(props: FirstRecordingModalInput) {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [namingData, setNamingData] = useState('');
  const [anon, setAnon] = useState(false);

  const chooseNamingFn = async () => {
    if (anon || !namingData) {
      props.onClose();
      return;
    }

    setLoading(true);
    await assignName(namingData);
    setLoading(false);
    props.onClose();
  }

  const validFn = (name: string) => {
    setAnon(false);
    setNamingData(name);
  }

  const invalidFn = () => {
    setNamingData('');
  }

  const anonFn = () => {
    setAnon(true);
  }

  return (
    <Modal
      title="Parabéns pela sua primeira gravação!"
      subtitle="Gostaria de se identificar?"
      scoreChange="+ 100pts"
      headerIcon={<PartyIcon />}
      primaryButton={{
        title: 'Continuar',
        enabled: (!!namingData || anon),
        onClick: chooseNamingFn,
      }}>
      <FirstRecordingModalContent
        onValid={validFn}
        onInvalid={invalidFn}
        onAnon={anonFn} />
    </Modal>
  );
}

export default FirstRecordingModal;