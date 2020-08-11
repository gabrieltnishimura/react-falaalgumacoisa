import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <li className={styles.list}>
        <ul>
          <a tabIndex={0}><span>A</span></a>
        </ul>
        <ul>
          <a tabIndex={0}><span>B</span></a>
        </ul>
        <ul>
          <a tabIndex={0}><span>C</span></a>
        </ul>
      </li>
    </header>
  );
}

export default Header;
