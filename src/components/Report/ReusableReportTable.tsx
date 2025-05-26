

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


// Function to extract performance metrics from the markdown string
const extractMetrics = (content: string): Record<string, string> => {
  console.log("Extracting metrics from:", content);
  
  if (!content || typeof content !== 'string') {
    console.warn("Invalid content provided to extractMetrics:", content);
    return {};
  }
  
  const metrics: Record<string, string> = {};
  
  // Try different formats - first look for markdown-style bullet points
  const bulletPointRegex = /[-*]\s+([^:]+):\s+(.*)/g;
  let match;
  
  while ((match = bulletPointRegex.exec(content)) !== null) {
    const label = match[1].trim();
    const value = match[2].trim();
    if (label && value) {
      metrics[label] = value;
    }
  }
  
  // If we didn't find any metrics with bullet points, try key-value pairs
  if (Object.keys(metrics).length === 0) {
    const keyValueRegex = /\*\*([^:*]+):\*\*\s+(.*)/g;
    
    while ((match = keyValueRegex.exec(content)) !== null) {
      const label = match[1].trim();
      const value = match[2].trim();
      if (label && value) {
        metrics[label] = value;
      }
    }
  }
  
  // Fallback to simple line parsing if still no metrics
  if (Object.keys(metrics).length === 0) {
    const lines = content.split("\n").map(line => line.trim());
    
    lines.forEach(line => {
      if (line.includes(":")) {
        const [labelPart, ...valueParts] = line.split(":");
        const label = labelPart.trim();
        const value = valueParts.join(":").trim();
        if (label && value && !label.includes("Country")) { // Skip country identifier
          metrics[label] = value;
        }
      }
    });
  }
  
  console.log("Extracted metrics:", metrics);
  return metrics;
};

const ReusableReportTable: React.FC<Props> = ({
  reportName,
  content_us,
  content_ca,
}) => {
  console.log("ReusableReportTable received:");
  console.log("content_us:", content_us);
  console.log("content_ca:", content_ca);

  const result: Record<
    string,
    Record<string, { title: string; value: string }>
  > = {};

  const countries: string[] = [];

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
    countries.push("CA");
    Object.entries(metrics).forEach(([metricKey, value]) => {
      if (!result[metricKey]) result[metricKey] = {};
      result[metricKey]["CA"] = {
        title: metricKey,
        value,
      };
    });
  }

  console.log("Processed result for table:", result);
  console.log("Countries found:", countries);

  // Handle case when no data available at all
  if (countries.length === 0 || Object.keys(result).length === 0) {
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
        style={{ maxHeight: 480, maxWidth: "800px" }}
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