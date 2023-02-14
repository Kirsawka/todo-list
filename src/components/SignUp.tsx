import React from 'react';
import Form from './Form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ref, getDatabase, set } from 'firebase/database';
import { setUser, setUserTodos } from '../store/reducers/user';
import { useAppDispatch } from 'store/hooks';

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const writeUserData = (
    userId: string,
    photoURL: string | null,
    todos: { id: number; text: string; isCompleted: boolean }[] | null
  ) => {
    const db = getDatabase();
    const reference = ref(db, userId);
    set(reference, {
      photoURL: photoURL,
      todos: todos,
    });
  };

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
