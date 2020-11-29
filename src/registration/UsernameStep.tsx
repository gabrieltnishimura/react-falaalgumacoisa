import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useStyles } from '../shared/forms/material-typography';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import { useInput } from '../shared/useInput';
import FormPageWrapper from '../shell/FormPageWrapper';
import Header from '../shell/Header';
import { RegistrationDataModel } from './RegistrationDataModel';
import styles from './RegistrationSteps.module.css';

function BasicDataStep(props: {
  onComplete: (data: RegistrationDataModel) => void,
  onBack: () => void,
  showError: { username: string, password: string },
}) {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const { value: username, bind: bindUsername } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput('');
  const [valid, setValid] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValid(Boolean(username && password && confirmPassword && password === confirmPassword));
  }, [username, password, confirmPassword]);

  const handleSubmit = (evt?: any) => {
    evt.preventDefault();
    props.onComplete({ username, password });
  }

  return (<>
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
          onClick: handleSubmit,
        },
        secondary: {
          title: 'Voltar',
          disabled: false,
          onClick: props.onBack,
        }
      }}>
      <div>
        <h1 className={styles.title}>Cadastro</h1>
      </div>
      <div className={styles.formLabel}>
        <span className={styles.label}>Dados da conta</span>
      </div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit} className={`${classes.root} ${styles.fullHeight}`}>
        <TextField fullWidth label="Email" name="username" {...bindUsername}
          error={!!props.showError.username} helperText={props.showError.username} />
        <TextField type="password" fullWidth label="Senha" name="password" {...bindPassword} autoComplete="password" />
        <TextField type="password" fullWidth label="Confirmar senha" name="confirm-password" {...bindConfirmPassword} autoComplete="confirm-password" />
      </form>
    </FormPageWrapper>
  </>)
}

export default BasicDataStep;