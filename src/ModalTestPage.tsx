import React from 'react';
import FirstRecordingModalContent from './modal/FirstRecordingModalContent';
import { ModalContext, ModalContextInterface } from './modal/ModalContext';

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
    handleModal({
      title: 'Parabéns pela sua primeira gravação!',
      subtitle: 'Gostaria de se identificar?',
      content: <FirstRecordingModalContent onChange={onChangeFormData} />,
      icon: {
        src: 'icons/champagne.png',
        alt: 'champagne cheers'
      },
      scoreChange: '+ 100pts',
      buttons: {
        primary: {
          title: 'Continuar',
          onClick: confirmButtonFn,
        },
      }
    }, false);
  }

  const openModal2 = () => {
    handleModal({
      title: 'Você concluiu o primeiro módulo!',
      scoreChange: '+ 300pts',
      icon: {
        src: 'icons/champagne.png',
        alt: 'champagne cheers'
      },
      buttons: {
        primary: {
          title: 'Avançar',
          onClick: confirmButtonFn,
        },
      }
    }, false);
    setPrimaryButtonState(true);
  }

  const openModal3 = () => {
    handleModal({
      title: 'Pular frase',
      subtitle: 'Gostaria de colocar o porquê decidiu pular essa frase? Estamos trabalhando para melhorar a qualidade do conteúdo da nossa aplicação.',
      content: <></>,
      buttons: {
        primary: {
          title: 'Avançar',
          onClick: confirmButtonFn,
        },
        secondary: {
          title: 'Voltar',
          onClick: confirmButtonFn,
        },
      },
    }, false);
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