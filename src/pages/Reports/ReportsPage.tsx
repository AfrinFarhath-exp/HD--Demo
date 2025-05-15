import React, { useState } from "react";
import ReportCard from "../../components/Report/ReportCard";
import reports from "../../data/report";
import ReturnPopup from "../../components/Report/ReportPopup";
import ReportSearch from "../../components/Report/ReportSearch";
import SendIcon from '@mui/icons-material/Send';

export default function ReportsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState("");
  const [inputQuery, setInputQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const [reportParams, setReportParams] = useState<{
    title: string;
    startDate: string;
    endDate: string;
  } | null>(null);

  const firstRow = reports.slice(0, 5);
  const secondRow = reports.slice(5);

  const handleCardClick = (title: string) => {
    setSelectedReport(title);
    setShowModal(true);
  };

  const handleViewReport = (data: {
    title: string;
    startDate: string;
    endDate: string;
  }) => {
    console.log("Report Data Submitted:", data);
    setReportParams(data);
    setShowModal(false);
    // TODO: Send data to backend or open a detailed report view
  };

   const handleSearch = () => {
      const q = inputQuery.trim();
      if (!q) return;
      setActiveQuery(q);
      setInputQuery("");
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleSearch();
    };
  
    // if we have an activeQuery, show the SearchPage
    if (activeQuery !== null) {
      return (
        <div className="max-w-2xl mx-auto px-4">
          <button
            onClick={() => setActiveQuery(null)}
            className="mb-4 text-sm text-blue-600 hover:underline"
          >
            ← Back
          </button>
          <ReportSearch query={activeQuery} />
        </div>
      );
    }

  return (
    <div className="flex flex-col justify-center pt-24">
      <h1 className="text-4xl font-bold text-center mb-6">Reports</h1>


      <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-center mt-10">
              <div className="relative w-full">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me Anything..."
                  className="w-full pr-10 pl-4 py-2 border rounded-lg shadow-sm focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <SendIcon className="h-5 w-5 text-primary" />
                </button>
              </div>
            </div>
          </div>


      <div className="flex flex-wrap justify-center gap-4 pt-10">
        {firstRow.map((report) => (
          <ReportCard
            key={report.title}
            title={report.title}
            onClick={() => handleCardClick(report.title)}
          />
        ))}
      </div>

      <div className="h-8" />

      <div className="flex flex-wrap justify-center gap-4">
        {secondRow.map((report) => (
          <ReportCard
            key={report.title}
            title={report.title}
            onClick={() => handleCardClick(report.title)}
          />
        ))}
      </div>

      <p className="text-center text-gray-500 mb-10 pt-10">
        Choose the reports you need...
      </p>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[100]">
          <ReturnPopup
            title={selectedReport}
            handleClose={() => setShowModal(false)}
            onViewReport={handleViewReport}
          />
        </div>
      )}

     
    </div>
  );
}
