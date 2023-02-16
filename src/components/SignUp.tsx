import React from 'react';
import Form from './Form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { setUser, setUserTodos } from '../store/reducers/user';
import { useAppDispatch } from 'store/hooks';
import { writeUserData } from '../utils/writeUserData';
import { setEmailError, setPassError } from '../store/reducers/errors';

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
      .catch((err) => {
        switch (err.code) {
          case 'auth/internal-error':
            dispatch(setPassError('Enter password'));
            dispatch(setEmailError(''));
            break;
          case 'auth/weak-password':
            dispatch(setPassError('Password should be at least 6 characters'));
            dispatch(setEmailError(''));
            break;
          case 'auth/email-already-in-use':
            dispatch(setEmailError('Email already in use'));
            dispatch(setPassError(''));
            break;
          case 'auth/missing-email':
            dispatch(setEmailError('Missing email'));
            dispatch(setPassError(''));
            break;
          case 'auth/invalid-email':
            dispatch(setEmailError('Invalid email'));
            dispatch(setPassError(''));
            break;
        }
      });
  };

  return <Form title="Sign Up" handleClick={handleRegister} />;
}

export default SignUp;
