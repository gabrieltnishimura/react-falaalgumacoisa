import React from 'react';
import { ReactComponent as ProfileSvgIcon } from '../../assets/icons/profile.svg';
import styles from './ProfileIcon.module.css';

function ProfileIcon() {
  return (
    <div className={styles.iconWrapper}>
      <ProfileSvgIcon className={styles.icon} />
    </div>
  );
}

export default ProfileIcon;
