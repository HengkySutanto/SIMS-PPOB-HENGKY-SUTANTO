import React from 'react';
import { Outlet } from 'react-router-dom';
import UserProfile from '../home/UserProfile';

const DashboardLayout = () => {
  return (
    <div className="container mx-auto p-5 md:p-0 md:py-5 space-y-10">
      <UserProfile />
      <Outlet />
    </div>
  );
};

export default DashboardLayout; 