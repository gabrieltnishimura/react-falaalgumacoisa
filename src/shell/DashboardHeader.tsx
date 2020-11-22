import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../authentication/UserProvider';
import DashboardMenu from '../dashboard/DashboardMenu';
import NotificationIcon from '../shared/icons/NotificationIcon';
import NumberedCircleIcon from '../shared/icons/NumberedCircleIcon';
import ProfileIcon from '../shared/icons/ProfileIcon';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import styles from './DashboardHeader.module.css';
import Header from './Header';

function DashboardHeader(props: { hideNotications?: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const authenticationState = useContext(UserContext);
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [showMenu, setShowMenu] = useState(false);
  const notifications = authenticationState?.metadata?.notifications.length || 0;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const gotoNotifications = () => {
    if ('/notificacoes' !== location.pathname) {
      setLoading(true);
      navigate('/notificacoes');
    }
  }

  return (
    <>
      <Header logoColor="black"
        icon={
          <div className={styles.actions}>
            {props.hideNotications ? null :
              <button className={`${styles.button} ${styles.notificationButton}`} onClick={gotoNotifications}>
                {notifications ?
                  <NumberedCircleIcon number={notifications} color="orange" /> :
                  <NotificationIcon />}
              </button>}
            <button className={styles.button} onClick={toggleMenu} >
              <ProfileIcon />
            </button>
          </div>} ></Header>
      <DashboardMenu show={showMenu} close={toggleMenu} notifications={notifications} />
    </>
  );
}

export default DashboardHeader;
