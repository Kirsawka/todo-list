import React from 'react';
import Login from '../components/Login';
import LoginButtons from '../components/LoginButtons';
import { Link } from 'react-router-dom';
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  AuthProvider,
} from 'firebase/auth';
import { Div, Title } from '@vkontakte/vkui';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  getAvatarUrl: (url: string) => void;
}

function LoginPage({ getAvatarUrl }: LoginPageProps) {
  const navigate = useNavigate();
  const authLogin = (event: React.MouseEvent) => {
    const target = event.target as HTMLDivElement;
    const id = target.closest('button')!.id;
    const auth = getAuth();
    let provider;
    switch (id) {
      case 'github':
        provider = new GithubAuthProvider();
        break;
      case 'google':
        provider = new GoogleAuthProvider();
        break;
    }
    signInWithPopup(auth, provider as AuthProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        const user = result.user;
        if (user.photoURL) getAvatarUrl(user.photoURL);
        console.log(user);
        navigate('/app');
      })
      .catch(console.error);
  };

  return (
    <>
      <Div>
        <Title level="2" style={{ marginBottom: 16 }}>
          Login or <Link to="/reg">Create Account</Link>
          {/*Login or <Link href="/reg"> Create Account </Link>*/}
        </Title>
      </Div>
      <Login />
      <Div>
        <LoginButtons authClick={authLogin} />
      </Div>
    </>
  );
}

export default LoginPage;
