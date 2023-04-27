import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLogo from './AppLogo';
import styles from './Footer.module.css';
import LinkItem from './LinkItem';

function Footer() {
  const navigate = useNavigate();

  return (
    <div className={styles.footer}>
      <div className={styles.flex}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo"></img>
          <AppLogo />
        </div>
        <div className={styles.actions}>
          <LinkItem
            title="Termos de Serviço"
            onclick={() => navigate('/termos-de-servico')}
            color="white"
          />
          <LinkItem
            title="Política de Privacidade"
            onclick={() => navigate('/politica-de-privacidade')}
            color="white"
          />
          <LinkItem title="Nossa Missão" onclick={() => navigate('/nossa-missao')} color="white" />
        </div>
      </div>
      <span className={styles.version}>Fale Alguma Coisa 2023</span>
    </div>
  );
}

export default Footer;
