import React, { useState } from 'react';
import * as friendsService from '../apis/FriendsService';
import DismissableActionButton from '../shared/buttons/DismissableActionButton';

function FollowNotificationButton(props: {
  nickname: string,
  id: string,
  dismiss: () => void,
}) {
  const [follow, setFollow] = useState(false);

  const followFn = async () => {
    await friendsService.actOnFriend(props.id, { follow: true, unfollow: false });
    setFollow(!follow);
  }

  const unfollowFn = async () => {
    await friendsService.actOnFriend(props.id, { follow: false, unfollow: true });
    setFollow(!follow);
  }

  return <DismissableActionButton initials="CP"
    buttonTitle={follow ? "Seguindo" : "Seguir de volta"}
    content={<span>O usuário <b>{props.nickname}</b> começou a te seguir</span>}
    onClick={follow ? unfollowFn : followFn} onClose={props.dismiss}
    primary={!follow}
  />;
}

export default FollowNotificationButton;