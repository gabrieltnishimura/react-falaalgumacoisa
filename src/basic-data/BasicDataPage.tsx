import { Radio } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '../shell/theme';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import styles from './BasicDataPage.module.css';
import BasicDataService from './BasicDataService';
import HeaderFormStep from './HeaderFormStep';
import { useInput } from './useInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-fullWidth': {
        marginBottom: theme.spacing(2)
      },
    },
  }),
);

function BasicDataPage(props: any) {
  const { value: initials, bind: bindFirstName } = useInput('');
  const { value: sex, bind: bindSex } = useInput<'M' | 'F' | 'O' | null>(null);
  const { value: age, bind: bindAgeInterval } = useInput<number>(0);
  const navigate = useNavigate();
  const classes = useStyles();


  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    const service = new BasicDataService()
    service.save({ initials, sex, age, origin }).then(() => {
      navigate('/dados-pessoais/passo-2');
    });
  }
  return (
    <ThemeProvider theme={theme}>
      <WhitePageWrapper>
        <HeaderFormStep title="Dados Básicos" step="1/2"></HeaderFormStep>
        <form noValidate autoComplete="off" onSubmit={handleSubmit} className={`${classes.root} ${styles.fullHeight}`}>
          <TextField fullWidth label="Primeiro Nome" {...bindFirstName} />
          <FormControl fullWidth>
            <InputLabel htmlFor="age-interval-selector">Age</InputLabel>
            <Select
              fullWidth
              native
              {...bindAgeInterval}
              inputProps={{
                name: 'age',
                id: 'age-interval-selector',
              }}
            >
              {/* @todo bff this */}
              <option aria-label="None" value="" />
              <option value={1}>até 25</option>
              <option value={2}>26-35</option>
              <option value={3}>36-45</option>
              <option value={4}>46-55</option>
              <option value={5}>56-65</option>
              <option value={6}>66-75</option>
              <option value={7}>mais que 75</option>
            </Select>
          </FormControl>
          <FormControl fullWidth component="fieldset">
            <FormLabel component="legend" className={styles.genderLabel}>Gênero</FormLabel>
            <RadioGroup aria-label="gender" name="customized-radios" {...bindSex}>
              <FormControlLabel value="F" control={<Radio color="primary" />} label="Feminino" />
              <FormControlLabel value="M" control={<Radio />} label="Masculino" />
              <FormControlLabel value="O" control={<Radio />} label="Outro" />
            </RadioGroup>
          </FormControl>
          <div className={styles.ctaButtonWrapper}>
            <button className={styles.ctaButton} type="submit">Continuar</button>
          </div>
        </form>
      </WhitePageWrapper>
    </ThemeProvider>
  );
}

export default BasicDataPage;
