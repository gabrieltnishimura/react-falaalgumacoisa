import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React, { useEffect } from 'react';
import styles from '../registration/RegistrationSteps.module.css';
import ActionButtons from '../shared/buttons/ActionButtons';
import { useStyles } from '../shared/forms/material-typography';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import { useInput } from '../shared/useInput';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';

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
    <Header></Header>
    <WhitePageWrapper>
      <div className={styles.content}>
        <div className={styles.form}>
          <div>
            <h1 className={styles.title}>Excluir conta</h1>
          </div>
          <div className={styles.formLabel}>
            <span className={styles.label}>Podemos manter toda sua contribuição na nossa base de dados?</span>
          </div>
          <form noValidate autoComplete="off" onSubmit={handleSubmit} className={`${classes.root} ${styles.fullHeight}`}>
            <FormControl fullWidth component="fieldset">
              <RadioGroup aria-label="confirm-deletion" name="confirm-deletion" {...bindConfirmDeletion}>
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
                <FormControlLabel value="N" control={<Radio />}
                  label="Não, quero apagar todo o meu perfil (dados da conta, vozes gravadas…)" />
              </RadioGroup>
            </FormControl>
          </form>
        </div>
      </div>
      <ActionButtons
        primary={{
          title: 'Continuar',
          enabled: !!confirmDeletion,
          onClick: handleSubmit,
        }}
        secondary={{
          title: 'Voltar',
          disabled: false,
          onClick: props.onBack,
        }}
      ></ActionButtons>
    </WhitePageWrapper>
  </>)
}

export default KeepUserDataStep;