import React from 'react';
import Form from './Form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { setUser, setUserTodos } from 'store/reducers/user';
import { getUserData } from '../utils/getUserData';

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
      .catch(console.error);
  };

  return <Form title="Sign In" handleClick={handleLogin} />;
}

export default Login;
