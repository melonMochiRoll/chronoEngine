import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import MainRouter from 'Routes/MainRouter';

const rootNode = document.getElementById('root') as HTMLElement;

createRoot(rootNode).render(
  <React.StrictMode>
    <RouterProvider router={MainRouter} />
  </React.StrictMode>
);