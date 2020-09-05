import React from 'react';
import { useNavigate } from 'react-router-dom';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import BasicDataService from './BasicDataService';
import HeaderFormStep from './HeaderFormStep';
import { useInput } from './useInput';

function BasicDataPage(props: any) {
  const { value: initials, bind: bindInitials } = useInput('');
  const { value: sex, bind: bindSex } = useInput<'M' | 'F'>('M');
  const { value: age, bind: bindAge } = useInput<number>(0);
  const { value: origin, bind: bindOrigin } = useInput('');
  const navigate = useNavigate();

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    const service = new BasicDataService()
    service.save({ initials, sex, age, origin }).then(() => {
      navigate('/gravar', { replace: true });
    });
  }

  /**
   * Based on TIMIT, for each speaker:
   *  - the ID (speaker's initials), 
   *  - Sex (male or female), 
   *  - DR (dialect region), 
   *  - Use (train or test), 
   *  - RecDate (recording date),
   *  - BirthDate, 
   *  - Ht (height), 
   *  - Race, 
   *  - Edu (education level) 
   *  - and optional comments listing interesting speaker attributes or abnormalities.
   */
  return (
    <WhitePageWrapper>
      <div>
        <HeaderFormStep title="Dados Básicos" step="1/2"></HeaderFormStep>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Iniciais:
        <input type="text" maxLength={2} {...bindInitials} />
              </label>
            </div>
            <div>
              <label>
                Sexo:
        <select {...bindSex}>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Ano de nascimento:
        <input type="number" minLength={4} maxLength={4} {...bindAge} />
              </label>
            </div>
            <div>
              <label>
                Região de origem:
        <input type="text" {...bindOrigin} />
              </label>
            </div>
            <input type="submit" value="Enviar" />
          </form>
        </div>
      </div>
    </WhitePageWrapper>
  );
}

export default BasicDataPage;
