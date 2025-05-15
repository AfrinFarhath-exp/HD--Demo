import React, { useState } from "react";
import { theme } from "../../theme";

const ReturnPopup = ({
  title = "Returns Report",
  handleClose,
  onViewReport,
}: {
  title?: string;
  handleClose: () => void;
  onViewReport: (data: { title: string; startDate: string; endDate: string }) => void;
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleViewReport = () => {
    console.log("Generating report for:", title);
    console.log("From:", startDate, "To:", endDate);

    // Call the parent callback with the data
    onViewReport({
      title: title ?? "",
      startDate,
      endDate,
    });
  };
return(
    <div
      style={{
        position: "relative", // for close button
        backgroundColor: theme.colors.background,
        boxShadow: theme.shadows.lg,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.xxl,
        maxWidth: "768px",
        margin: `${theme.spacing.xxl} auto`,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      {/* ❌ Close Button */}
      <button
        onClick={handleClose}
        style={{
          position: "absolute",
          top: theme.spacing.sm,
          right: theme.spacing.sm,
          background: "transparent",
          border: "none",
          fontSize: "1.5rem",
          color: theme.colors.text.primary,
          cursor: "pointer",
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
          color: theme.colors.text.primary,
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
              color: theme.colors.text.primary,
            }}
          >
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
              marginBottom: theme.spacing.xs,
              color: theme.colors.text.primary,
            }}
          >
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              width: "100%",
              border: `2px solid ${theme.colors.text.primary}`,
              borderRadius: theme.borderRadius.md,
              padding: theme.spacing.sm,
              fontSize: theme.typography.fontSize.md,
            }}
          />
        </div>
      </div>

     {/* View Report Button */}
      <div style={{ textAlign: "center" }}>
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
            transition: theme.transitions.normal,
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
);
};

export default ReturnPopup;