import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// assets
import 'assets/scss/style.scss';

// third party
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

// project import
import App from 'layout/App';
import reducer from 'store/reducer';
import GlobalToast from '../src/component/GlobalToast';

const store = configureStore({ reducer });

const root = createRoot(document.getElementById('root'));

// ==============================|| MAIN - REACT DOM RENDER  ||==============

root.render(
  <Provider store={store}>
    <PrimeReactProvider>
      <BrowserRouter basename={import.meta.env.VITE_APP_BASE_NAME}>
        <App />
        <GlobalToast />
      </BrowserRouter>
    </PrimeReactProvider>
  </Provider>
);
