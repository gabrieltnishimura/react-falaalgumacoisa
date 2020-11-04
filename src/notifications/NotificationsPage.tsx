import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as notificationService from '../apis/NotificationService';
import styles from '../dashboard/DashboardPage.module.css';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import CardPageWrapper from '../shell/CardPageWrapper';
import DashboardHeader from '../shell/DashboardHeader';
import LinkItem from '../shell/LinkItem';

function NotificationsPage() {
  const navigate = useNavigate();
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [notifications, setNotifications] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await notificationService.getNotifications();
        setNotifications([]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading]);

  const cleanupNotifs = () => {
    setLoading(true);
    navigate('/placar-dos-lideres');
  }

  return (
    <div>
      <div className={styles.background}></div>
      <DashboardHeader hideNotications />
      <CardPageWrapper>
        <div className={styles.card}>
          <section>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>Notificações</h1>
            </div>
            <div className={styles.titleLink}>
              <LinkItem title="Limpar tudo" onclick={cleanupNotifs} color="cobalt" />
            </div>
            <hr className={styles.separator} />
          </section>
          <section>
            {notifications?.length === 0 ?
              <span>Você não possui novas notificações</span> :
              null}
          </section>
        </div>
      </CardPageWrapper>
    </div>
  );
}

export default NotificationsPage;