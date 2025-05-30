import React from 'react';
import { Bell, Settings, HelpCircle } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        <img
          src="src\assets\H-DLogo.svg.png"
          alt="Harley Davidson Logo"
          className="h-10 w-auto mr-4"
        />
        <h1 className="text-xl font-semibold">
          Nitrous <span style={{color:"#ff6600"}}>AI</span>
        </h1>

      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell size={20} color="#FF6600"/>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <HelpCircle size={20} color="#FF6600"/>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Settings size={20} color="#FF6600"/>
        </button>
      </div>
    </div>
  );
};

export default TopBar