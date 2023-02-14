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
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useAppDispatch } from 'store/hooks';
import { setUser, setUserTodos } from 'store/reducers/user';
import { database } from '../firebase';

function LoginPage() {
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

  const getUserData = (id: string, photoURL: string | null) => {
    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();
      if (data[`${id}`]) {
        dispatch(
          setUser({
            id: id,
            photoURL: data[`${id}`].photoURL ? data[`${id}`].photoURL : '',
          })
        );
        dispatch(setUserTodos(data[`${id}`].todos ? data[`${id}`].todos : []));
        navigate('/app');
      } else {
        dispatch(setUser({ id: id, photoURL: photoURL ? photoURL : '' }));
        dispatch(setUserTodos([]));
        writeUserData(id, photoURL ? photoURL : '', null);
      }
    });
  };

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
        getUserData(user.uid, user.photoURL);
        localStorage.setItem('id', user.uid);
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
