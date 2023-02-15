import React from 'react';
import { Avatar } from '@vkontakte/vkui';
import { useAppSelector } from '../store/hooks';
import { Icon28Users } from '@vkontakte/icons';

function UserAvatar() {
  const user = useAppSelector((state) => state.user.value);
  return (
    <>
      {user.photoURL.length !== 0 ? (
        <Avatar size={64} src={user.photoURL} className="user-avatar" />
      ) : (
        <Avatar size={48} fallbackIcon={<Icon28Users />} src="#" className="user-avatar" />
      )}
      <Avatar size={64} src={user.photoURL} className="user-avatar" />
    </>
  );
}

export default UserAvatar;
