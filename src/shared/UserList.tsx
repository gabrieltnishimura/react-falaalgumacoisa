import React from 'react';
import styles from './UserList.module.css';
import UserListModel from './UserListModel';

function UserList(props: {
  list: UserListModel,
}) {
  return (
    <>
      {props.list.ranking.map((user, index) => {
        const myself = user.nickname.full === props.list.user.nickname.full;
        return <div className={styles.wrapper} key={index.toString()}>
          <div className={styles.item}>
            <div>
              <div className={styles.inline}>
                <span className={styles.rank}>{user.position}</span>
              </div>
              <div className={styles.inline}>
                <div className={`${styles.circle} ${myself ? styles.myCircle : ''}`}>
                  <span className={styles.initials}>{user.nickname.short}</span>
                </div>
              </div>
              <div className={styles.inline}>
                <span className={`${styles.name} ${myself ? styles.mySelf : ''}`}>{user.nickname.full}</span>
              </div>
            </div>
            <div>
              <span className={styles.score}>{user.score}pts</span>
            </div>
          </div>
          <hr className={styles.separator} />
        </div>;
      }
      )}
    </>

  );
}

export default UserList;
