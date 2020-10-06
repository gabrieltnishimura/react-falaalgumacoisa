import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticationService } from '../authentication/AuthenticationService';
import { useInput } from '../basic-data/useInput';
import Header from '../shell/Header';
import LinkItem from '../shell/LinkItem';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import FacebookLoginButton from '../splash/FacebookLoginButton';
import GoogleLoginButton from '../splash/GoogleLoginButton';
import styles from './LoginPage.module.css';


function LoginPage() {
  const navigate = useNavigate();
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

  return (
    <div>
      <Header />
      <WhitePageWrapper>
        <div className={styles.enterTextWrapper}>
          <h1 className={styles.enterText}>Entrar</h1>
        </div>
        <div className={styles.username}>
          <TextField fullWidth label="Usuário" {...bindUsername} />
        </div>
        <div className={styles.password}>
          <TextField fullWidth label="Senha" {...bindPassword} />
        </div>
        <div className={styles.continueButtonWrapper}>
          <div className={styles.continueButton} onClick={loginWithUsernameFn}>
            <span className={styles.continueButtonText}>Continuar</span>
          </div>
        </div>
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
    </div >
  );
}

export default LoginPage;