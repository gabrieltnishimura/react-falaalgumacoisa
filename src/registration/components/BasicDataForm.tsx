import { FormControl, InputLabel, Select } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../authentication/UserProvider';
import { useStyles } from '../../shared/forms/material-typography';
import { useInput } from '../../shared/useInput';
import { DialectSelectorModel, getRegionDropdown } from '../RegionSelectorService';
import { RegistrationDataModel } from '../RegistrationDataModel';
import styles from '../RegistrationSteps.module.css';

function BasicDataForm(props: { onValid: (data: RegistrationDataModel) => void, onInvalid: () => void }) {
  const { metadata } = useContext(UserContext);
  const { value: gender, bind: bindGender } = useInput<'M' | 'F' | 'O' | undefined>(metadata?.gender);
  const { value: age, bind: bindAgeInterval } = useInput<string>(metadata?.ageInterval || '');
  const { value: region, bind: bindRegion } = useInput<string>(metadata?.region || '');
  const { value: dialect, setValue: setDialect, bind: bindDialect } = useInput<string>(metadata?.dialect || '');
  const [dialectsList, setDialectsList] = useState<DialectSelectorModel[]>([]);
  const [valid, setValid] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    // validate region
    if (region) {
      const dialects = getRegionDropdown().find((regionOption) => regionOption.value === region)?.dialects;
      if (dialects) {
        setDialectsList(dialects);
        const found = dialects.find(item => item.value === dialect);
        if (!found) {
          setDialect('');
          props.onInvalid();
          return;
        }
      }
    }

    if (Boolean(gender && age && region && dialect)) {
      setValid(true);
      props.onValid({ gender, age, region, dialect });
    } else {
      props.onInvalid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender, age, region, dialect]);

  const handleSubmit = (evt?: any) => {
    evt.preventDefault();
    if (valid) {
      props.onValid({ gender, age, region, dialect });
    } else {
      props.onInvalid();
    }
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit} className={`${classes.root} ${styles.fullHeight}`}>
      <FormControl fullWidth>
        <InputLabel htmlFor="gender-selector">Gênero</InputLabel>
        <Select fullWidth native {...bindGender} inputProps={{ name: 'gender', id: 'gender-selector', }}>
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
          <option value={'25-'}>Até 25 anos</option>
          <option value={'26-35'}>Entre 26 e 35 anos</option>
          <option value={'36-45'}>Entre 36 e 45 anos</option>
          <option value={'46-55'}>Entre 46 e 55 anos</option>
          <option value={'56-65'}>Entre 56 e 65 anos</option>
          <option value={'66-75'}>Entre 66 e 75 anos</option>
          <option value={'75+'}>Mais que 75 anos</option>
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
    </form>);
}

export default BasicDataForm;