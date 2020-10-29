import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticationService } from '../authentication/AuthenticationService';
import * as registrationIntegrationService from '../registration/RegistrationIntegrationService';
import RectangularButton from '../shared/buttons/RectangularButton';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import { useInput } from '../shared/useInput';
import { isEmail } from '../shared/utils';
import Header from '../shell/Header';
import LinkItem from '../shell/LinkItem';
import theme from '../shell/theme';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import styles from './LoginPage.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-fullWidth': {
        marginBottom: theme.spacing(2),
      },
    },
  }),
);



function LoginPage() {
  const navigate = useNavigate();
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const classes = useStyles();
  const [valid, setValid] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const { value: username, bind: bindUsername } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');

  const redirectNewUserFn = () => {
    navigate('/cadastro');
  }

  const fbClick = () => {
    authenticationService.login('facebook');
  }

  const googleClick = async () => {
    await authenticationService.login('google');
  }

  const loginWithUsernameFn = async () => {
    setLoading(true);
    try {
      await authenticationService.loginWithUsername(username, password);
      navigate('/dashboard');
    } catch (err) {
      setPasswordErrorMessage('Email e/ou senha inválidos');
      setValid(false);
      setLoading(false);
    }
  }

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
  }

  const validateEmailFn = (evt: any) => {
    if (isEmail(evt.target.value)) {
      setUserErrorMessage('');
    } else {
      setUserErrorMessage('Email inválido');
    }
  }

  useEffect(() => {
    if (isEmail(username) && password) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [username, password]);

  useEffect(() => {
    authenticationService.start();
    const redirectFromSocialMedia = async () => {
      try {
        const user = await authenticationService.getRedirect();
        const response = await authenticationService.linkUser(user);
        console.log('i may have linked', response);
        if (user.user) {
          navigateWhenRedirected();
        }
        console.log('credential', user.credential);
      } catch (err) {
        console.error(err);
        if (err.code === 'auth/web-storage-unsupported') {
          navigate('/error');
        }
      }
    }
    setLoading(false);
    redirectFromSocialMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateWhenRedirected = async () => {
    try { // check if has registration within site if has, dashboard
      await registrationIntegrationService.getUserMetadata();
      navigate('/dashboard');
    } catch (err) { // if not, registration
      navigate('/cadastro');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <WhitePageWrapper>
        <div className={styles.enterTextWrapper}>
          <h1 className={styles.enterText}>Entrar</h1>
        </div>
        <form noValidate onSubmit={handleSubmit} className={`${classes.root} ${styles.fullHeight}`}>
          <div className={styles.username}>
            <TextField fullWidth label="Email" name="email"
              autoComplete="username"
              type="email" {...bindUsername} onBlur={validateEmailFn}
              error={!!userErrorMessage} helperText={userErrorMessage}
            />
          </div>
          <div className={styles.password}>
            <TextField type="password" fullWidth label="Senha" name="password" {...bindPassword}
              autoComplete="current-password"
              error={!!passwordErrorMessage} helperText={passwordErrorMessage} />
          </div>
          <div className={styles.continueButtonWrapper}>
            <RectangularButton title="Continuar" primary submit
              onClick={loginWithUsernameFn} disabled={!valid} ></RectangularButton>
          </div>
        </form>
        <div>
          <hr className={styles.separator} />
        </div>
        <div className={styles.newUser}>
          <LinkItem title="Quero me cadastrar" onclick={redirectNewUserFn} color="cobalt" ></LinkItem>
        </div>
        <div className={styles.accessViaWrapper}>
          <span className={styles.accessVia}>Ou acesse via</span>
        </div>
        <div id="firebaseui-auth-container"></div>
      </WhitePageWrapper>
    </ThemeProvider>
  );
}

export default LoginPage;