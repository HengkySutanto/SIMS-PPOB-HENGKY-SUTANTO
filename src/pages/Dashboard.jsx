import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="container mx-auto p-4">
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}</p>
    </div>
  );
};

export default Dashboard; 