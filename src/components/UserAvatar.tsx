import React from 'react';
import { Avatar } from '@vkontakte/vkui';
import { useAppSelector } from '../store/hooks';
import { Icon56UserCircleOutline } from '@vkontakte/icons';

function UserAvatar() {
  const user = useAppSelector((state) => state.user.value);
  return (
    <>
      {user.photoURL ? (
        <Avatar size={64} src={user.photoURL} className="user-avatar" />
      ) : (
        <Icon56UserCircleOutline className="user-avatar" />
      )}
    </>
  );
}

export default UserAvatar;
