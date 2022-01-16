import React from 'react';
import { useNavigate } from 'react-router-dom';
import LinkItem from '../../shell/LinkItem';
import styles from './HomeMission.module.css';

function HomeMission() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <h2 className='spacingXS'>Nós temos uma missão</h2>
      <p className='body1 cmediumGray spacingXS'>
        O aplicativo Fale alguma coisa tem uma missão: promover Citizen Science de forma acessível,
        possilitando a construção e distribuição de um corpus de fala em português brasileiro.
        A distribuição será realizada em licença open-source CC BY 4.0.
      </p>
      <LinkItem title="Saiba mais" onclick={() => navigate('/nossa-missao')} color="cobalt" />
      <div className='spacingXS' />
      <h2 className='spacingXS'>Conheça mais</h2>
      <LinkItem title="Link para o corpus" onclick={() => { }} color="gray" />
      <div className='spacingXS' />
      <LinkItem title="Link para pesquisa científica" onclick={() => { }} color="gray" />
    </div>
  );
}

export default HomeMission;
