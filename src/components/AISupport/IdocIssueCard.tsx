import React from 'react';
import type { IdocIssue } from '../../types';
import { FileText } from 'lucide-react';
import { theme } from '../../theme';

interface IdocIssueCardProps {
  issue: IdocIssue;
  onClick: (issue: IdocIssue) => void;
}

const IdocIssueCard: React.FC<IdocIssueCardProps> = ({ issue, onClick }) => {
  return (
    <button
      onClick={() => onClick(issue)}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 text-left w-full animate-slideUp"
    >
      <div className="flex items-start space-x-4">
        <div 
          className="p-3 rounded-full" 
          style={{ backgroundColor: `${theme.colors.primary}20` }}
        >
          <FileText size={24} style={{ color: theme.colors.primary }} />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-xl text-gray-900 mb-2">{issue.title}</h3>
          <p className="text-gray-600">{issue.description}</p>
        </div>
      </div>
    </button>
  );
};

export default IdocIssueCard;