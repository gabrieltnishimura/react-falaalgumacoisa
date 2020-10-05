import React, { useEffect, useState } from 'react';
import LinkItem from '../shell/LinkItem';
import styles from './NameRandomizer.module.css';
import NameRandomizerService from './NameRandomizerService';

const randomizer = new NameRandomizerService();

function NameRandomizer(props: { onRandomized: (generated: string) => void }) {
  const [name, setName] = useState('');

  const randomizeNewNameFn = async () => {
    const randomNickname = await randomizer.randomize();
    setName(randomNickname);
    props.onRandomized(randomNickname);
  }

  useEffect(() => {
    randomizeNewNameFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={styles.wrapper}>
        <span className={styles.name}>{name}</span>
      </div>
      <div>
        <LinkItem title="Não gostei desse" onclick={randomizeNewNameFn} color="cobalt"></LinkItem>
      </div>
    </div>
  );
}

export default NameRandomizer;
