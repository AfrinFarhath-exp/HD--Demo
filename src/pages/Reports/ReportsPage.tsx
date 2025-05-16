import React, { useState } from "react";
import ReportCard from "../../components/Report/ReportCard";
import reports from "../../data/report";
import ReturnPopup from "../../components/Report/ReportPopup";

export default function ReportsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState("");
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

  return (
    <div className="flex flex-col justify-center pt-24">
      <h1 className="text-4xl font-bold text-center mb-6">Reports</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Ask me Anything.."
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
        />
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
