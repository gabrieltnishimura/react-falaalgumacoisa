import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirstRecordingModalContent from '../modal/FirstRecordingModalContent';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import HeadingTitle from '../shared/typography/HeadingTitle';
import SectionTitle from '../shared/typography/SectionTitle';
import FormPageWrapper from '../shell/FormPageWrapper';
import Header from '../shell/Header';
import BasicDataForm from './components/BasicDataForm';
import { RegistrationDataModel } from './RegistrationDataModel';
import * as registrationIntegrationService from './RegistrationIntegrationService';

function EditProfilePage() {
  const navigate = useNavigate();
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [registrationData, setRegistrationData] = useState<RegistrationDataModel | null>(null);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    if (!registrationData) {
      setValid(false);
      return;
    }

    if (registrationData.name && registrationData.age &&
      registrationData.gender && registrationData.region &&
      registrationData.dialect) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [registrationData]);


  const validNick = (name: string) => {
    setRegistrationData({ ...registrationData, name });
  }

  const invalidNick = () => {
    setRegistrationData({ ...registrationData, name: undefined });
  }

  const validProfile = (data: RegistrationDataModel) => {
    setRegistrationData({ ...registrationData, ...data });
  }

  const invalidProfile = () => {
    setRegistrationData({
      ...registrationData,
      gender: undefined, age: undefined, region: undefined, dialect: undefined,
    });
  }

  const submitForm = async () => {
    if (!registrationData) {
      return;
    }

    setLoading(true);
    await registrationIntegrationService.sendRegistrationData(registrationData); // needs toasty
    navigate('/dashboard');
  }

  const goBack = () => {
    setLoading(true);
    navigate('/dashboard');
  }

  return <>
    <Header></Header>
    <FormPageWrapper
      image={{
        src: '/covers/register-vertical.jpg',
        alt: 'notebook e folha de papel',
      }}
      buttons={{
        primary: {
          title: 'Continuar',
          enabled: valid,
          onClick: submitForm,
        },
        secondary: {
          title: 'Voltar',
          disabled: false,
          onClick: goBack,
        }
      }}>
      <HeadingTitle>Alterar perfil</HeadingTitle>
      <SectionTitle>Identificação</SectionTitle>
      <FirstRecordingModalContent
        onValid={validNick}
        onInvalid={invalidNick}></FirstRecordingModalContent>
      <SectionTitle>Dados pessoais</SectionTitle>
      <BasicDataForm onValid={validProfile} onInvalid={invalidProfile} />
    </FormPageWrapper>
  </>;
}

export default EditProfilePage;