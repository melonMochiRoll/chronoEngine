import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import MainRouter from 'Routes/MainRouter';
import { GlobalStyle } from 'Styles/GlobalStyle';

const rootNode = document.getElementById('root') as HTMLElement;

createRoot(rootNode).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={MainRouter} />
  </React.StrictMode>
);