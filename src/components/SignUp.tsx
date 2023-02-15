import React from 'react';
import Form from './Form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { setUser, setUserTodos } from '../store/reducers/user';
import { useAppDispatch } from 'store/hooks';
import { writeUserData } from '../utils/writeUserData';

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        writeUserData(user.uid, user.photoURL ? user.photoURL : '', null);
        dispatch(setUser({ id: user.uid, photoURL: user.photoURL ? user.photoURL : '' }));
        dispatch(setUserTodos([]));
        localStorage.setItem('id', user.uid);
        navigate('/app');
      })
      .catch(console.error);
  };

  return <Form title="Sign Up" handleClick={handleRegister} />;
}

export default SignUp;
