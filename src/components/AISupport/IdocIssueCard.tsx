import React from "react";
import type { IdocIssue } from "../../types";
import { FileText } from "lucide-react";
import { theme } from "../../theme";

interface IdocIssueCardProps {
  issue: IdocIssue;
  onClick: (issue: IdocIssue) => void;
}

const IdocIssueCard: React.FC<IdocIssueCardProps> = ({ issue, onClick }) => {
  return (
    <button
      onClick={() => onClick(issue)}
      className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 text-left w-full animate-slideUp group"
      style={
        {
          "--tw-shadow-color": "transparent",
          "--hover-shadow-color": `${theme.colors.primary}20`,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.boxShadow = `0 10px 15px -3px var(--hover-shadow-color), 0 4px 6px -4px var(--hover-shadow-color)`;
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.boxShadow = "";
      }}
    >
      <div className="flex items-start space-x-4">
        <div
          className="p-1 rounded-full"
          style={{ backgroundColor: `${theme.colors.primary}20` }}
        >
          <FileText size={20} style={{ color: theme.colors.primary }} />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-600 group-hover:text-black font-semibold text-sm transition-colors duration-200">
            {issue.title}
          </h3>
        </div>
      </div>
    </button>
  );
};

export default IdocIssueCard;
