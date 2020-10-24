import React from 'react';
import styles from './UserList.module.css';
import UserListItemModel from './UserListItemModel';
import UserListModel from './UserListModel';

function UserList(props: {
  list: UserListModel,
  onFollow?: (user: UserListItemModel) => void,
  onUnfollow?: (user: UserListItemModel) => void,
}) {
  return (
    <>
      {props.list.ranking.map((user, index) => {
        const myself = user.nickname.full === props.list?.user?.nickname.full;
        return <div className={styles.wrapper} key={index.toString()}>
          <div className={styles.item}>
            <div>
              {user.position ? <div className={styles.inline}>
                <span className={styles.rank}>{user.position}</span>
              </div> : null}
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
              {user.score ? <span className={styles.score}>{user.score}pts</span> : null}
              {user?.actions?.follow ? <button className={styles.followAction}
                onClick={() => props.onFollow && props.onFollow(user)}
              >Seguir</button> : null ||
                user?.actions?.unfollow ? <button className={styles.unfollowAction}
                  onClick={() => props.onUnfollow && props.onUnfollow(user)}
                >Seguindo</button> : null}
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
