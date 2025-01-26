import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import DashboardLayout from '../components/layouts/DashboardLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import TopUp from '../pages/TopUp';
import Transaction from '../pages/Transaction';
import Account from '../pages/Account';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Payment from '../pages/Payment';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: 'account',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Account />,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: 'dashboard',
                element: <Dashboard />,
              },
              {
                path: 'top-up',
                element: <TopUp />,
              },
              {
                path: 'transaction',
                element: <Transaction />,
              },
              {
                path: 'payment',
                element: <Payment />,
              },
            ],
          },
        ],
      },
    ],
  },
]); 