import React, { useEffect, useState } from 'react';
import FirstRecordingModalContent, { FirstRecordingModalOutput } from '../modal/FirstRecordingModalContent';
import RectangularButton from '../shared/buttons/RectangularButton';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import styles from './RegistrationSteps.module.css';

function NicknameRegistrationStep(props: { onComplete: (data: any) => void, onBack: () => void }) {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [valid, setValid] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    setLoading(false);
  });

  const onChangeNameFn = (data: FirstRecordingModalOutput) => {
    const chosenName =
      (data.namingChoice === 'NAME' && data.firstName) ||
      (data.namingChoice === 'RANDOM_NICKNAME' && data.randomName);

    setValid(Boolean(chosenName));
    if (chosenName) {
      setName(chosenName);
    }
  }

  const handleSubmit = () => {
    props.onComplete({ name });
  }

  return (<>
    <Header></Header>
    <WhitePageWrapper>
      <div>
        <h1 className={styles.title}>Cadastro</h1>
        <h2 className={styles.subtitle}>Com poucos dados você estará pronto para contribuir com a ciência brasileira e desfrutar de todas as funcionalidades desse aplicativo</h2>
      </div>
      <div className={styles.formLabel}>
        <span className={styles.label}>Identificação</span>
      </div>
      <FirstRecordingModalContent onChange={onChangeNameFn}></FirstRecordingModalContent>
      <div className={styles.actions}>
        <RectangularButton
          title="Continuar"
          onClick={handleSubmit}
          primary
          disabled={!valid}
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

export default NicknameRegistrationStep;