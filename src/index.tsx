import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AdaptivityProvider, ConfigProvider, AppRoot } from '@vkontakte/vkui';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux/es/exports';
import { store } from 'store/store';
import './firebase';
import '@vkontakte/vkui/dist/vkui.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <BrowserRouter basename="/">
        <Provider store={store}>
          <AppRoot>
            <App />
          </AppRoot>
        </Provider>
      </BrowserRouter>
    </AdaptivityProvider>
  </ConfigProvider>
);
