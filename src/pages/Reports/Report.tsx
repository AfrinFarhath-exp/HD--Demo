// Report.tsx
import React from "react";
import ReusableReportTable from "../../components/Report/ReusableReportTable"; // Adjust path as needed

const Report = () => {
  const content_us = `**Country:** US  
**Start Date:** 5/12/2025  
**End Date:** 5/12/2025  

**Performance Metrics:**
- Total Number of Orders: 1,080  
- Total Visits: 69,450  
- AOV: $189.40  
- CVR: 1.54%`;

  const content_ca = `**Country:** UK  
**Start Date:** 5/12/2025  
**End Date:** 5/12/2025  

**Performance Metrics:**
- Total Number of Orders: 980  
- Total Visits: 45,250  
- AOV: $165.10  
- CVR: 1.45%`;

  return (
    <div>
      <ReusableReportTable
        reportName="Performance Summary"
        content_us={content_us}
        content_ca={content_ca}
      />
    </div>
  );
};

export default Report;
