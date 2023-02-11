import React from 'react';
import { Link } from 'react-router-dom';
import { Title, Div } from '@vkontakte/vkui';
import SignUp from '../components/SignUp';

function RegistrationPage() {
  return (
    <>
      <Div>
        <Title level="2" style={{ marginBottom: 16 }}>
          Create Account or <Link to="/login">Login</Link>
          {/*Create Account or <Link href="/login"> Login </Link>*/}
        </Title>
      </Div>
      <SignUp />
    </>
  );
}

export default RegistrationPage;
