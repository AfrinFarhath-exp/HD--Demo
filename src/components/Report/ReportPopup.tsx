import React, { useState, useEffect } from "react";
import Select from "react-select";
import { theme } from "../../theme";
import ReportSearch from "../../components/Report/ReportSearch";
import ReusableReportTable from "./ReusableReportTable";

const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
];

const ReturnPopup = ({
  // title = "Returns Report",
  handleClose,
  onViewReport,
}: {
  title?: string;
  handleClose: () => void;
  onViewReport: (data: {  startDate: string }) => void;
}) => {
const [contentUs, setContentUs] = useState("");
const [contentCa, setContentCa] =useState("");

  const [startDate, setStartDate] = useState("");
  const [visible, setVisible] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [reportData, setReportData] = useState<
    { country: string; data: any }[]
  >([]);

  useEffect(() => {
    setVisible(true);
  }, []);

  
const API_KEY = "8EhgReELYz1ubhefjbu3ypHQu3izCzx05so65jpkUjLvKUi3oEj8JQQJ99BEACYeBjFXJ3w3AAABACOGQKn6"; 
const API_ENDPOINT= "https://hd-dddrdnc2amfvdrcw.eastasia-01.azurewebsites.net/Metrics_search";
const handleViewReport = async () => {
  try {
    if (!selectedCountries.length) {
      alert("Please select at least one country.");
      return;
    }

    const responses = await Promise.all(
      selectedCountries.map(async (country) => {
        // Format date as dd/mm/yyyy
        const formattedDate = new Date(startDate).toLocaleDateString("en-GB");

        // Build query string as requested
        const query = `${title}on ${formattedDate}`;

        const requestBody = {
          query,
          top_k: 2,
        };
console.log("requestbody",requestBody)
        const res = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": API_KEY,
          },
          body: JSON.stringify(requestBody),
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch for ${country}: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("reporttake", data);
        
        return data;
        
      })
    );

   
        const allData = responses.flat();
console.log("allData", allData);

const caItems = allData.filter(item => item.content?.includes("**Country:** CA"));
const content_ca = caItems.length ? caItems[caItems.length - 1].content : "";


const usItems = allData.filter(item => item.content?.includes("**Country:** US"));
const content_us = usItems.length ? usItems[usItems.length - 1].content : "";
console.log("contentUs",content_us);
console.log("contentUs",content_ca);


    setReportData(allData); // store if needed
    setShowReport(true);
   setContentUs(content_us ? content_us : "");
setContentCa(content_ca ?content_ca: "");

   //  console.log("contentUs",contentUs);
//      console.log("contentCa",contentCa);



    setShowReport(true);
    onViewReport({ startDate });
  } catch (err) {
    console.error("API Error:", err);
    alert("Failed to load report. Please try again.");
  }
};

//  console.log("contentUs",contentUs);
//      console.log("contentCa",contentCa);
  return (
    <>
      <style>
        {`
          @keyframes slideJumpFade {
            0% {
              opacity: 0;
              transform: translateX(100px) scale(0.8);
            }
            60% {
              transform: translateX(-10px) scale(1.05);
              opacity: 1;
            }
            100% {
              transform: translateX(0) scale(1);
              opacity: 1;
            }
          }
        `}
      </style>

      <div
        style={{
          animation: visible ? "slideJumpFade 0.6s ease forwards" : "none",
          background: "white",
          color: theme.colors.text.primary,
          position: "relative",
          boxShadow: theme.shadows.lg,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.xxl,
          maxWidth: "768px",
          margin: `${theme.spacing.xxl} auto`,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: theme.spacing.sm,
            right: theme.spacing.sm,
            color: "#000",
            border: "none",
            borderRadius: "60%",
            width: "27px",
            height: "28px",
            fontSize: "1.5rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: `10px`,
          }}
        >
          &times;
        </button>

        <h2
          style={{
            fontSize: theme.typography.fontSize.xxl,
            fontWeight: theme.typography.fontWeight.bold,
            marginBottom: theme.spacing.xl,
            textAlign: "left",
          }}
        >
          {title}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: theme.spacing.xl,
            marginBottom: theme.spacing.xxl,
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                marginBottom: theme.spacing.md,
              }}
            >
              Select Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff3e0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
              style={{
                width: "100%",
                border: `2px solid ${theme.colors.text.primary}`,
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.sm,
                fontSize: theme.typography.fontSize.md,
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                marginBottom: theme.spacing.md,
              }}
            >
              Select Country
            </label>
            <Select
              isMulti
              options={countries}
              value={countries.filter((option) =>
                selectedCountries.includes(option.value)
              )}
              onChange={(selectedOptions) => {
                const values = selectedOptions.map((opt) => opt.value);
                setSelectedCountries(values);
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  border: `2px solid ${theme.colors.text.primary}`,
                  borderRadius: theme.borderRadius.md,
                  padding: "2px",
                  fontSize: theme.typography.fontSize.md,
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#fff3e0" : "white",
                  color: theme.colors.text.primary,
                }),
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "24px",
          }}
        >
          <button
            onClick={handleViewReport}
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.text.light,
              fontWeight: theme.typography.fontWeight.bold,
              padding: `${theme.spacing.sm} ${theme.spacing.xxl}`,
              borderRadius: theme.borderRadius.md,
              fontSize: theme.typography.fontSize.lg,
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "160px",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = theme.colors.hover)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = theme.colors.primary)
            }
          >
            View Report
          </button>
        </div>

        {showReport && (
          <ReportSearch
            startDate={startDate}
            reportData={reportData} // Pass combined data here
          />
        )}
       {showReport && (
 <ReusableReportTable
  reportName="Performance Summary"
  content_us={contentUs}
  content_ca={contentCa}
/>

)}


      </div>
    </>
  );
};

export default ReturnPopup;

