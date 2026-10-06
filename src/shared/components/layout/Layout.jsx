import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

export const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content-wrapper">
        <TopNavbar />
        <main className="content-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
