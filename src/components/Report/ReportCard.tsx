import { FileText } from "lucide-react";
import { Card, Typography } from "@mui/material";

type ReportCardProps = {
  title: string;
  onClick?: () => void;
};

export default function ReportCard({ title, onClick }: ReportCardProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        px: 1.5,
        py: 1,
        borderRadius: 2,
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        border: "1px solid #ddd",
        boxShadow: "none", // Removes default box shadow
        "&:hover": {
          borderColor: "#EA580C",
        },
      }}
    >
      <FileText style={{ color: "#EA580C", width: 20, height: 20 }} />
      <Typography
        variant="body2"
        fontWeight={400}
        color="text.primary"
        sx={{ fontSize: "0.825rem", whiteSpace: "nowrap" }}
      >
        {title}
      </Typography>
    </Card>
  );
}
