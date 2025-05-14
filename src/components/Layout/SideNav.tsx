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
    <div className="flex flex-col h-full bg-black text-white p-4 w-64">
      <div className="py-6 flex justify-center">
        <div className="text-primary font-bold text-2xl">Harley-Davidson</div>
      </div>
      
      <nav className="flex-1 mt-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full px-4 py-3 rounded-md transition-colors ${
                  isActive(item.path)
                    ? `bg-primary text-white`
                    : `text-gray-300 hover:bg-gray-800`
                }`}
                style={{ color: isActive(item.path) ? theme.colors.text.light : theme.colors.gray[300] }}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto pb-6">
        <div className="px-4 py-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
              <span>US</span>
            </div>
            <div>
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