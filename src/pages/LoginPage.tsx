import React from 'react';
import Login from '../components/Login';
import LoginButtons from '../components/LoginButtons';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  AuthProvider,
} from 'firebase/auth';
import { Div, Title } from '@vkontakte/vkui';
import { useAppDispatch } from 'store/hooks';
import { setUser, setUserTodos } from 'store/reducers/user';
import { getUserData } from '../utils/getUserData';

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const setUserHandler = (
    id: string,
    dataId: {
      photoURL: string | null;
    }
  ) => {
    dispatch(
      setUser({
        id: id,
        photoURL: dataId.photoURL ? dataId.photoURL : '',
      })
    );
  };

  const setTodosHandler = (
    id: string,
    dataId: {
      todos: { id: number; text: string; isCompleted: boolean }[] | null;
    }
  ) => {
    dispatch(setUserTodos(dataId.todos ? dataId.todos : []));
  };

  const setUserEmpty = (id: string, photoURL: string | null) => {
    dispatch(setUser({ id: id, photoURL: photoURL ? photoURL : '' }));
  };

  const setTodosEmpty = () => {
    dispatch(setUserTodos([]));
  };

  const navigateHandler = () => navigate('/app');

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
        const id = user.uid;
        const photoURL = user.photoURL;
        getUserData({
          id,
          photoURL,
          setUserHandler,
          setTodosHandler,
          navigateHandler,
          setUserEmpty,
          setTodosEmpty,
        });
        localStorage.setItem('id', user.uid);
      })
      .catch(console.error);
  };

  return (
    <>
      <Div>
        <Title level="2" style={{ marginBottom: 16 }}>
          Login or{' '}
          <Link to="/reg" style={{ color: '#2d81e0' }}>
            Create Account
          </Link>
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
