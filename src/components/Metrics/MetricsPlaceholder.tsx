import React from 'react';
import { BarChart2 } from 'lucide-react';
import { theme } from '../../theme';

const MetricsPlaceholder: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: `${theme.colors.primary}20` }}
      >
        <BarChart2 size={32} style={{ color: theme.colors.primary }} />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Metrics Coming Soon</h2>
      <p className="text-gray-500 text-center max-w-md">
        The metrics section is currently under development and will be available in a future update.
      </p>
    </div>
  );
};

export default MetricsPlaceholder;