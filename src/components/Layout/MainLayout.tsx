import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';
import TopBar from './TopBar';

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SideNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;