import React, { useState } from "react";
import ReportCard from "../../components/Report/ReportCard";
import reports from "../../data/report";
import ReturnPopup from "../../components/Report/ReportPopup";
import ReusableReportTable from "../../components/Report/ReusableReportTable";
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

  const handleSearch = () => {
    const q = inputQuery.trim();
    if (!q) return;
    setActiveQuery(q);
    setInputQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

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
  };

  if (activeQuery !== null) {
    return (
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setActiveQuery(null)}
            className="text-primary fixed hover:text-primary/80 font-medium flex items-center z-50"
          >
            ← Back to Search
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <ReportSearch query={activeQuery} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center pt-24">
      <h1 className="text-4xl font-bold text-center mb-6">Reports</h1>

      <div className="w-full px-4">
        <div className="flex justify-center mt-10">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about the reports..."
              className="w-full pr-12 pl-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600"
            >
              <SendIcon className="text-primary h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* First Row: 5 Cards */}
      <div className="w-full flex justify-center pt-10">
        <div className="grid grid-cols-5 gap-9">
          {firstRow.map((report) => (
            <ReportCard
              key={report.title}
              title={report.title}
              onClick={() => handleCardClick(report.title)}
            />
          ))}
        </div>
      </div>

      <div className="h-8" />

      {/* Second Row: 4 Cards */}
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-4 gap-4">
          {secondRow.map((report) => (
            <ReportCard
              key={report.title}
              title={report.title}
              onClick={() => handleCardClick(report.title)}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[100]">
          <ReturnPopup
            title={selectedReport}
            handleClose={() => setShowModal(false)}
            onViewReport={handleViewReport}
          />
        </div>
      )}

      {reportParams && (
        <div className="mt-10 px-4 sm:px-16 pb-10">
          <ReusableReportTable
            reportName={reportParams.title}
            startDate={reportParams.startDate}
            endDate={reportParams.endDate}
          />
        </div>
      )}

      <p className="text-center text-gray-500 mb-10 pt-10">
        Choose the reports you need...
      </p>
    </div>
  );
}
