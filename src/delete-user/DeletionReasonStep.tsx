import { createStyles, FormControl, makeStyles, TextField, Theme, ThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import styles from '../registration/RegistrationSteps.module.css';
import RectangularButton from '../shared/buttons/RectangularButton';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import { useInput } from '../shared/useInput';
import Header from '../shell/Header';
import theme from '../shell/theme';
import WhitePageWrapper from '../shell/WhitePageWrapper';

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

function DeletionReasonStep(props: { onComplete: (reason: string) => void, onBack: () => void }) {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const { value: reason, bind: bindReason } = useInput('');
  const classes = useStyles();

  useEffect(() => {
    setLoading(false);
  });

  const handleSubmit = () => {
    props.onComplete(reason);
  }

  return (<>
    <Header></Header>
    <WhitePageWrapper>
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>Excluir conta</h1>
        </div>
        <div className={styles.formLabel}>
          <span className={styles.label}>Gostaria de dizer o porquê da sua tomada de decisão?</span>
        </div>
        <ThemeProvider theme={theme}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit} className={`${classes.root} ${styles.fullHeight}`}>
            <FormControl fullWidth component="fieldset">
              <TextField fullWidth label="Motivo" {...bindReason} />
            </FormControl>
          </form>
        </ThemeProvider >
      </div>
      <div className={styles.actions}>
        <RectangularButton
          title="Continuar"
          onClick={handleSubmit}
          primary
        ></RectangularButton>
        <RectangularButton
          title="Voltar"
          onClick={props.onBack}
          disabled={false}
        ></RectangularButton>
      </div>
    </WhitePageWrapper>
  </>)
}

export default DeletionReasonStep;