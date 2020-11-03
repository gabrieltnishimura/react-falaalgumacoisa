import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import { ReactComponent as SadIcon } from '../assets/icons/sad.svg';
import { authenticationService } from '../authentication/AuthenticationService';
import { UserContext } from '../authentication/UserProvider';
import RectangularButton from '../shared/buttons/RectangularButton';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import NavigableList from '../shared/NavigableList';
import AppLogo from '../shell/AppLogo';
import LinkItem from '../shell/LinkItem';
import styles from './DashboardMenu.module.css';
import transitions from './DashboardMenuAnimations.module.css';

function DashboardMenu(props: { show: boolean, close: () => void }) {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const navigate = useNavigate();
  const ref = useRef<any>(null);
  const authenticationState = useContext(UserContext);
  const isAuthenticated = Boolean(authenticationState.user);

  const logout = async () => {
    setLoading(true);
    await authenticationService.logout();
    navigate('/');
    props.close();
  }

  const deleteUser = () => {
    setLoading(true);
    navigate('/excluir');
    props.close();
  }

  const aboutUs = <NavigableList title="SOBRE NÓS" list={[
    {
      title: 'Nossa missão',
      url: '/nossa-missao',
    },
    {
      title: 'Política de privacidade',
      url: '/politica-de-privacidade',
    },
    {
      title: 'Termos de serviço',
      url: '/termos-de-servico',
    },
  ]}
    onSameRoute={() => props.close()}
  ></NavigableList>;

  const content = isAuthenticated ? <nav className={styles.navigation}>
    <NavigableList title="GERAL" list={[
      {
        title: 'Dashboard',
        url: '/dashboard',
      },
      {
        title: 'Notificações',
        url: '/notificacoes',
        rightIcon: undefined
      },
    ]}
      onSameRoute={() => props.close()}
    ></NavigableList>
    <NavigableList title="SOCIAL" list={[
      {
        title: 'Buscar amigos',
        url: '/buscar-amigos',
      },
      {
        title: 'Placar dos líderes',
        url: '/placar-dos-lideres',
      },
      {
        title: 'Placar dos amigos',
        url: '/placar-dos-amigos',
      },
      {
        title: 'Indique um amigo',
        url: '/indique-um-amigo',
      },
    ]}
      onSameRoute={() => props.close()}
    ></NavigableList>
    <NavigableList title="CONTA" list={[
      {
        title: 'Alterar dados da conta',
        url: '/alterar-dados-conta',
      },
      {
        title: 'Alterar dados do perfil',
        url: '/alterar-dados-perfil',
      },
    ]}
      onSameRoute={() => props.close()}
    ></NavigableList>
    {aboutUs}
    <hr className={styles.separator} />
    <ul className={styles.list}>
      <li>
        <button className={styles.link} onClick={logout}>Sair da conta</button>
      </li>
      <li>
        <button className={`${styles.link} ${styles.delete}`} onClick={deleteUser}>Excluir conta</button>
      </li>
    </ul>
  </nav> :
    <div>
      <div>
        {aboutUs}
      </div>
      <div className={styles.unregisteredWrapper}>
        <div className={styles.unregisteredBackground}>
          <div className={styles.unregisteredImage}>
            <SadIcon />
          </div>
          <div className={styles.unregisteredMessageWrapper}>
            <span className={styles.unregisteredMessage}>Você ainda não está cadastrado</span>
          </div>
          <div className={styles.registrationButton}>
            <RectangularButton title="Fazer meu cadastro" primary onClick={() => navigate('/cadastrar')} />
          </div>
        </div>
        <div className={styles.knowMore}>
          <LinkItem title="Conheça mais sobre nós" onclick={() => navigate('/sobre')} color="cobalt" />
        </div>
      </div>
    </div>;

  return (
    <>
      {props.show ? <div className={styles.background}></div> : null}
      <CSSTransition
        in={props.show}
        unmountOnExit
        addEndListener={(done: any) => {
          ref.current?.addEventListener("transitionend", done, false);
        }}
        nodeRef={ref}
        classNames={transitions}
      >
        <div className={styles.overlay} ref={ref}>
          <div className={styles.header}>
            <AppLogo black />
            <button className={styles.closeIcon} onClick={props.close} >
              <CloseIcon />
            </button>
          </div>
          {content}
        </div>
      </CSSTransition>
    </>
  );
}

export default DashboardMenu;