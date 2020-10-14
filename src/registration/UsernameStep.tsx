import { createStyles, makeStyles, TextField, Theme, ThemeProvider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import RectangularButton from '../shared/buttons/RectangularButton';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import { useInput } from '../shared/useInput';
import Header from '../shell/Header';
import theme from '../shell/theme';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import { RegistrationDataModel } from './RegistrationDataModel';
import styles from './RegistrationSteps.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-fullWidth': {
        marginBottom: theme.spacing(2)
      },
    },
  }),
);

function BasicDataStep(props: { onComplete: (data: RegistrationDataModel) => void, onBack: () => void }) {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const { value: username, bind: bindUsername } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput('');
  const [valid, setValid] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setLoading(false);
  });

  useEffect(() => {
    setValid(Boolean(username && password && confirmPassword && password === confirmPassword));
  }, [username, password, confirmPassword]);

  const handleSubmit = (evt?: any) => {
    evt.preventDefault();
    props.onComplete({ username, password });
  }

  return (<ThemeProvider theme={theme}>
    <Header></Header>
    <WhitePageWrapper>
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>Cadastro</h1>
        </div>
        <div className={styles.formLabel}>
          <span className={styles.label}>Dados da conta</span>
        </div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit} className={`${classes.root} ${styles.fullHeight}`}>
          <TextField fullWidth label="Usuário" name="username" {...bindUsername} />
          <TextField type="password" fullWidth label="Senha" name="password" {...bindPassword} />
          <TextField type="password" fullWidth label="Confirmar senha" name="confirm-password" {...bindConfirmPassword} />
        </form>
      </div>
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
  </ThemeProvider >)
}

export default BasicDataStep;