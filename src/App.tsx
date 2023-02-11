import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import AppPage from './pages/AppPage';
import Header from './components/Header';
import RegistrationPage from './pages/RegistrationPage';
import { Div, Group } from '@vkontakte/vkui';
import { Routes, Route, Navigate } from 'react-router-dom';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';

function App() {
  const [avatarSrc, setAvatarSrc] = useState('');

  const getAvatarUrl = (url: string) => setAvatarSrc(url);

  return (
    <Div style={{ maxWidth: 700, margin: '0 auto' }}>
      <Group>
        <Header avatarSrc={avatarSrc} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage getAvatarUrl={getAvatarUrl} />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/reg" element={<RegistrationPage />} />
        </Routes>
      </Group>
    </Div>
  );
}

export default App;
