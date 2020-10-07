export enum AvailableModalTypes {
  FIRST_RECORDING_COMPLETED,
  FIRST_THEME_COMPLETED,
  SKIP_RECORDING,
  CONFIRM_REDIRECT,
}

export interface ModalFirstRecordingCompletedInput {
  discriminator: AvailableModalTypes.FIRST_RECORDING_COMPLETED;
  points: string;
  onFormChange: (data: any) => void;
  onButtonClick: () => void;
}

export interface ModalFirstThemeCompletedInput {
  discriminator: AvailableModalTypes.FIRST_THEME_COMPLETED;
  points: string;
  onButtonClick: () => void;
}

export interface ModalSkipRecordingInput {
  discriminator: AvailableModalTypes.SKIP_RECORDING;
  confirmSkip: () => void;
  goBack: () => void;
}

export interface ModalConfirmRedirectInput {
  discriminator: AvailableModalTypes.CONFIRM_REDIRECT;
  confirmRedirect: () => void;
  goBack: () => void;
}

export type ModalContentInput =
  ModalFirstRecordingCompletedInput |
  ModalFirstThemeCompletedInput |
  ModalSkipRecordingInput |
  ModalConfirmRedirectInput;

export const checkInstanceOf = {
  [AvailableModalTypes.FIRST_RECORDING_COMPLETED]: (object: any): object is ModalFirstRecordingCompletedInput => {
    return object.discriminator === AvailableModalTypes.FIRST_RECORDING_COMPLETED;
  },
  [AvailableModalTypes.FIRST_THEME_COMPLETED]: (object: any): object is ModalFirstThemeCompletedInput => {
    return object.discriminator === AvailableModalTypes.FIRST_THEME_COMPLETED;
  },
  [AvailableModalTypes.SKIP_RECORDING]: (object: any): object is ModalSkipRecordingInput => {
    return object.discriminator === AvailableModalTypes.SKIP_RECORDING;
  },
  [AvailableModalTypes.CONFIRM_REDIRECT]: (object: any): object is ModalConfirmRedirectInput => {
    return object.discriminator === AvailableModalTypes.CONFIRM_REDIRECT;
  },
}
