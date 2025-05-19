import React, { useState, useEffect } from "react";
import { theme } from "../../theme";
import ReportSearch from "../../components/Report/ReportSearch";

const ReturnPopup = ({
  title = "Returns Report",
  handleClose,
  onViewReport,
}: {
  title?: string;
  handleClose: () => void;
  onViewReport: (data: { title: string; startDate: string;  }) => void;
}) => {
  const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [visible, setVisible] = useState(false);
  const [showReport, setShowReport] = useState(false); // new state to control report display

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleViewReport = () => {
    onViewReport({
      title: title ?? "",
      startDate
    });
    setShowReport(true); // show the ReportSearch component
  };

  return (
    <>
      {/* Animation Keyframes */}
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
            // backgroundColor: "#000",
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
            margin: `10px 10px 10px 10px`,
          }}
        >
          &times;
        </button>

        {/* Title */}
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

        {/* Date inputs */}
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
                marginBottom: theme.spacing.xs,
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
                {/* View Report Button */}
        <div style={{marginTop:"26px"}}>
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

         </div>
      

        {/* Conditionally render ReportSearch */}
        {showReport && (
          <ReportSearch
            title={title}
            startDate={startDate}
          />
        )}
      </div>
    </>
  );
};

export default ReturnPopup;
