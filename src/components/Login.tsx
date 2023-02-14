import React from 'react';
import Form from './Form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { useAppDispatch } from 'store/hooks';
import { setUser, setUserTodos } from 'store/reducers/user';
import { database } from '../firebase';

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getUserData = (id: string | null) => {
    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();
      if (id && data[`${id}`]) {
        dispatch(
          setUser({
            id: id,
            photoURL: data[`${id}`].photoURL ? data[`${id}`].photoURL : '',
          })
        );
        dispatch(setUserTodos(data[`${id}`].todos ? data[`${id}`].todos : []));
        navigate('/app');
      }
    });
  };

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        getUserData(user.uid);
        localStorage.setItem('id', user.uid);
      })
      .catch(console.error);
  };

  return <Form title="Sign In" handleClick={handleLogin} />;
}

export default Login;
