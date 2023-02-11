import React from 'react';
import { Button, ButtonGroup, Image } from '@vkontakte/vkui';
import googleLogo from '../assets/svg/google-logo.svg';
import githubLogo from '../assets/svg/github-logo.svg';

interface LoginButtonsProps {
  authClick: (event: React.MouseEvent) => void;
}

function LoginButtons({ authClick }: LoginButtonsProps) {
  const googleLogoBefore = <Image src={googleLogo} size={32} />;
  const githubLogoBefore = <Image src={githubLogo} size={32} />;

  return (
    <ButtonGroup mode="horizontal" gap="m" stretched onClick={authClick}>
      <Button id="github" size="l" before={githubLogoBefore} stretched>
        Login with Github
      </Button>
      <Button id="google" size="l" before={googleLogoBefore} stretched>
        Login with Google
      </Button>
    </ButtonGroup>
  );
}

export default LoginButtons;
