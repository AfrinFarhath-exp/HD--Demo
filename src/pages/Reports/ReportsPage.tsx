import ReportCard from "../../components/ReportCard";


import reports from "../../data/report"; 

export default function ReportsPage() {
  const firstRow = reports.slice(0, 5);
  const secondRow = reports.slice(5);

  return (
    <div className="min-h-screen bg-[#f4f1ee] px-8 pt-32 pb-8">
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
          <ReportCard key={report.title} title={report.title} />
        ))}
      </div>

      
      <div className="h-8" />

     
      <div className="flex flex-wrap justify-center gap-4">
        {secondRow.map((report) => (
          <ReportCard key={report.title} title={report.title} />
        ))}
      </div>

      <p className="text-center text-gray-500 mb-10 pt-10">
        Choose the reports you need...
      </p>
    </div>
  );
}