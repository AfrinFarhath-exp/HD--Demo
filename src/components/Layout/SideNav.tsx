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
    <div className="group flex flex-col h-full bg-black text-white transition-all duration-300 ease-in-out w-20 hover:w-64">
      <div className="py-6 px-4">
  <div className="text-primary font-bold text-2xl transition-all duration-300 ease-in-out">
    <span className="group-hover:hidden block">H-D</span>
    <span className="hidden group-hover:block">Harley-Davidson</span>
  </div>
</div>
      
      <nav className="flex-1 mt-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full py-3 rounded-md transition-all duration-300 ease-in-out ${
                  isActive(item.path)
                    ? `bg-primary text-white`
                    : `text-gray-300 hover:bg-gray-800`
                }
                group-hover:justify-start justify-center group-hover:px-4 px-0`}
                style={{ color: isActive(item.path) ? theme.colors.text.light : theme.colors.gray[300] }}
              >
                <span className="group-hover:mr-3 flex justify-center">{item.icon}</span>
                <span className="whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:block hidden">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto pb-6 px-0 group-hover:px-4 transition-all duration-300">
          <div className="flex items-center group-hover:justify-start justify-center space-x-0 group-hover:space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
              <span>US</span>
            </div>
            <div>
              <div className="hidden group-hover:block">
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