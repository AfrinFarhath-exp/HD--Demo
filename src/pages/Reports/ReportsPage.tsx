import React, { useState } from "react";
import ReportCard from "../../components/Report/ReportCard";
import reports from "../../data/report";
import ReturnPopup from "../../components/Report/ReportPopup";
import ReusableReportTable from "../../components/Report/ReusableReportTable";
import SendIcon from "@mui/icons-material/send";
import ReportSearch from "../../components/Report/ReportSearch";

type ReportParamsType = {
  title: string;
  startDate: string;
  reportName: string;
  content_us: string;
  content_ca: string;
};

export default function ReportsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState("");
  const [inputQuery, setInputQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const [reportParams, setReportParams] = useState<ReportParamsType | null>(
    null
  );
  const [showReportView, setShowReportView] = useState(false);
  const [showresult, setShowResult] = useState("");

  const firstRow = reports.slice(0, 5);
  const secondRow = reports.slice(5);

  const handleSearch = () => {
    const q = inputQuery.trim();
    if (!q) return;
    setActiveQuery(q);
    setInputQuery("");
    setShowReportView(false);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleCardClick = (title: React.SetStateAction<string>) => {
    setSelectedReport(title);
    setShowModal(true);
  };

  const handleViewReport = (data: ReportParamsType) => {
    console.log("Report Data Submitted:", data);
    setReportParams(data);
    setShowModal(false);
    setShowReportView(true);
    setActiveQuery(null);
  };

  // Return to main view
  const handleBackButton = () => {
    setActiveQuery(null);
    setShowReportView(false);
    setReportParams(null);
  };

  // Conversational search view
  if (activeQuery !== null) {
    return (
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBackButton}
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

  // Report view (new page with heading and table)
  if (showReportView && reportParams) {
    // Format dates for display
    const formatDate = (dateString: string | number | Date) => {
      if (!dateString) return "Not specified";

      try {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch (e) {
        return dateString; // Fallback to the original string if parsing fails
      }
    };

    const formattedStartDate = reportParams?.startDate
      ? new Date(reportParams.startDate).toLocaleDateString()
      : "";

    return (
      <div className="flex flex-col px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBackButton}
            className="text-primary hover:text-primary/80 font-medium flex items-center"
          >
            ← Back to Reports
          </button>
        </div>

        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">{reportParams.title}</h1>
          <p className="text-gray-600 mb-6">Date Range: {formattedStartDate}</p>

          {/* Edited container for fixed width & centered */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div style={{ width: "100%", minWidth: 800, overflowX: "auto" }}>
              <ReusableReportTable
                reportName={reportParams.title}
                content_ca={reportParams.content_ca}
                content_us={reportParams.content_us}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main reports page view
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
  <div className="flex flex-wrap gap-4 justify-center">
    {reports.map((report) => (
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

      <p className="text-center text-gray-500 mb-10 pt-10">
        Choose the reports you need...
      </p>
    </div>
  );
}
