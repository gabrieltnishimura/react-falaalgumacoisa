import { FirebaseError } from 'firebase/app';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticationService } from '../authentication/AuthenticationService';
import { UserContext } from '../authentication/UserProvider';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import BasicDataStep from './BasicDataStep';
import NicknameRegistrationStep from './NicknameRegistrationStep';
import { RegistrationDataModel } from './RegistrationDataModel';
import * as registrationIntegrationService from './RegistrationIntegrationService';
import { RegistrationSteps } from './RegistrationPage';
import UsernameStep from './UsernameStep';

function EditRegistrationPage() {
  const navigation = useNavigate();
  const authenticationState = useContext(UserContext);
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [registrationData, setRegistrationData] = useState<RegistrationDataModel | null>(null);
  const [step, setStep] = useState<RegistrationSteps>(RegistrationSteps.NICKNAME);
  const [usernameStepError, setUsernameStepError] = useState({ username: '', password: '' });

  const sendData = async (data: RegistrationDataModel) => {
    setLoading(true);
    await registrationIntegrationService.sendRegistrationData(data); // needs toasty
    navigation('/dashboard');
  }

  const completeNick = (data: any) => {
    setRegistrationData({
      ...registrationData,
      name: data.name,
    });
    setStep(RegistrationSteps.BASIC);
  }

  const completeBasic = (data: any) => {
    const newRegistrationData = {
      ...registrationData,
      gender: data.gender,
      age: data.age,
      region: data.region,
      dialect: data.dialect,
    };
    setRegistrationData(newRegistrationData);

    if (!!authenticationState?.user?.email) { // defines whether came from social media
      sendData(newRegistrationData);
    } else {
      setStep(RegistrationSteps.USERNAME);
    }
  }

  const completeUser = async (data: any) => {
    setLoading(true);
    await firebaseRegistration(data.username, data.password);
    const newRegistrationData = {
      ...registrationData,
    };
    setRegistrationData(newRegistrationData);
    sendData(newRegistrationData);
  }

  const firebaseRegistration = async (username: string, password: string) => {
    try {
      await authenticationService.createUser(username, password);
      await registrationIntegrationService.mergeUserData();
    } catch (err) {
      console.error(err);
      if (err instanceof FirebaseError && err.code === 'auth/email-already-in-use') {
        setLoading(false);
        setUsernameStepError({
          username: 'Email em uso',
          password: '',
        });
      } else {
        navigation('/error');
      }
    }
  }

  const rollbackNick = () => {
    navigation('/login');
  }

  const rollbackBasic = () => {
    setStep(RegistrationSteps.NICKNAME);
  }

  const rollbackUser = () => {
    setStep(RegistrationSteps.BASIC);
  }

  if (step === RegistrationSteps.NICKNAME) {
    return <NicknameRegistrationStep onComplete={completeNick} onBack={rollbackNick} />;
  } else if (step === RegistrationSteps.BASIC) {
    return <BasicDataStep onComplete={completeBasic} onBack={rollbackBasic} />;
  } else if (step === RegistrationSteps.USERNAME) {
    return <UsernameStep onComplete={completeUser} onBack={rollbackUser} showError={usernameStepError} />;
  }
  return null;
}

export default EditRegistrationPage;