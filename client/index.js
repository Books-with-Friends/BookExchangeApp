/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import { CookiesProvider } from "react-cookie";

//our entry point  which allows us to include all the react components
//building block for the bundle
//contains all react components
render(
  <CookiesProvider>
  <App />
</CookiesProvider>,
  document.getElementById('root'),
);
