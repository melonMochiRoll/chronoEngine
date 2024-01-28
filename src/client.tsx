import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import MainRouter from 'Routes/MainRouter';
import { GlobalStyle } from 'Styles/GlobalStyle';
import reduxStore from './store';

const rootNode = document.getElementById('root') as HTMLElement;

createRoot(rootNode).render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={reduxStore}>
      <RouterProvider router={MainRouter} />
    </Provider> 
  </React.StrictMode>
);