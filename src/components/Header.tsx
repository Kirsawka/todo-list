import React from 'react';
import UserAvatar from './UserAvatar';
import { Title, Div, Button } from '@vkontakte/vkui';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setUser, setUserTodos } from '../store/reducers/user';
import { useNavigate } from 'react-router-dom';

function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.value);
  const navigate = useNavigate();

  const logOutUser = () => {
    dispatch(setUser({ id: '', photoURL: '' }));
    dispatch(setUserTodos([]));
    localStorage.removeItem('id');
    navigate('/login');
  };

  return (
    <Div>
      <Title level="1" style={{ marginBottom: 26 }}>
        TODO App
      </Title>
      {user.userId && (
        <>
          <UserAvatar />
          <Button style={{ position: 'absolute', right: 24, top: 90 }} onClick={logOutUser}>
            Log Out
          </Button>
        </>
      )}
    </Div>
  );
}

export default Header;
