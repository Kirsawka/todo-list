import React from 'react';
import Form from './Form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { setUser, setUserTodos } from 'store/reducers/user';
import { getUserData } from '../utils/getUserData';
import { setEmailError, setPassError } from '../store/reducers/errors';

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateHandler = () => navigate('/app');

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

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const id = user.uid;
        getUserData({ id, setUserHandler, setTodosHandler, navigateHandler });
        localStorage.setItem('id', user.uid);
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/internal-error':
            dispatch(setPassError('Enter password'));
            dispatch(setEmailError(''));
            break;
          case 'auth/wrong-password':
            dispatch(setPassError('Wrong password'));
            dispatch(setEmailError(''));
            break;
          case 'auth/user-not-found':
            dispatch(setEmailError('User not found'));
            dispatch(setPassError(''));
            break;
          case 'auth/invalid-email':
            dispatch(setEmailError('Invalid email'));
            dispatch(setPassError(''));
            break;
        }
      });
  };

  return <Form title="Sign In" handleClick={handleLogin} />;
}

export default Login;
