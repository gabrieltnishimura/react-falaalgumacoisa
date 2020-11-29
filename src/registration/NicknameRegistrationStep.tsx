import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FirstRecordingModalContent from '../modal/FirstRecordingModalContent';
import ActionButtons from '../shared/buttons/ActionButtons';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import { RegistrationDataModel } from './RegistrationDataModel';
import { getReferralFriendName } from './RegistrationIntegrationService';
import styles from './RegistrationSteps.module.css';

function NicknameRegistrationStep(props: { onComplete: (data: RegistrationDataModel) => void, onBack: () => void }) {
  const location = useLocation();
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [valid, setValid] = useState(false);
  const [name, setName] = useState('');
  const [referCode, setReferCode] = useState('');
  const [referralFriend, setReferralFriend] = useState('');

  useEffect(() => {
    setLoading(false);
    const referralFlow = async () => {
      if (location.search.indexOf('?refer=') >= 0) {
        const [, code] = location.search.split('?refer=');
        const response = code && await getReferralFriendName(code);
        if (!response || !response.name) {
          return;
        }
        setReferCode(code);
        setReferralFriend(response.name);
      }
    }
    referralFlow();
  }, [location.search, setLoading]);

  const onChangeNameFn = (chosenName: string) => {
    setValid(Boolean(chosenName));
    if (chosenName) {
      setName(chosenName);
    }
  }

  const onInvalidFn = () => {
    setValid(false);
  }

  const handleSubmit = () => {
    props.onComplete({ name, referCode });
  }

  return (<>
    <Header></Header>
    <WhitePageWrapper>
      <div className={styles.content}>
        <div className={styles.form}>
          <h1 className={styles.title}>Cadastro</h1>
          {referralFriend ? <span className={styles.referral}>
            Você foi indicado pelo seu amigo <b className={styles.friend}>{referralFriend}</b>!
          </span> : null}
          <h2 className={styles.subtitle}>Com poucos dados você estará pronto para contribuir com a ciência brasileira e desfrutar de todas as funcionalidades desse aplicativo</h2>
          <div className={styles.formLabel}>
            <span className={styles.label}>Identificação</span>
          </div>
          <FirstRecordingModalContent
            onValid={onChangeNameFn}
            onInvalid={onInvalidFn}></FirstRecordingModalContent>
        </div>
        <div className={styles.image}>
          <img src="/covers/register-vertical.jpg" alt="notebook e folha de papel"></img>
        </div>
      </div>
      <ActionButtons
        primary={{
          title: 'Continuar',
          enabled: valid,
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

export default NicknameRegistrationStep;