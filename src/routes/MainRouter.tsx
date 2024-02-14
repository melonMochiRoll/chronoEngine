import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from 'Pages/MainPage';
import NotFoundPage from 'Pages/NotFoundPage';

const MainRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
]);

export default MainRouter;