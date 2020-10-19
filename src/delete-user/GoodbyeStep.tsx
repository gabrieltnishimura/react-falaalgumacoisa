import React, { useEffect } from 'react';
import styles from '../registration/RegistrationSteps.module.css';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';

function GoodbyeStep() {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);

  useEffect(() => {
    setLoading(false);
  });

  return (<>
    <Header></Header>
    <WhitePageWrapper>
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>Até mais (:</h1>
          <h2 className={styles.subtitle}><br />Sua conta foi apagada!<br /><br />Esperamos que volte um dia. Obrigado por esse tempo juntos!</h2>
        </div>
      </div>
    </WhitePageWrapper>
  </>)
}

export default GoodbyeStep;