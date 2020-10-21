import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as leaderboardService from '../apis/LeaderboardService';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import UserList from '../shared/UserList';
import UserListModel from '../shared/UserListModel';
import CardPageWrapper from '../shell/CardPageWrapper';
import DashboardHeader from '../shell/DashboardHeader';
import LinkItem from '../shell/LinkItem';
import styles from './DashboardPage.module.css';

function FriendsLeaderboardPage() {
  const navigate = useNavigate();
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [leaderboard, setLeaderboard] = useState<UserListModel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await leaderboardService.getFriendsLeaderboard();
      setLeaderboard(data);
      setLoading(false);
    };
    fetchData();
  }, [setLoading]);

  const globalRedirectFn = () => {
    setLoading(true);
    navigate('/placar-dos-lideres');
  }

  return (
    <div>
      <div className={styles.background}></div>
      <DashboardHeader />
      <CardPageWrapper>
        <div className={styles.card}>
          <section>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>Placar dos amigos</h1>
            </div>
            <div className={styles.titleLink}>
              <LinkItem title="Mostrar placar dos líderes" onclick={globalRedirectFn} color="citron" />
            </div>
            <hr className={styles.separator} />
          </section>
          <section>
            {leaderboard ? <UserList list={leaderboard} /> : null}
          </section>
        </div>
      </CardPageWrapper>
    </div>
  );
}

export default FriendsLeaderboardPage;