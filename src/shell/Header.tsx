import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <li className={styles.list}>
        <ul>
          <Link className={styles.link} to="/">Home</Link>
        </ul>
        <ul>
          <Link className={styles.link} to="/dados-pessoais">Dados Pessoais</Link>
        </ul>
        <ul>
          <Link className={styles.link} to="/gravar">Gravar</Link>
        </ul>
      </li>
    </header>
  );
}

export default Header;
