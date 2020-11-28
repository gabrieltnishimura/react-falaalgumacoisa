import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../authentication/UserProvider';
import DashboardAnimatedMenu from '../dashboard/DashboardAnimatedMenu';
import NotificationIcon from '../shared/icons/NotificationIcon';
import NumberedCircleIcon from '../shared/icons/NumberedCircleIcon';
import ProfileIcon from '../shared/icons/ProfileIcon';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import ProgressBar from '../shared/ProgressBar';
import styles from './DashboardHeader.module.css';
import Header from './Header';

function DashboardHeader(props: { score?: number, hideNotications?: boolean }) {
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
            {props.score ? <div className={styles.progress}>
              <ProgressBar points={props.score} />
            </div> : null}
            {props.hideNotications ? null :
              <button className={`${styles.button} ${styles.notificationButton}`} onClick={gotoNotifications}>
                {notifications ?
                  <NumberedCircleIcon number={notifications} color="orange" /> :
                  <NotificationIcon />}
              </button>}
            <button className={`${styles.button} ${styles.profile}`} onClick={toggleMenu} >
              <ProfileIcon />
            </button>
          </div>} ></Header>
      <DashboardAnimatedMenu show={showMenu} close={toggleMenu} notifications={notifications} />
    </>
  );
}

export default DashboardHeader;
