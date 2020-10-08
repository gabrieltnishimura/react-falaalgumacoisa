import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useInput } from '../basic-data/useInput';
import NameRandomizer from '../recording/NameRandomizer';
import theme from '../shell/theme';
import styles from './FirstRecordingModalContent.module.css';

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
export interface FirstRecordingModalOutput {
  namingChoice: FirstRecordingModalNamingOptions;
  firstName?: string;
  randomName?: string;
}

function FirstRecordingModalContent(props: { onChange: (data: FirstRecordingModalOutput) => void }) {
  const { value: namingChoice, bind: bindNamingOptions } = useInput<FirstRecordingModalNamingOptions>(null);
  const { value: firstName, bind: bindFirstName } = useInput('');
  const [randomName, setRandomName] = useState('');
  const classes = useStyles();


  useEffect(() => {
    const validate = (data: FirstRecordingModalOutput): boolean => {
      if (data.namingChoice === 'NAME') {
        return !!data.firstName;
      } else if (data.namingChoice === 'RANDOM_NICKNAME') {
        return !!data.randomName;
      } else if (data.namingChoice === 'ANON') {
        return true;
      }

      return false;
    }

    const data = {
      firstName,
      namingChoice,
      randomName,
    };

    if (validate(data)) {
      props.onChange(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, namingChoice, randomName]);

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.form}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit} className={`${classes.root} ${styles.fullHeight}`}>
          <FormControl fullWidth component="fieldset">
            <RadioGroup aria-label="gender" name="customized-radios" {...bindNamingOptions}>
              <FormControlLabel value="NAME" control={<Radio color="primary" />} label="Usar meu nome" />
              {namingChoice === 'NAME' ? <div>
                <TextField fullWidth label="Primeiro Nome" {...bindFirstName} />
              </div> : null}
              <FormControlLabel value="RANDOM_NICKNAME" control={<Radio />} label="Escolher nome fictício" />
              {namingChoice === 'RANDOM_NICKNAME' ? <div className={styles.randomNameWrapper}>
                <NameRandomizer onRandomized={setRandomName}></NameRandomizer>
              </div> : null}
              <FormControlLabel value="ANON" control={<Radio />} label="Não quero me identificar" />
            </RadioGroup>
          </FormControl>
        </form>
      </div>
    </ThemeProvider >
  );
}

export default FirstRecordingModalContent;
