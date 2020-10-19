import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticationService } from '../authentication/AuthenticationService';
import { UserContext } from '../authentication/UserProvider';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import BasicDataStep from './BasicDataStep';
import NicknameRegistrationStep from './NicknameRegistrationStep';
import { RegistrationDataModel } from './RegistrationDataModel';
import { sendRegistrationData } from './RegistrationIntegrationService';
import UsernameStep from './UsernameStep';

export enum RegistrationSteps {
  NICKNAME = 'nickname',
  BASIC = 'basic',
  USERNAME = 'username'
}

function RegistrationPage() {
  const navigation = useNavigate();
  const authenticationState = useContext(UserContext);
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [registrationData, setRegistrationData] = useState<RegistrationDataModel | null>(null); // fix any
  const [step, setStep] = useState<RegistrationSteps>(RegistrationSteps.NICKNAME);

  useEffect(() => {
    const sendData = async (data: RegistrationDataModel) => {
      setLoading(true);
      await sendRegistrationData(data); // needs toasty
      navigation('/dashboard');
    }

    const fromSocialMedia = !!authenticationState.user?.email; // defines whether came from social media

    if (fromSocialMedia) {
      if (step === RegistrationSteps.BASIC && registrationData?.age) {
        sendData(registrationData);
      }
    } else {
      if (step === RegistrationSteps.BASIC && registrationData?.age) {
        setStep(RegistrationSteps.USERNAME);
      } else if (step === RegistrationSteps.USERNAME && registrationData?.username) {
        sendData(registrationData);
      }
    }
    if (step === RegistrationSteps.NICKNAME && registrationData?.name) {
      setStep(RegistrationSteps.BASIC);
    }
  }, [step, registrationData, authenticationState, setLoading, navigation]);

  const completeNick = (data: any) => {
    setRegistrationData({
      ...registrationData,
      name: data.name,
    })
  }

  const completeBasic = (data: any) => {
    setRegistrationData({
      ...registrationData,
      gender: data.gender,
      age: data.age,
      region: data.region,
      dialect: data.dialect,
    })
  }

  const completeUser = async (data: any) => {
    await authenticationService.createUserWithEmailAndPassword(data.username, data.password);
    setRegistrationData({
      ...registrationData,
      username: data.username,
      password: data.password,
    })
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
    return <UsernameStep onComplete={completeUser} onBack={rollbackUser} />;
  }
  return null;
}

export default RegistrationPage;