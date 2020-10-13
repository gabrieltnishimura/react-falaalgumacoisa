import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../authentication/UserProvider';
import BasicDataStep from './BasicDataStep';
import NicknameRegistrationStep from './NicknameRegistrationStep';
import UsernameStep from './UsernameStep';

export enum RegistrationSteps {
  NICKNAME = 'NICKNAME',
  BASIC = 'BASIC',
  USERNAME = 'USERNAME'
}

function RegistrationPage() {
  const authenticationState = useContext(UserContext);
  const [registrationData, setRegistrationData] = useState<any>(null); // fix any
  const [step, setStep] = useState<RegistrationSteps>(RegistrationSteps.NICKNAME);

  useEffect(() => {
    const sendData = async (data: any) => {
      console.log('Should send data', data);
    }

    const fromSocialMedia = !!authenticationState.user?.email; // defines whether came from social media

    if (fromSocialMedia) {
      if (step === RegistrationSteps.BASIC && registrationData?.[step]?.age) {
        sendData(registrationData);
      }
    } else {
      if (step === RegistrationSteps.BASIC && registrationData?.[step]?.age) {
        setStep(RegistrationSteps.USERNAME);
      } else if (step === RegistrationSteps.USERNAME && registrationData?.[step]?.username) {
        sendData(registrationData);
      }
    }
    if (step === RegistrationSteps.NICKNAME && registrationData?.[step]?.name) {
      setStep(RegistrationSteps.BASIC);
    }
  }, [registrationData, authenticationState]);

  const complete = (data: any) => {
    setRegistrationData({ ...registrationData, [step]: data });
  }

  const back = () => {
    console.log('should go back');
  }

  if (step === 'NICKNAME') {
    return <NicknameRegistrationStep onComplete={complete} onBack={back} />;
  } else if (step === 'BASIC') {
    return <BasicDataStep onComplete={complete} onBack={back} />;
  } else if (step === 'USERNAME') {
    return <UsernameStep onComplete={complete} onBack={back} />;
  }
  return null;
}

export default RegistrationPage;