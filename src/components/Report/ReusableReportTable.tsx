

// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { reportData } from "../../data/reportTableData";

// interface Props {
//   reportName: string;
//   startDate: string;
//   endDate: string;
// }

// const parseDate = (dateStr: string): number => {
//   const [year, month, day] = dateStr.split("-").map(Number);
//   return new Date(year, month - 1, day).getTime();
// };

// const cleanValue = (val: string): number => {
//   return Number(val.replace(/[^0-9.-]+/g, ""));
// };
// const normalizeReportName = (name: string) => name.replace(/\s+/g, "_");

// const ReusableReportTable: React.FC<Props> = ({
//   reportName,
//   startDate,
//   endDate,
// }) => {
//   const jsonKey = normalizeReportName(reportName);
//   const report = reportData[jsonKey];

//   const start = parseDate(startDate);
//   const end = parseDate(endDate);

//   const result: Record<
//     string,
//     Record<string, { title: string; value: number; symbol: string; count?: number }>
//   > = {};

//   Object.entries(report).forEach(([date, data]) => {
//     const current = parseDate(date);
//     if (current >= start && current <= end) {
//       Object.entries(data).forEach(([country, countryData]) => {
//         const metrics = countryData.Metrix;
//         Object.entries(metrics).forEach(([metricKey, metric]) => {
//           const rawValue = metric.value;
//           const symbol = rawValue.replace(/[0-9.,]/g, "").trim() || "";
//           const numericValue = cleanValue(rawValue);

//           if (!result[metricKey]) result[metricKey] = {};
//           if (!result[metricKey][country]) {
//             result[metricKey][country] = {
//               title: metric.title,
//               value: 0,
//               symbol,
//               count: 0,
//             };
//           }

//           if (symbol === "%") {
//             result[metricKey][country].value += numericValue;
//             result[metricKey][country].count! += 1;
//           } else {
//             result[metricKey][country].value += numericValue;
//           }
//         });
//       });
//     }
//   });

//   const countries = Array.from(
//     new Set(Object.values(result).flatMap((metric) => Object.keys(metric)))
//   );

//   if (Object.keys(result).length === 0) {
//     return (
//       <div className="text-center text-gray-500 mb-10 pt-10">
//         No data found for the selected date range
//       </div>
//     );
//   }

//   return (
//     <>
//       <h2 className="text-small font-semibold mb-4 text-center">{reportName}</h2>
     
//         <TableContainer
//           component={Paper}
//          className="overflow-auto border rounded-md ml-48"
        
//             style={{ maxHeight: 280, maxWidth: "400px" }}
//         >
//           <Table size="small" stickyHeader style={{ tableLayout: "fixed" }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   className="font-extrabold text-sm bg-gray-100 whitespace-nowrap"
//                   style={{ width: 200, maxWidth: 200 }}
//                 >
//                    Performance Matrix
//                 </TableCell>
//                 {countries.map((country) => (
//                   <TableCell
//                     key={country}
//                     align="right"
//                     className="font-extrabold text-sm bg-gray-100"
//                   >
//                     {country}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {Object.entries(result).map(([metric, values]) => (
//                 <TableRow key={metric}>
//                   <TableCell
//                     className="capitalize text-sm whitespace-nowrap overflow-hidden text-ellipsis"
//                     style={{ width: 200, maxWidth: 200 }}
//                   >
//                     {Object.values(values)[0]?.title || metric}
//                   </TableCell>
//                   {countries.map((country) => {
//                     const entry = values[country];
//                     const formatted = (() => {
//                       if (!entry) return "-";
//                       const { value, symbol, count } = entry;
//                       if (symbol === "%") {
//                         const avg = count ? value / count : 0;
//                         return `${avg.toFixed(1)}%`;
//                       } else if (symbol === "") {
//                         return `${value}`;
//                       } else {
//                         return `${symbol}${value.toLocaleString()}`;
//                       }
//                     })();
//                     return (
//                       <TableCell key={country} align="right" className="text-sm">
//                         {formatted}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
    
//     </>
//   );
// };

// export default ReusableReportTable;

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Props {
  reportName: string;
  content_us?: string;
  content_ca?: string;
}


const extractMetrics = (content: string): Record<string, string> => {
  const lines = content.split("\n").map(line => line.trim());
  const metrics: Record<string, string> = {};

  lines.forEach(line => {
    if (line.startsWith("-")) {
      const [labelPart, ...valueParts] = line.substring(1).split(":");
      const label = labelPart.trim();
      const value = valueParts.join(":").trim();
      if (label && value) {
        metrics[label] = value;
      }
    }
  });

  return metrics;
};

const ReusableReportTable: React.FC<Props> = ({
  reportName,
  content_us,
  content_ca,
}) => {
  const result: Record<
    string,
    Record<string, { title: string; value: string }>
  > = {};

  const countries: string[] = [];
console.log("content_us",content_us);
console.log("content_us",content_ca);
  if (content_us) {
    const metrics = extractMetrics(content_us);
    countries.push("US");
    Object.entries(metrics).forEach(([metricKey, value]) => {
      if (!result[metricKey]) result[metricKey] = {};
      result[metricKey]["US"] = {
        title: metricKey,
        value,
      };
    });
  }

  if (content_ca) {
    const metrics = extractMetrics(content_ca);
    countries.push("UK");
    Object.entries(metrics).forEach(([metricKey, value]) => {
      if (!result[metricKey]) result[metricKey] = {};
      result[metricKey]["UK"] = {
        title: metricKey,
        value,
      };
    });
  }

  // Handle case when no data available at all
  if (countries.length === 0) {
    return (
      <div className="text-center text-gray-500 mb-10 pt-10">
        No data found for the selected report
      </div>
    );
  }

  return (
    <>
      <h2 className="text-small font-semibold mb-4 text-center">{reportName}</h2>
      <TableContainer
        component={Paper}
        className="overflow-auto border rounded-md ml-48"
        style={{ maxHeight: 280, maxWidth: "400px" }}
      >
        <Table size="small" stickyHeader style={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              <TableCell
                className="font-extrabold text-sm bg-gray-100 whitespace-nowrap"
                style={{ width: 200, maxWidth: 200 }}
              >
                Performance Matrix
              </TableCell>
              {countries.map((country) => (
                <TableCell
                  key={country}
                  align="right"
                  className="font-extrabold text-sm bg-gray-100"
                >
                  {country}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(result).map(([metric, values]) => (
              <TableRow key={metric}>
                <TableCell
                  className="capitalize text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ width: 200, maxWidth: 200 }}
                >
                  {values[countries[0]]?.title || metric}
                </TableCell>
                {countries.map((country) => (
                  <TableCell key={country} align="right" className="text-sm">
                    {values[country]?.value ?? "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReusableReportTable;
