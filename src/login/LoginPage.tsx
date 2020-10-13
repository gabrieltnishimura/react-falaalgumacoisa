import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticationService } from '../authentication/AuthenticationService';
import FacebookLoginButton from '../shared/buttons/FacebookLoginButton';
import GoogleLoginButton from '../shared/buttons/GoogleLoginButton';
import RectangularButton from '../shared/buttons/RectangularButton';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import { useInput } from '../shared/useInput';
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
  const { value: username, bind: bindUsername } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');

  const redirectNewUserFn = () => {
    navigate('/login')
  }

  const fbClick = () => {
    authenticationService.login('facebook');
  }

  const googleClick = () => {
    authenticationService.login('google');
  }

  const loginWithUsernameFn = () => {
    authenticationService.loginWithUsername(username, password);
  }

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
  }

  useEffect(() => {
    setLoading(false);
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <WhitePageWrapper>
        <div className={styles.enterTextWrapper}>
          <h1 className={styles.enterText}>Entrar</h1>
        </div>
        <form noValidate onSubmit={handleSubmit} className={`${classes.root} ${styles.fullHeight}`}>
          <div className={styles.username}>
            <TextField fullWidth label="Usuário" name="username" {...bindUsername} />
          </div>
          <div className={styles.password}>
            <TextField type="password" fullWidth label="Senha" name="password" {...bindPassword} />
          </div>
          <div className={styles.continueButtonWrapper}>
            <RectangularButton title="Continuar" primary submit onClick={loginWithUsernameFn} ></RectangularButton>
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
        <div className={styles.FacebookButtonWrapper}>
          <FacebookLoginButton click={fbClick}></FacebookLoginButton>
        </div>
        <div>
          <GoogleLoginButton click={googleClick}></GoogleLoginButton>
        </div>
      </WhitePageWrapper>
    </ThemeProvider>
  );
}

export default LoginPage;