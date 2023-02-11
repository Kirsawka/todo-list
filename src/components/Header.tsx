import React from 'react';
import { Avatar, Title, Div } from '@vkontakte/vkui';

interface HeaderProps {
  avatarSrc: string;
}

function Header({ avatarSrc }: HeaderProps) {
  return (
    <Div>
      <Title level="1" style={{ marginBottom: 26 }}>
        TODO App
      </Title>
      {avatarSrc && (
        <Avatar size={64} src={avatarSrc} style={{ position: 'absolute', right: 24, top: 20 }} />
      )}
    </Div>
  );
}

export default Header;
