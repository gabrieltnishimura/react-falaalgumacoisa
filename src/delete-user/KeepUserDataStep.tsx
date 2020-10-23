import { createStyles, FormControl, FormControlLabel, makeStyles, Radio, RadioGroup, Theme, ThemeProvider } from '@material-ui/core';
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

function KeepUserDataStep(props: { onComplete: (keep: boolean) => void, onBack: () => void }) {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const { value: confirmDeletion, bind: bindConfirmDeletion } = useInput<'Y' | 'N' | ''>('');
  const classes = useStyles();

  useEffect(() => {
    setLoading(false);
  });

  const handleSubmit = () => {
    props.onComplete(confirmDeletion === 'Y');
  }

  return (<>
    <Header insteadNavigateToDashboard></Header>
    <WhitePageWrapper>
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>Excluir conta</h1>
        </div>
        <div className={styles.formLabel}>
          <span className={styles.label}>Podemos manter toda sua contribuição na nossa base de dados?</span>
        </div>
        <ThemeProvider theme={theme}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit} className={`${classes.root} ${styles.fullHeight}`}>
            <FormControl fullWidth component="fieldset">
              <RadioGroup aria-label="gender" name="customized-radios" {...bindConfirmDeletion}>
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
                <FormControlLabel value="N" control={<Radio />}
                  label="Não, quero apagar todo o meu perfil (dados da conta, vozes gravadas…)" />
              </RadioGroup>
            </FormControl>
          </form>
        </ThemeProvider >
      </div>
      <div className={styles.actions}>
        <RectangularButton
          title="Continuar"
          onClick={handleSubmit}
          primary
          disabled={!confirmDeletion}
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

export default KeepUserDataStep;