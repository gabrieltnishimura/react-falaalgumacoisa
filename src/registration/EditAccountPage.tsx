import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticationService } from '../authentication/AuthenticationService';
import { UserContext } from '../authentication/UserProvider';
import ActionButtons from '../shared/buttons/ActionButtons';
import { useStyles } from '../shared/forms/material-typography';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import HeadingTitle from '../shared/typography/HeadingTitle';
import SectionTitle from '../shared/typography/SectionTitle';
import { useInput } from '../shared/useInput';
import { isEmail } from '../shared/utils';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';


export type AccountOperationTypes = 'EMAIL' | 'PASSWORD' | null;

function EditAccountPage() {
  const navigate = useNavigate();
  const classes = useStyles();
  const authenticationState = useContext(UserContext);
  const oldEmail = authenticationState?.user?.email;
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const { value: accountOperation, bind: bindAccountOperation } = useInput<AccountOperationTypes>(null);
  const { value: email, bind: bindEmail } = useInput('');
  const { value: oldPassword, bind: bindOldPassword } = useInput('');
  const { value: newPassword, bind: bindNewPassword } = useInput('');
  const { value: confirmNewPassword, bind: bindConfirmNewPassword } = useInput('');
  const [userErrorMessage, setUserErrorMessage] = useState<string | undefined>(undefined);

  const [valid, setValid] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    if (accountOperation === 'EMAIL') {
      setValid(Boolean(email && userErrorMessage === ''));
    } else if (accountOperation === 'PASSWORD') {
      setValid(Boolean(oldPassword && newPassword && confirmNewPassword && newPassword === confirmNewPassword));
    }
  }, [
    setValid,
    accountOperation,
    email,
    oldPassword,
    newPassword,
    confirmNewPassword,
    userErrorMessage,
  ]);

  const validateEmailFn = (evt: any) => {
    if (isEmail(evt.target.value)) {
      setUserErrorMessage('');
    } else {
      setUserErrorMessage('Email inválido');
    }
  }

  const goBack = () => {
    setLoading(true);
    navigate('/dashboard');
  }

  const submitHandler = async (event?: any) => {
    event?.preventDefault();
    if (!oldEmail) {
      return;
    }

    setLoading(true);
    if (accountOperation === 'EMAIL') {
      try {
        await authenticationService.changeEmail(oldEmail, oldPassword, email);
      } catch (err) {
        console.log('Error updating email', err);
      }
    } else if (accountOperation === 'PASSWORD') {
      try {
        await authenticationService.changePassword(oldEmail, oldPassword, newPassword);
      } catch (err) {
        console.log('Error updating password', err);
      }
    }
    navigate('/dashboard');
  }

  const hidden = { 'display': 'none' };
  const hiddenUsername = <input type="text" name="username" value={oldEmail} readOnly autoComplete="username" style={hidden} />;

  return <>
    <Header></Header>
    <WhitePageWrapper>
      <HeadingTitle>Alterar perfil</HeadingTitle>
      <SectionTitle>Identificação</SectionTitle>
      <form noValidate autoComplete="off" onSubmit={submitHandler} className={`${classes.root}`}>
        <FormControl fullWidth component="fieldset">
          <RadioGroup aria-label="account-operation" name="account-operation" {...bindAccountOperation}>
            <FormControlLabel value="EMAIL" control={<Radio color="primary" />} label="Alterar email" />
            {accountOperation === 'EMAIL' ? <div>
              {hiddenUsername}
              <TextField fullWidth type="email" label="E-mail" {...bindEmail}
                onBlur={validateEmailFn} error={!!userErrorMessage} helperText={userErrorMessage} />
              <TextField fullWidth type="password" autoComplete="password" label="Senha atual" {...bindOldPassword} />
            </div> : null}
            <FormControlLabel value="PASSWORD" control={<Radio />} label="Alterar senha" />
            {accountOperation === 'PASSWORD' ? <div>
              {hiddenUsername}
              <TextField fullWidth type="password" autoComplete="password" label="Senha atual" {...bindOldPassword} />
              <TextField fullWidth type="password" autoComplete="new-password" label="Nova senha" {...bindNewPassword} />
              <TextField fullWidth type="password" autoComplete="confirm-new-password" label="Repita nova senha" {...bindConfirmNewPassword} />
            </div> : null}
          </RadioGroup>
        </FormControl>
        <button type="submit" style={hidden}>Submit</button>
      </form>
      <ActionButtons
        primary={{
          title: 'Continuar',
          enabled: valid,
          onClick: () => submitHandler(),
        }}
        secondary={{
          title: 'Voltar',
          disabled: false,
          onClick: goBack,
        }}
      ></ActionButtons>
    </WhitePageWrapper>
  </>;
}

export default EditAccountPage;