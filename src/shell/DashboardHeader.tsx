import React, { useState } from 'react';
import { ReactComponent as ProfileIcon } from '../assets/icons/profile.svg';
import DashboardMenu from '../dashboard/DashboardMenu';
import Header from './Header';
import styles from './Header.module.css';
function DashboardHeader() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <Header logoColor="black"
        icon={{ component: <ProfileIcon className={styles.profileIcon} />, onClick: toggleMenu }} ></Header>
      {showMenu ? <DashboardMenu close={toggleMenu} /> : null}
    </>
  );
}

export default DashboardHeader;
