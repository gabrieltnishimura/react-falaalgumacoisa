import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { throttle } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as TextSpinnerIcon } from '../assets/icons/text_spinner.svg';
import { validateNickname } from '../registration/RegistrationIntegrationService';
import { useInput } from '../shared/useInput';
import theme from '../shell/theme';
import styles from './FirstRecordingModalContent.module.css';
import NameRandomizer from './randomizer/NameRandomizer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-fullWidth': {
        marginBottom: theme.spacing(2),
      },
      '& .PrivateSwitchBase-checked-3 + span.MuiTypography-root': {
        fontWeight: 600,
        letterSpacing: '-0.036rem',
      }
    },
  }),
);
export type FirstRecordingModalNamingOptions = 'NAME' | 'RANDOM_NICKNAME' | 'ANON' | null;
export interface FirstRecordingModalInnerOutput {
  namingChoice: FirstRecordingModalNamingOptions;
  firstName?: string;
  randomName?: string;
}

enum FieldValidationState {
  NON_TOUCHED = 'NON_TOUCHED',
  VALID = 'VALID',
  LOADING = 'LOADING',
  INVALID = 'INVALID',
}

function FirstRecordingModalContent(props: {
  onValid: (name: string) => void,
  onInvalid: () => void,
  onAnon?: () => void,
}) {
  const { value: namingChoice, bind: bindNamingOptions } = useInput<FirstRecordingModalNamingOptions>(null);
  const { value: firstName, bind: bindFirstName } = useInput('');
  const [fieldValidationState, setFieldValidationState] = useState<FieldValidationState>(FieldValidationState.NON_TOUCHED);
  const [nameError, setNameError] = useState('');
  const [randomName, setRandomName] = useState('');
  const classes = useStyles();

  const validateCallback = async (newName: string) => {
    if (!newName) {
      return;
    }

    setFieldValidationState(FieldValidationState.LOADING);
    try {
      await validateNickname(newName);
      setFieldValidationState(FieldValidationState.VALID);
      setNameError('');
    } catch (error) {
      setFieldValidationState(FieldValidationState.INVALID);
      if (error.message === 'BAD_WORD') {
        setNameError('Ops, tente outro nome de guerra');
      } else if (error.message === 'USER_EXISTS') {
        setNameError('Esse nome de guerra já está sendo utilizado por outro usuário');
      } else {
        setNameError('Erro ao validar usuário...');
      }
    }
  }

  const throttled = useRef(throttle(validateCallback, 700));

  useEffect(() => {
    throttled.current(firstName);
  }, [firstName]);

  useEffect(() => {
    if (namingChoice === 'NAME' && fieldValidationState === FieldValidationState.VALID && !!firstName && firstName.length > 3) {
      props.onValid(firstName);
      return;
    } else if (namingChoice === 'RANDOM_NICKNAME' && !!randomName) {
      props.onValid(randomName);
      return;
    } else if (props.onAnon && namingChoice === 'ANON') {
      props.onAnon();
      return;
    }

    props.onInvalid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fieldValidationState,
    namingChoice,
    randomName,
    firstName,
  ]);


  const handleSubmit = (evt: any) => {
    evt.preventDefault();
  }

  const endAdornment = fieldValidationState === FieldValidationState.NON_TOUCHED ? null :
    fieldValidationState === FieldValidationState.INVALID ? null :
      fieldValidationState === FieldValidationState.LOADING ?
        <TextSpinnerIcon className={styles.loaderIcon}></TextSpinnerIcon> :
        fieldValidationState === FieldValidationState.VALID ? null : null;

  return (
    <ThemeProvider theme={theme}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit} className={`${classes.root} ${styles.fullHeight}`}>
        <FormControl fullWidth component="fieldset">
          <RadioGroup aria-label="gender" name="customized-radios" {...bindNamingOptions}>
            <FormControlLabel value="NAME" control={<Radio color="primary" />} label="Usar nome de guerra" />
            {namingChoice === 'NAME' ? <div>
              <TextField fullWidth label="Nome de guerra" {...bindFirstName}
                error={!!nameError} helperText={nameError}
                InputProps={{ endAdornment }} />
            </div> : null}
            <FormControlLabel value="RANDOM_NICKNAME" control={<Radio />} label="Escolher nome fictício" />
            {namingChoice === 'RANDOM_NICKNAME' ? <div className={styles.randomNameWrapper}>
              <NameRandomizer onRandomized={setRandomName}></NameRandomizer>
            </div> : null}
            {props.onAnon ? <FormControlLabel value="ANON" control={<Radio />} label="Não quero me identificar" /> : null}
          </RadioGroup>
        </FormControl>
      </form>
    </ThemeProvider >
  );
}

export default FirstRecordingModalContent;
