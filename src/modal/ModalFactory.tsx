import React from 'react';
import FirstRecordingModalContent from './FirstRecordingModalContent';
import { ModalContentInterface } from './ModalContext';
import { AvailableModalTypes, checkInstanceOf, ModalContentInput } from './ModalTypes';

export default class ModalFactory {
  public createModalContent(
    modal: AvailableModalTypes,
    input: ModalContentInput,
  ): ModalContentInterface | undefined {
    switch (modal) {
      case AvailableModalTypes.FIRST_RECORDING_COMPLETED:
        if (!checkInstanceOf[modal](input)) {
          console.error('Incorrect parameters for FIRST_RECORDING_COMPLETED', input);
          return;
        }

        return {
          title: 'Parabéns pela sua primeira gravação!',
          subtitle: 'Gostaria de se identificar?',
          content: <FirstRecordingModalContent onChange={input.onFormChange} />,
          icon: {
            src: 'icons/champagne.png',
            alt: 'champagne cheers'
          },
          scoreChange: '+ 100pts',
          buttons: {
            primary: {
              title: 'Continuar',
              onClick: input.onButtonClick,
            },
          }
        };

      case AvailableModalTypes.FIRST_THEME_COMPLETED:
        if (!checkInstanceOf[modal](input)) {
          console.error('Incorrect parameters for FIRST_THEME_COMPLETED', input)
          return;
        }

        return {
          title: 'Você concluiu o primeiro módulo!',
          scoreChange: '+ 300pts',
          icon: {
            src: 'icons/champagne.png',
            alt: 'champagne cheers'
          },
          buttons: {
            primary: {
              title: 'Avançar',
              onClick: input.onButtonClick,
            },
          }
        };

      case AvailableModalTypes.SKIP_RECORDING:
        if (!checkInstanceOf[modal](input)) {
          console.error('Incorrect parameters for SKIP_RECORDING', input)
          return;
        }

        return {
          title: 'Pular frase',
          subtitle: 'Gostaria de colocar o porquê decidiu pular essa frase? Estamos trabalhando para melhorar a qualidade do conteúdo da nossa aplicação.',
          content: <></>,
          buttons: {
            primary: {
              title: 'Avançar',
              onClick: input.confirmSkip,
            },
            secondary: {
              title: 'Voltar',
              onClick: input.goBack,
            },
          },
        };

      case AvailableModalTypes.CONFIRM_REDIRECT:
        if (!checkInstanceOf[modal](input)) {
          console.error('Incorrect parameters for CONFIRM_REDIRECT', input)
          return;
        }

        console.error('Not implemented');
        return;

      default:
        console.error('modal implementation not found', modal);
        return;

    }
  }
}