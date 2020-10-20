import React, { useEffect, useState } from 'react';
import { ReactComponent as ProfileIcon } from '../assets/icons/profile.svg';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import CardPageWrapper from '../shell/CardPageWrapper';
import Header from '../shell/Header';
import DashboardActionModel from './DashboardActionModel';
import DashboardMenu from './DashboardMenu';
import DashboardModel, { DashboardActionTypes } from './DashboardModel';
import styles from './DashboardPage.module.css';
import DashboardService from './DashboardService';

const dashboardService = new DashboardService();

function DashboardPage() {
  const [data, setData] = useState<DashboardModel | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);

  useEffect(() => {
    const getDashboard = async () => {
      const response = await dashboardService.getDashboard();
      setData(response);
      setLoading(false);
    }
    getDashboard();
  }, [setLoading]);

  const percentStyle = {
    width: 50 + '%',
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const bannerTextStyle = (action: DashboardActionModel): string => {
    return action.type === DashboardActionTypes.REGISTER ?
      styles.registerBannerText :
      action.type === DashboardActionTypes.RECORDING ?
        '' :
        styles.extraBannerText;
  }

  const footerBackground = (action: DashboardActionModel): string => {
    return action.type === DashboardActionTypes.REGISTER ?
      styles.registerFooterBackground :
      action.type === DashboardActionTypes.RECORDING ?
        styles.recordingFooterBackground :
        styles.extraFooterBackground;
  }

  const footerTextStyle = (action: DashboardActionModel): string => {
    return action.type === DashboardActionTypes.REGISTER ?
      styles.registerFooterText :
      action.type === DashboardActionTypes.RECORDING ?
        styles.recordingFooterText :
        styles.extraFooterText;
  }

  if (!data) {
    return <></>; //add loader
  }

  return (
    <div>
      <div className={styles.background}></div>
      <Header logoColor="black"
        icon={{ component: <ProfileIcon />, onClick: toggleMenu }} ></Header>
      <CardPageWrapper>
        <div className={styles.card}>
          <section>
            <div className={styles.badge}>
              <img src="/icons/medal.svg" alt="level badge"></img>
              <span>1</span>
            </div>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>{data.user.name}, você tem {data.score.total} pontos</h1>
            </div>
            <div className={styles.progressWrapper}>
              <div className={styles.bar}>
                <div className={styles.progress} style={percentStyle}></div>
              </div>
            </div>
            <div className={styles.subtitleWrapper}>
              <span className={styles.subtitle}>Aumente sua pontuação e continue contribuindo para a ciência brasileira</span>
              <img src="/icons/brasil.png" alt="bandeira do brasil"></img>
            </div>
          </section>
          <section className={styles.actions}>
            {data?.actions.map((action) =>
              <div className={styles.action} key={action.id}>
                <div className={styles.banner}>
                  <img src={action.background.src} alt={action.background.alt} />
                  {action.banner ?
                    <div className={styles.info}>
                      <img src={action.banner.src} alt={action.banner.alt} />
                      <span className={bannerTextStyle(action)}>{action.banner.title}</span>
                    </div> :
                    null}
                </div>
                <div className={`${styles.footer} ${footerBackground(action)}`}>
                  {action.isRecording ?
                    <img className={styles.recordingIcon} src="/logo_light.png" alt="recording logo" /> :
                    null}
                  <span className={footerTextStyle(action)}>{`+ ${action.points}pts`}</span>
                </div>
              </div>
            )}
          </section>
        </div>
      </CardPageWrapper>
      {showMenu ? <DashboardMenu close={toggleMenu} /> : null}
    </div>
  );
}

export default DashboardPage;