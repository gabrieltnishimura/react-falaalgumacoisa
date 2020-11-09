import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardMenu from '../dashboard/DashboardMenu';
import NotificationIcon from '../shared/icons/NotificationIcon';
import NumberedCircleIcon from '../shared/icons/NumberedCircleIcon';
import ProfileIcon from '../shared/icons/ProfileIcon';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import styles from './DashboardHeader.module.css';
import Header from './Header';

function DashboardHeader(props: { notifications?: number, hideNotications?: boolean }) {
  const navigate = useNavigate();
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const gotoNotifications = () => {
    setLoading(true);
    navigate('/notificacoes');
  }

  return (
    <>
      <Header logoColor="black"
        icon={
          <div className={styles.actions}>
            {props.hideNotications ? null :
              <button className={styles.button} onClick={gotoNotifications}>
                {props.notifications ?
                  <NumberedCircleIcon number={props.notifications} color="orange" /> :
                  <NotificationIcon />}
              </button>}
            <button className={styles.button} onClick={toggleMenu} >
              <ProfileIcon />
            </button>
          </div>} ></Header>
      <DashboardMenu show={showMenu} close={toggleMenu} />
    </>
  );
}

export default DashboardHeader;
