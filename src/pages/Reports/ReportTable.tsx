

import { useState } from 'react';
import ReusableReportTable from '../../components/Report/ReusableReportTable';


const App = () => {
    const [reportName,setReportName]=useState("report1")
const [startDate,setStartDate]=useState("5/12/2025")
const [endDate,setEndDate]=useState("5/13/2025")
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{reportName}</h1>

  <ReusableReportTable reportName={reportName} startDate={startDate} endDate={endDate}/>
    </div>
  );
};

export default App;
