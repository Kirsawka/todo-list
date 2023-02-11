import React from 'react';
import Form from '../components/Form';
import LoginButtons from '../components/LoginButtons';
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  AuthProvider,
} from 'firebase/auth';
import { Div, Title } from '@vkontakte/vkui';
import { Link } from 'react-router-dom';

interface LoginPageProps {
  getAvatarUrl: (url: string) => void;
}

function LoginPage({ getAvatarUrl }: LoginPageProps) {
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
      })
      .catch(console.error);
  };

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
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
      <Form handleClick={handleLogin} />
      <Div>
        <LoginButtons authClick={authLogin} />
      </Div>
    </>
  );
}

export default LoginPage;
