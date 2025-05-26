import React from 'react';
import { Bell, Settings, HelpCircle } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Harley-Davidson_logo.svg/1200px-Harley-Davidson_logo.svg.png"
          alt="Harley Davidson Logo"
          className="h-10 w-auto mr-4"
        />
        <h1 className="text-xl font-semibold">Nitrous AI</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <HelpCircle size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopBar