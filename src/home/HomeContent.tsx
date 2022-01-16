import React from 'react';
import styles from './HomeContent.module.css';
import SimpleStats from './components/SimpleStats';
import HomeCallToAction from './components/HomeCallToAction';
import { isDesktop } from '../shared/utils';

function HomeContent(props: { redirectRecordingFn: () => void }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Comece já a sua jornada na ciência!</h1>
      </div>
      {!isDesktop() && <HomeCallToAction redirectRecordingFn={props.redirectRecordingFn} />}
      <div className={styles.descriptionWrapper}>
        <p className='body1 cmediumGray'>
          O Fale Alguma Coisa é uma iniciativa colaborativa para criação de uma base de vozes em português brasileiro. Contribua para ciência doando a sua voz! <br /><br />
          Desafie seus amigos e jogue com outros contribuidores!  As vozes coletadas são anônimas e o acesso é gratuito para pesquisa e uso pessoal. <br /><br />
          O cadastro é opcional, mas pode nos ajudará a categorizar melhor a sua voz.
        </p>
      </div>
      <SimpleStats />
      {isDesktop() && <HomeCallToAction redirectRecordingFn={props.redirectRecordingFn} />}
    </div>
  );
}

export default HomeContent;
