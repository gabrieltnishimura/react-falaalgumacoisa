import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React, { useEffect } from 'react';
import styles from '../registration/RegistrationSteps.module.css';
import RectangularButton from '../shared/buttons/RectangularButton';
import { useStyles } from '../shared/forms/material-typography';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import { useInput } from '../shared/useInput';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';

function ConfirmDeletionStep(props: { onComplete: () => void, onBack: () => void }) {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const { value: confirmDeletion, bind: bindConfirmDeletion } = useInput<'Y' | 'N' | ''>('');
  const classes = useStyles();

  useEffect(() => {
    setLoading(false);
  });

  const handleSubmit = () => {
    if (confirmDeletion === 'Y') {
      props.onComplete();
    } else if (confirmDeletion === 'N') {
      props.onBack();
    }
  }

  return (<>
    <Header></Header>
    <WhitePageWrapper>
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>Excluir conta</h1>
          <h2 className={styles.subtitle}>É uma pena saber que não teremos você mais conosco ):</h2>
        </div>
        <div className={styles.formLabel}>
          <span className={styles.label}>Tem certeza que desejar apagar sua conta?</span>
        </div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit} className={`${classes.root} ${styles.fullHeight}`}>
          <FormControl fullWidth component="fieldset">
            <RadioGroup aria-label="gender" name="customized-radios" {...bindConfirmDeletion}>
              <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              <FormControlLabel value="N" control={<Radio />} label="Não" />
            </RadioGroup>
          </FormControl>
        </form>
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

export default ConfirmDeletionStep;