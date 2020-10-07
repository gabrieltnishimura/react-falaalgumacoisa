import React from 'react';
import { ModalContext, ModalContextInterface } from './modal/ModalContext';
import ModalFactory from './modal/ModalFactory';
import { AvailableModalTypes, ModalFirstRecordingCompletedInput, ModalFirstThemeCompletedInput, ModalInputTypes, ModalSkipRecordingInput } from './modal/ModalTypes';
function ModalTestPage() {
  let { handleModal, setPrimaryButtonState } = (React.useContext(ModalContext) as ModalContextInterface);

  const onChangeFormData = (data: any) => {
    setPrimaryButtonState(validate(data));
  }

  const validate = (data: any): boolean => {
    if (!data) {
      return false;
    }

    if (data.namingChoice === 'NAME') {
      return !!data.firstName;
    } else if (data.namingChoice === 'RANDOM_NICKNAME') {
      return !!data.randomName;
    } else if (data.namingChoice === 'ANON') {
      return true;
    }

    return false;
  }

  const confirmButtonFn = () => {
    handleModal();
  }

  const openModal = () => {
    const modalType = ModalInputTypes.FIRST_THEME_COMPLETED;
    const input: ModalFirstRecordingCompletedInput = {
      discriminator: modalType,
      points: '+ 100pts',
      onFormChange: onChangeFormData,
      onButtonClick: confirmButtonFn,
    }
    const content = new ModalFactory().createModalContent(modalType, input);
    handleModal(content);
  }

  const openModal2 = () => {
    const modalType = AvailableModalTypes.FIRST_THEME_COMPLETED;
    const input: ModalFirstThemeCompletedInput = {
      discriminator: modalType,
      points: '+ 100pts',
      onButtonClick: confirmButtonFn,
    }
    const content = new ModalFactory().createModalContent(modalType, input);
    handleModal(content);
    setPrimaryButtonState(true);
  }

  const openModal3 = () => {
    const modalType = AvailableModalTypes.SKIP_RECORDING;
    const input: ModalSkipRecordingInput = {
      discriminator: modalType,
      confirmSkip: confirmButtonFn,
      goBack: confirmButtonFn,
    }
    const content = new ModalFactory().createModalContent(modalType, input);
    handleModal(content);
    setPrimaryButtonState(true);
  }

  return (
    <div>
      <h1>Test Modal</h1>
      <button onClick={openModal}>Open Modal</button>
      <button onClick={openModal2}>Open Modal 2</button>
      <button onClick={openModal3}>Open Modal 3</button>
    </div>
  );
}

export default ModalTestPage;