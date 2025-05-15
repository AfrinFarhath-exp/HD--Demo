
// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper
// } from "@mui/material";
// import { reportData } from "../../data/reportTableData";

// interface Props {
//   reportName: string;
//   startDate: string;
//   endDate: string;
// }

// const parseDate = (dateStr: string): number => {
//   const [month, day, year] = dateStr.split("/").map(Number);
//   return new Date(year, month - 1, day).getTime();
// };

// const cleanValue = (val: string): number => {
//   return Number(val.replace(/[^0-9.-]+/g, ""));
// };

// const ReusableReportTable: React.FC<Props> = ({
//   reportName,
//   startDate,
//   endDate
// }) => {
//   const report = reportData[reportName];
//   if (!report) return <div>No report found</div>;

//   const start = parseDate(startDate);
//   const end = parseDate(endDate);

//   const result: Record<
//     string,
//     Record<string, { title: string; value: number; symbol: string }>
//   > = {};

//   Object.entries(report).forEach(([date, data]) => {
//     const current = parseDate(date);
//     if (current >= start && current <= end) {
//       Object.entries(data).forEach(([country, countryData]) => {
//         const metrics = countryData.Metrix;
//         Object.entries(metrics).forEach(([metricKey, metric]) => {
//           const symbol = metric.value.replace(/[0-9.,]/g, "").trim() || "";
//           const numericValue = cleanValue(metric.value);

//           if (!result[metricKey]) result[metricKey] = {};
//           if (!result[metricKey][country])
//             result[metricKey][country] = {
//               title: metric.title,
//               value: 0,
//               symbol
//             };

//           result[metricKey][country].value += numericValue;
//         });
//       });
//     }
//   });

//   const countries = Array.from(
//     new Set(
//       Object.values(result).flatMap((metric) => Object.keys(metric))
//     )
//   );

//   return (
//     <TableContainer component={Paper} className="shadow-md w-fit">
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell className="font-bold text-sm">Matrix</TableCell>
//             {countries.map((country) => (
//               <TableCell key={country} align="right" className="font-bold text-sm">
//                 {country}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {Object.entries(result).map(([metric, values]) => (
//             <TableRow key={metric}>
//               <TableCell className="capitalize text-sm">{metric}</TableCell>
//               {countries.map((country) => {
//                 const entry = values[country];
//                 const formatted =
//                   entry?.symbol === "%" || entry?.symbol === ""
//                     ? `${entry?.value}${entry?.symbol || ""}`
//                     : `${entry?.symbol || ""}${entry?.value.toLocaleString()}`;
//                 return (
//                   <TableCell key={country} align="right" className="text-sm">
//                     {formatted || "-"}
//                   </TableCell>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
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
  Paper
} from "@mui/material";
import { reportData } from "../../data/reportTableData";

interface Props {
  reportName: string;
  startDate: string;
  endDate: string;
}

const parseDate = (dateStr: string): number => {
  const [month, day, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day).getTime();
};

const cleanValue = (val: string): number => {
  return Number(val.replace(/[^0-9.-]+/g, ""));
};

const ReusableReportTable: React.FC<Props> = ({
  reportName,
  startDate,
  endDate
}) => {
  const report = reportData[reportName];
  if (!report) return <div>No report found</div>;

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  const result: Record<
    string,
    Record<string, { title: string; value: number; symbol: string; count?: number }>
  > = {};

  Object.entries(report).forEach(([date, data]) => {
    const current = parseDate(date);
    if (current >= start && current <= end) {
      Object.entries(data).forEach(([country, countryData]) => {
        const metrics = countryData.Metrix;
        Object.entries(metrics).forEach(([metricKey, metric]) => {
          const rawValue = metric.value;
          const symbol = rawValue.replace(/[0-9.,]/g, "").trim() || "";
          const numericValue = cleanValue(rawValue);

          if (!result[metricKey]) result[metricKey] = {};
          if (!result[metricKey][country]) {
            result[metricKey][country] = {
              title: metric.title,
              value: 0,
              symbol,
              count: 0
            };
          }

          if (symbol === "%") {
            result[metricKey][country].value += numericValue;
            result[metricKey][country].count! += 1;
          } else {
            result[metricKey][country].value += numericValue;
          }
        });
      });
    }
  });

  const countries = Array.from(
    new Set(
      Object.values(result).flatMap((metric) => Object.keys(metric))
    )
  );

  return (
    <div className="max-w-full overflow-auto border rounded-md">
      <TableContainer
        component={Paper}
        className="min-w-[600px] max-w-[1000px] overflow-x-auto"
        style={{ maxHeight: 400 }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-sm bg-gray-100">Matrix</TableCell>
              {countries.map((country) => (
                <TableCell
                  key={country}
                  align="right"
                  className="font-bold text-sm bg-gray-100"
                >
                  {country}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(result).map(([metric, values]) => (
              <TableRow key={metric}>
                <TableCell className="capitalize text-sm">{metric}</TableCell>
                {countries.map((country) => {
                  const entry = values[country];
                  const formatted = (() => {
                    if (!entry) return "-";
                    const { value, symbol, count } = entry;
                    if (symbol === "%") {
                      const avg = count ? value / count : 0;
                      return `${avg.toFixed(1)}%`;
                    } else if (symbol === "") {
                      return `${value}`;
                    } else {
                      return `${symbol}${value.toLocaleString()}`;
                    }
                  })();
                  return (
                    <TableCell key={country} align="right" className="text-sm">
                      {formatted}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReusableReportTable;
