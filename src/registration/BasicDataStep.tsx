import React, { useEffect, useState } from 'react';
import RectangularButton from '../shared/buttons/RectangularButton';
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
        <div>
          <h1 className={styles.title}>Cadastro</h1>
        </div>
        <div className={styles.formLabel}>
          <span className={styles.label}>Dados pessoais</span>
        </div>
        <BasicDataForm onValid={onChange} onInvalid={disableContinueButton}></BasicDataForm>
      </div>
      <div className={styles.actions}>
        <RectangularButton
          title="Continuar"
          onClick={handleSubmit}
          primary
          disabled={!data}
        ></RectangularButton>
        <RectangularButton
          title="Voltar"
          onClick={props.onBack}
          disabled={false}
        ></RectangularButton>
      </div>
    </WhitePageWrapper>
  </>)
}

export default BasicDataStep;