import React, { useEffect, useState } from 'react';
import ActionButtons from '../shared/buttons/ActionButtons';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import BasicDataForm from './components/BasicDataForm';
import { RegistrationDataModel } from './RegistrationDataModel';
import styles from './RegistrationSteps.module.css';

function BasicDataStep(props: { onComplete: (data: RegistrationDataModel) => void, onBack: () => void }) {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [data, setData] = useState<RegistrationDataModel | null>(null);

  useEffect(() => {
    setLoading(false);
  });

  const onChange = (data: RegistrationDataModel) => {
    setData(data);
  }

  const disableContinueButton = () => {
    setData(null);
  }

  const handleSubmit = () => {
    if (data) {
      props.onComplete(data);
    }
  }

  return (<>
    <Header></Header>
    <WhitePageWrapper>
      <div className={styles.content}>
        <div className={styles.form}>
          <div>
            <h1 className={styles.title}>Cadastro</h1>
          </div>
          <div className={styles.formLabel}>
            <span className={styles.label}>Dados pessoais</span>
          </div>
          <BasicDataForm onValid={onChange} onInvalid={disableContinueButton}></BasicDataForm>
        </div>
        <div className={styles.image}>
          <img src="/covers/register-vertical.jpg" alt="notebook e folha de papel"></img>
        </div>
      </div>
      <ActionButtons
        primary={{
          title: 'Continuar',
          enabled: !!data,
          onClick: handleSubmit,
        }}
        secondary={{
          title: 'Voltar',
          disabled: false,
          onClick: props.onBack,
        }}
      ></ActionButtons>
    </WhitePageWrapper>
  </>)
}

export default BasicDataStep;