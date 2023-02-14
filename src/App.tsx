import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import RegistrationPage from './pages/RegistrationPage';
import Header from './components/Header';
import { Div, Group } from '@vkontakte/vkui';
import { useAppDispatch } from './store/hooks';
import { setUser, setUserTodos } from './store/reducers/user';
import { database } from './firebase';
import { ref, onValue } from 'firebase/database';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const id = localStorage.getItem('id') ? localStorage.getItem('id') : null;

  const getUserData = (id: string | null) => {
    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();
      if (id && data[`${id}`]) {
        dispatch(
          setUser({
            id: id!,
            photoURL: data[`${id}`].photoURL ? data[`${id}`].photoURL : '',
          })
        );
        dispatch(setUserTodos(data[`${id}`].todos ? data[`${id}`].todos : []));
        navigate('/app');
      }
    });
  };

  useEffect(() => {
    getUserData(id);
  }, []);

  return (
    <Div style={{ maxWidth: 700, margin: '0 auto' }}>
      <Group>
        <Header />
        <Routes>
          <Route
            path="/"
            element={id ? <Navigate replace to="/app" /> : <Navigate replace to="/login" />}
          />
          <Route path="/login" element={id ? <Navigate replace to="/app" /> : <LoginPage />} />
          <Route path="/app" element={id ? <TodoPage /> : <Navigate replace to="/login" />} />
          <Route path="/reg" element={<RegistrationPage />} />
          {/*<Route*/}
          {/*  path="/reg"*/}
          {/*  element={id ? <RegistrationPage /> : <Navigate replace to="/login" />}*/}
          {/*/>*/}
        </Routes>
      </Group>
    </Div>
  );
}

export default App;
