import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import BasicDataService from './BasicDataService';
import HeaderFormStep from './HeaderFormStep';
import { useInput } from './useInput';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

function BasicDataPage(props: any) {
  const { value: initials, bind: bindFirstName } = useInput('');
  const { value: sex, bind: bindSex } = useInput<'M' | 'F'>('M');
  const { value: age, bind: bindAgeInterval } = useInput<number>(0);
  const { value: origin, bind: bindOrigin } = useInput('');
  const navigate = useNavigate();
  const classes = useStyles();

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    const service = new BasicDataService()
    service.save({ initials, sex, age, origin }).then(() => {
      navigate('/gravar', { replace: true });
    });
  }
  return (
    <WhitePageWrapper>
      <div>
        <HeaderFormStep title="Dados Básicos" step="1/2"></HeaderFormStep>
        <div>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField fullWidth label="Primeiro Nome" {...bindFirstName} />
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Faixa etária</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...bindAgeInterval}
              >
                <MenuItem value={1}>até 25</MenuItem>
                <MenuItem value={2}>26-35</MenuItem>
                <MenuItem value={3}>36-45</MenuItem>
                <MenuItem value={4}>46-55</MenuItem>
                <MenuItem value={5}>56-65</MenuItem>
                <MenuItem value={6}>66-75</MenuItem>
                <MenuItem value={7}>mais que 75</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="Standard" />
          </form>
        </div>
      </div>
    </WhitePageWrapper>
  );
}

export default BasicDataPage;
