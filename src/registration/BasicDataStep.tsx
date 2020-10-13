import { createStyles, FormControl, InputLabel, makeStyles, Select, Theme, ThemeProvider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import RectangularButton from '../shared/buttons/RectangularButton';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import { useInput } from '../shared/useInput';
import Header from '../shell/Header';
import theme from '../shell/theme';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import { DialectSelectorModel, getRegionDropdown } from './RegionSelectorService';
import styles from './RegistrationSteps.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-fullWidth': {
        marginBottom: theme.spacing(2)
      },
    },
  }),
);

function BasicDataStep(props: { onComplete: (data: any) => void, onBack: () => void }) {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const { value: sex, bind: bindSex } = useInput<'M' | 'F' | 'O' | ''>('');
  const { value: age, bind: bindAgeInterval } = useInput<number>(0);
  const { value: region, bind: bindRegion } = useInput<string>('');
  const { value: dialect, bind: bindDialect } = useInput<string>('');
  const [dialectsList, setDialectsList] = useState<DialectSelectorModel[]>([]);
  const [valid, setValid] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setLoading(false);
  });

  useEffect(() => {
    // validate region
    if (region) {
      const dialects = getRegionDropdown().find((regionOption) => regionOption.value === region)?.dialects;
      if (dialects) {
        setDialectsList(dialects);
      }
    }

    setValid(Boolean(sex && age && region && dialect));
  }, [sex, age, region, dialect])

  const handleSubmit = (evt?: any) => {
    evt.preventDefault();
    props.onComplete({ sex, age, region, dialect });
  }

  return (<ThemeProvider theme={theme}>
    <Header></Header>
    <WhitePageWrapper>
      <div>
        <h1 className={styles.title}>Cadastro</h1>
      </div>
      <div className={styles.formLabel}>
        <span className={styles.label}>Dados pessoais</span>
      </div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit} className={`${classes.root} ${styles.fullHeight}`}>
        <FormControl fullWidth>
          <InputLabel htmlFor="gender-selector">Gênero</InputLabel>
          <Select fullWidth native {...bindSex} inputProps={{ name: 'gender', id: 'gender-selector', }}>
            <option aria-label="None" value="" />
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
            <option value="O">Outro</option>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="age-interval-selector">Faixa etária</InputLabel>
          <Select fullWidth native {...bindAgeInterval} inputProps={{ name: 'age', id: 'age-interval-selector', }}>
            <option aria-label="None" value="" />
            <option value={'25-'}>até 25</option>
            <option value={'26-35'}>26-35</option>
            <option value={'36-45'}>36-45</option>
            <option value={'46-55'}>46-55</option>
            <option value={'56-65'}>56-65</option>
            <option value={'66-75'}>66-75</option>
            <option value={'75+'}>mais que 75</option>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="region-selector">Região de origem</InputLabel>
          <Select fullWidth native {...bindRegion} inputProps={{ name: 'region', id: 'region-selector', }}>
            <option aria-label="None" value="" />
            {getRegionDropdown().map((regionOption) => {
              return <option key={regionOption.value} value={regionOption.value}>{regionOption.label}</option>;
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="dialect-selector">Sotaque de identificação</InputLabel>
          <Select fullWidth native {...bindDialect}
            inputProps={{ name: 'dialect', id: 'dialect-selector', }}
            disabled={!dialectsList.length}>
            <option aria-label="None" value="" />
            {dialectsList.map((dialectOption) => {
              return <option key={dialectOption.value} value={dialectOption.value}>{dialectOption.label}</option>;
            })}
          </Select>
        </FormControl>
      </form>
      <div className={styles.actions}>
        <RectangularButton
          title="Continuar"
          onClick={handleSubmit}
          primary
          disabled={!valid}
        ></RectangularButton>
        <RectangularButton
          title="Voltar"
          onClick={props.onBack}
          disabled={false}
        ></RectangularButton>
      </div>
    </WhitePageWrapper>
  </ThemeProvider>)
}

export default BasicDataStep;