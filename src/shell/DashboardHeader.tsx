import React, { useState } from 'react';
import { ReactComponent as ProfileIcon } from '../assets/icons/profile.svg';
import DashboardMenu from '../dashboard/DashboardMenu';
import Header from './Header';

function DashboardHeader() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <Header logoColor="black"
        icon={{ component: <ProfileIcon />, onClick: toggleMenu }} ></Header>
      {showMenu ? <DashboardMenu close={toggleMenu} /> : null}
    </>
  );
}

export default DashboardHeader;
