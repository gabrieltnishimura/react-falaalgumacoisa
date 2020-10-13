import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useInput } from '../shared/useInput';
import theme from '../shell/theme';
import styles from './SkipRecordingModalContent.module.css';

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

export type SkipRecordingTypes = 'UNABLE_TO_READ' | 'NON_PORTUGUESE_WORD' | 'OTHER' | null;
export interface SkipRecordingOutput {
  reason: string;
};

function SkipRecordingModalContent(props: { onChange: (data: SkipRecordingOutput) => void }) {
  const { value: reason, bind: bindReason } = useInput<SkipRecordingTypes>(null);
  const classes = useStyles();

  useEffect(() => {
    if (!reason) {
      return;
    }

    props.onChange({ reason });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reason]);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.form}>
        <form noValidate autoComplete="off" className={`${classes.root} ${styles.fullHeight}`}>
          <FormControl fullWidth component="fieldset">
            <RadioGroup aria-label="gender" name="customized-radios" {...bindReason}>
              <FormControlLabel value="UNABLE_TO_READ" control={<Radio color="primary" />}
                label="Não consigo ler a frase" />
              <FormControlLabel value="NON_PORTUGUESE_WORD" control={<Radio />}
                label="Possui palavras que não fazem parte da língua portuguesa" />
              <FormControlLabel value="OTHER" control={<Radio />}
                label="Outro motivo" />
            </RadioGroup>
          </FormControl>
        </form>
      </div>
    </ThemeProvider >
  );
}

export default SkipRecordingModalContent;
