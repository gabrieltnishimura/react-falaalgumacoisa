import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../registration/RegistrationIntegrationService';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import ConfirmDeletionStep from './ConfirmDeletionStep';
import DeletionReasonStep from './DeletionReasonStep';
import GoodbyeStep from './GoodbyeStep';
import KeepUserDataStep from './KeepUserDataStep';


export enum DeletionSteps {
  CONFIRM_DELETION,
  KEEP_USER_DATA,
  DELETION_REASON,
  GOODBYE,
}

function DeleteUserPage() {
  const navigation = useNavigate();
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [keepUserData, setKeepUserData] = useState<boolean>(true);
  const [step, setStep] = useState<DeletionSteps>(DeletionSteps.CONFIRM_DELETION);

  const completeConfirmation = () => {
    setStep(DeletionSteps.KEEP_USER_DATA);
  }

  const backConfirmation = () => {
    navigation('/');
  }

  const keepUserDataCompletion = (keepOrNot: boolean) => {
    setKeepUserData(keepOrNot);
    setStep(DeletionSteps.DELETION_REASON);
  }

  const keepUserDataBack = () => {
    setStep(DeletionSteps.CONFIRM_DELETION);
  }

  const confirmDeletionReason = async (newReason: string) => {
    setLoading(true);
    try {
      await deleteUser(keepUserData, newReason);
      setLoading(false);
      setStep(DeletionSteps.GOODBYE);
    } catch (err) {
      console.error(err);
      navigation('/error');
      return;
    }
  }

  const backDeletionReason = () => {
    setStep(DeletionSteps.KEEP_USER_DATA)
  }

  if (step === DeletionSteps.CONFIRM_DELETION) {
    return <ConfirmDeletionStep onComplete={completeConfirmation} onBack={backConfirmation} />;
  } else if (step === DeletionSteps.KEEP_USER_DATA) {
    return <KeepUserDataStep onComplete={keepUserDataCompletion} onBack={keepUserDataBack}></KeepUserDataStep>;
  } else if (step === DeletionSteps.DELETION_REASON) {
    return <DeletionReasonStep onComplete={confirmDeletionReason} onBack={backDeletionReason}></DeletionReasonStep>;
  } else if (step === DeletionSteps.GOODBYE) {
    return <GoodbyeStep />;
  }
  return null;
}

export default DeleteUserPage;