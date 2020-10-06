import React, { useEffect, useState } from 'react';
import { authenticationService } from '../authentication/AuthenticationService';
import FacebookLoginButton from '../splash/FacebookLoginButton';
import GoogleLoginButton from '../splash/GoogleLoginButton';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom'
import { useInput } from '../basic-data/useInput';
import TextField from '@material-ui/core/TextField';
import LinkItem from '../shell/LinkItem';
function LoginPage() {
  const navigate = useNavigate();
  const { value: userName, bind: bindUserName } = useInput('');
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

  const enterFn = () => {
    navigate('/login')
  }
  return (
    <div>
      <div className={styles.header}>
        HEADER
      </div>
      <WhitePageWrapper>
        <div className={styles.enterTextWrapper}>
          <h1 className={styles.enterText}>Entrar</h1>
        </div>
        <div className={styles.username}>
          <TextField fullWidth label="Usuário" {...bindUserName} />
        </div>
        <div className={styles.password}>
          <TextField fullWidth label="Senha" {...bindPassword} />
        </div>
        <div className={styles.continueButtonWrapper}>
          <div className={styles.continueButton} onClick={enterFn}>
            <span className={styles.continueButtonText}>Continuar</span>
          </div>
        </div>
        <div>
          <hr className={styles.separator} />
        </div>
        <div className={styles.newUser}>
          <LinkItem title="Quer me cadastrar" onclick={redirectNewUserFn} color="cobalt" ></LinkItem>
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