import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as dashboardService from '../apis/DashboardService';
import redirectToRecording from '../home/RecordingRedirectionService';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import DashboardActionModel from './DashboardActionModel';
import DashboardModel, { DashboardActionTypes } from './DashboardModel';
import styles from './DashboardPage.module.css';
import DashboardPageWrapper from './DashboardPageWrapper';

function DashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardModel | null>(null);
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

  const clickAction = (action: DashboardActionModel) => {
    if (action.type === 'RECORDING') {
      const [, theme] = (action.id || '').split('_');
      if (theme) {
        redirectToRecording(theme, navigate);
      } else {
        console.error('Invalid action', action);
      }
    } else if (action.type === 'REGISTER') {
      navigate('/cadastro');
    } else if (action.id === 'RECOMMENDATION') {
      navigate('/indique-um-amigo');
    } else {
      console.log('fallback unknown', action);
    }
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

  return (
    <DashboardPageWrapper>
      <div className={styles.card}>
        <section>
          <div className={styles.badgeWrapper}>
            <div className={styles.badge}>
              <span className={styles.badgeNumber}>1</span>
            </div>
          </div>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{data?.user.name || 'Olá'}, você tem {data?.score.total || 0} pontos</h1>
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
            <div className={styles.action} key={action.id} onClick={() => clickAction(action)}>
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
    </DashboardPageWrapper>
  );
}

export default DashboardPage;