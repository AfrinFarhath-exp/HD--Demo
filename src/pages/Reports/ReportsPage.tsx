import ReportCard from "../../components/ReportCard";

const reports = [
  "Backorder Weekly Report",
  "eCommerce Team Revenue Report",
  "Fraud Order Monthly Report",
  "Returns Report",
  "GWP Orders Report",
  "SMGM Orders Report",
  "report",
  "report",
  "report"
];

export default function ReportsPage() {
  return (
    <div > 
      <h1 className="text-4xl font-bold text-center mb-8">Reports</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search the reports..."
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
        />
      </div>

      <p className="text-center text-gray-500 mb-10">Choose the reports you need...</p> 

      <div className="flex flex-wrap gap-4 justify-center ">
        {reports.map((title) => (
          <ReportCard key={title} title={title} />
        ))}
      </div>
    </div>
  );
}
