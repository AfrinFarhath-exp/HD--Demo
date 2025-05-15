import React, { useState } from "react";
import ReportCard from "../../components/Report/ReportCard";
import reports from "../../data/report";
import ReturnPopup from "../../components/Report/ReportPopup";

export default function ReportsPage() {
  const [showModal, setShowModal] = useState(false);
  const firstRow = reports.slice(0, 5);
  const secondRow = reports.slice(5);

  const handleCardClick = () => {
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#f4f1ee] px-8 pt-32 pb-8 relative">
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
            onClick={handleCardClick}
          />
        ))}
      </div>

      <div className="h-8" />

      <div className="flex flex-wrap justify-center gap-4">
        {secondRow.map((report) => (
          <ReportCard
            key={report.title}
            title={report.title}
            onClick={handleCardClick}
          />
        ))}
      </div>

      <p className="text-center text-gray-500 mb-10 pt-10">
        Choose the reports you need...
      </p>

   
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <ReturnPopup />
          </div>
        </div>
      )}
    </div>
  );
}
