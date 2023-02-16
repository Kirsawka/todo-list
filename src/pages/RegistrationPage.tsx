import React from 'react';
import { Link } from 'react-router-dom';
import { Title, Div } from '@vkontakte/vkui';
import SignUp from '../components/SignUp';
import { setEmailError, setPassError } from '../store/reducers/errors';
import { useAppDispatch } from 'store/hooks';

function RegistrationPage() {
  const dispatch = useAppDispatch();
  return (
    <>
      <Div>
        <Title
          level="2"
          className="subtitle"
          onClick={() => {
            dispatch(setEmailError(''));
            dispatch(setPassError(''));
          }}
        >
          Create Account or{' '}
          <Link to="/login" className="link">
            Login
          </Link>
        </Title>
      </Div>
      <SignUp />
    </>
  );
}

export default RegistrationPage;
