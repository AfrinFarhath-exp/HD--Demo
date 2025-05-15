import React from 'react';
import { HelpCircle, BarChart2, FileText } from 'lucide-react';
import { theme } from "../../theme";
import { useNavigate, useLocation } from 'react-router-dom';

const SideNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: <HelpCircle size={24} />, label: 'AI Support', path: '/ai-support' },
    { icon: <FileText size={24} />, label: 'Reports', path: '/reports' },
    { icon: <BarChart2 size={24} />, label: 'Metrics', path: '/metrics' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="group flex flex-col h-full bg-black text-white transition-[width] duration-700 ease-in-out w-20 hover:w-64 overflow-hidden">
      <div className="py-6 px-4">
        <div className="text-primary font-bold text-2xl relative h-6">
          <span className="block group-hover:opacity-0 transition-opacity duration-700 ease-in-out">H-D</span>
          <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">Harley-Davidson</span>
        </div>
      </div>
      
      <nav className="flex-1 mt-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full py-3 rounded-md transition-colors duration-700 ease-in-out${
                  isActive(item.path)
                    ? `bg-primary text-white`
                    : `text-gray-300 hover:bg-gray-800`
                }`}
                style={{ color: isActive(item.path) ? theme.colors.text.light : theme.colors.gray[300] }}
              >
                <span className="min-w-[64px] flex justify-center">{item.icon}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto pb-6">
          <div className="flex items-center">
            <div className="min-w-[64px] flex justify-center">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                <span>US</span>
              </div>
            </div>
            <div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
                <div className="text-sm font-medium">User Name</div>
                <div className="text-xs text-gray-400">user@company.com</div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default SideNav;