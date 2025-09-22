import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import MainScreen from './screens/MainScreen';
import MatchScreen from './screens/MatchScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import Header from './components/Header'; 

import './index.css';
import './App.css';

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <MainScreen />,
      },
      {
        path: 'favorites',
        element: <FavoritesScreen />,
      },
      {
        path: 'match/:id',
        element: <MatchScreen />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
