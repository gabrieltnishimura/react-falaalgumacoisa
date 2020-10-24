import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SadIcon } from '../assets/icons/sad.svg';
import RectangularButton from './buttons/RectangularButton';
import styles from './FriendsUserList.module.css';
import UserList from './UserList';
import UserListModel from './UserListModel';

function FriendsUserList(props: {
  list: UserListModel,
}) {
  const navigate = useNavigate();

  const searchFriends = () => {
    navigate('/buscar-amigos');
  }

  return (
    <>
      {props.list.ranking.length === 0 ? <div className={styles.centeredContent}>
        <div className={styles.image}>
          <SadIcon />
        </div>
        <div className={styles.emptyListMessage}>
          <span>Você ainda não está seguindo nenhum amigo</span>
        </div>
        <div className={styles.searchFriendsButton}>
          <RectangularButton title="Buscar amigos" primary onClick={searchFriends} />
        </div>
      </div> : null}
      <UserList list={props.list} />
    </>
  );
}

export default FriendsUserList;
