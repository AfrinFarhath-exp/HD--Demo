import React from 'react';
import { BarChart2, FileText, MessageSquareText } from 'lucide-react';
import { theme } from "../../theme";
import { useNavigate, useLocation } from 'react-router-dom';

const SideNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = [
    { icon: <MessageSquareText size={24} />, label: 'AI Support', path: '/ai-support' },
    { icon: <FileText size={24} />, label: 'Reports', path: '/reports' },
    { icon: <BarChart2 size={24} />, label: 'Metrics', path: '/metrics' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="group flex flex-col h-full bg-black text-white transition-[width] duration-700 ease-in-out w-20 hover:w-64 overflow-hidden">
      <div className="py-6 px-4">
        <div className="text-primary font-bold text-2xl relative w-full overflow-hidden">
  <span className="block group-hover:hidden transition-opacity duration-100 ease-linear whitespace-nowrap">
    H-D
  </span>
  <span className="hidden group-hover:inline-block transition-opacity duration-100 delay-200 ease-linear whitespace-nowrap">
    Harley Davidson
  </span>
</div>

      </div>
      
      <nav className="flex-1 mt-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.backgroundColor = theme.colors.gray[700];
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                className={`flex items-center w-full py-3 rounded-none transition-colors duration-300 ease-in-out`}
                style={{
                  backgroundColor: isActive(item.path) ? theme.colors.active : undefined,
                  color: isActive(item.path) ? theme.colors.text.light : theme.colors.gray[300],
                }}
              >
                <span className="min-w-[64px] flex justify-center">{item.icon}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out whitespace-nowrap">
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
                <div className="text-xs text-gray-400">user@harley-davidson.com</div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default SideNav;