import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cleanNotifications } from '../apis/NotificationService';
import { UserContext } from '../authentication/UserProvider';
import DashboardNotificationModel from '../dashboard/DashboardNotificationModel';
import styles from '../dashboard/DashboardPage.module.css';
import DashboardPageWrapper from '../dashboard/DashboardPageWrapper';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import DescriptionText from '../shared/typography/DescriptionText';
import LinkItem from '../shell/LinkItem';
import FollowNotificationButton from './FollowNotificationButton';
import notificationStyles from './NotificationsPage.module.css';

function NotificationsPage() {
  const navigate = useNavigate();
  const authenticationState = useContext(UserContext);
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const notifications: DashboardNotificationModel[] = authenticationState.metadata?.notifications || [];

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const cleanupNotifs = async () => {
    setLoading(true);
    await cleanNotifications();
    navigate('/placar-dos-lideres');
  }

  const notificationList: JSX.Element[] = notifications.map((notification, index) => {
    if (!notification) {
      return <></>;
    }

    let item: any;
    if (notification.type === 'FOLLOW' && !!notification.follow) {
      item = <FollowNotificationButton
        nickname={notification.follow.name}
        id={notification.follow.id}
        dismiss={() => { }} />;
    }

    return <li key={index}  >
      {item}
      <hr className={`${styles.separator} ${notificationStyles.separatorSpacing}`} />
    </li>
  });

  return (
    <DashboardPageWrapper hideNotifications>
      <section>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Notificações</h1>
        </div>
        {notifications?.length !== 0 ?
          <div className={styles.titleLink}>
            <LinkItem title="Limpar tudo" onclick={cleanupNotifs} color="cobalt" />
          </div> :
          null}
        <hr className={styles.separator} />
      </section>
      <section>
        {notifications?.length === 0 ?
          <DescriptionText>Você não possui novas notificações</DescriptionText> :
          <div>
            <ul className={notificationStyles.list}>
              {notificationList}
            </ul>
          </div>}
      </section>
    </DashboardPageWrapper>
  );
}

export default NotificationsPage;