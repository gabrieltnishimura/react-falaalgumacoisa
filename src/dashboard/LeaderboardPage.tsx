import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as leaderboardService from '../apis/LeaderboardService';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import UserList from '../shared/UserList';
import UserListModel from '../shared/UserListModel';
import LinkItem from '../shell/LinkItem';
import styles from './DashboardPage.module.css';
import DashboardPageWrapper from './DashboardPageWrapper';

function LeaderboardPage() {
  const navigate = useNavigate();
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [leaderboard, setLeaderboard] = useState<UserListModel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await leaderboardService.getGlobalLeaderboard();
      setLeaderboard(data);
      setLoading(false);
    };
    fetchData();
  }, [setLoading]);

  const friendsRedirectFn = () => {
    setLoading(true);
    navigate('/placar-dos-amigos');
  }

  return (
    <DashboardPageWrapper>
      <div className={styles.card}>
        <section>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Placar dos líderes</h1>
          </div>
          <div className={styles.titleLink}>
            <LinkItem title="Mostrar somente amigos" onclick={friendsRedirectFn} color="citron" />
          </div>
          <hr className={styles.separator} />
        </section>
        <section>
          {leaderboard ? <UserList list={leaderboard} /> : null}
        </section>
      </div>
    </DashboardPageWrapper>
  );
}

export default LeaderboardPage;