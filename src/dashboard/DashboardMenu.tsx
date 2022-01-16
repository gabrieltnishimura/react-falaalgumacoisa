import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SadIcon } from '../assets/icons/sad.svg';
import { authenticationService } from '../authentication/AuthenticationService';
import { UserContext } from '../authentication/UserProvider';
import RectangularButton from '../shared/buttons/RectangularButton';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import NavigableList from '../shared/NavigableList';
import LinkItem from '../shell/LinkItem';
import styles from './DashboardMenu.module.css';

function DashboardMenu(props: {
  closeMenu?: () => void,
  notifications?: number,
}) {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const navigate = useNavigate();
  const authenticationState = useContext(UserContext);
  const isAuthenticated = !Boolean(authenticationState.user?.isAnonymous);
  const isEmailLogin = Boolean(authenticationState.user?.isEmailLogin);

  const closeFn = () => {
    if (props.closeMenu) {
      props.closeMenu();
    }
  }

  const logout = async () => {
    setLoading(true);
    await authenticationService.logout();
    navigate('/');
    closeFn();
  }

  const deleteUser = () => {
    setLoading(true);
    navigate('/excluir');
    closeFn();
  }

  const accountOperations = isEmailLogin ? [
    {
      title: 'Alterar dados da conta',
      url: '/alterar-conta',
    },
    {
      title: 'Alterar dados do perfil',
      url: '/alterar-perfil',
    },
  ] : [
    {
      title: 'Alterar dados do perfil',
      url: '/alterar-perfil',
    },
  ]

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
    onSameRoute={() => closeFn()}
  ></NavigableList>;

  const notifCount = (props.notifications && props.notifications !== 0) ?
    <div className={styles.notificationBubble}><span>{props.notifications}</span></div> :
    null;

  return (
    <>
      {isAuthenticated ? <nav className={styles.navigation}>
        <NavigableList title="GERAL" list={[
          {
            title: 'Dashboard',
            url: '/dashboard',
          },
          {
            title: 'Notificações',
            url: '/notificacoes',
            rightIcon: notifCount,
          },
        ]}
          onSameRoute={() => closeFn()}
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
            rightIcon: <div className={styles.points}><span>+100pts</span></div>
          },
        ]}
          onSameRoute={() => closeFn()}
        ></NavigableList>
        <NavigableList title="CONTA" list={accountOperations}
          onSameRoute={() => closeFn()}
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
                <RectangularButton title="Fazer meu cadastro" primary onClick={() => navigate('/cadastro')} />
              </div>
            </div>
            <div className={styles.knowMore}>
              <LinkItem title="Conheça mais sobre nós" onclick={() => navigate('/sobre')} color="cobalt" />
            </div>
          </div>
        </div>}
    </>
  );
}

export default DashboardMenu;