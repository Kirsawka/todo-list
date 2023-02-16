import React, { useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import RegistrationPage from './pages/RegistrationPage';
import Header from './components/Header';
import { Div, Group } from '@vkontakte/vkui';
import { getUserData } from './utils/getUserData';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { setUser, setUserTodos } from './store/reducers/user';
import { useAppDispatch } from 'store/hooks';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';

function App() {
  useNavigate();
  const id = localStorage.getItem('id') ? localStorage.getItem('id') : null;
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

  useEffect(() => {
    getUserData({ id, setUserHandler, setTodosHandler, navigateHandler });
  }, []);

  return (
    <Div className="app">
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
          <Route path="*" element={id ? <TodoPage /> : <Navigate replace to="/login" />} />
        </Routes>
      </Group>
    </Div>
  );
}

export default App;
