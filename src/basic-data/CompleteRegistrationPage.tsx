import React from 'react';
import { useNavigate } from 'react-router-dom';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import BasicDataService from './BasicDataService';
import HeaderFormStep from './HeaderFormStep';
import { useInput } from './useInput';

function CompleteRegistrationPage(props: any) {
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

  return (
    <WhitePageWrapper>
      <div>
        <HeaderFormStep title="Finalize seu cadastro" step="2/2"></HeaderFormStep>
        <div>
          <h1>Finalize seu cadastro</h1>
        </div>
      </div>
    </WhitePageWrapper>
  );
}

export default CompleteRegistrationPage;
