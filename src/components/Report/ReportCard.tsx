import { FileText } from "lucide-react";
import { Card, CardActionArea, Box, Typography } from "@mui/material";

type ReportCardProps = {
  title: string;
  onClick?: () => void;
};

export default function ReportCard({ title, onClick }: ReportCardProps) {
  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        minWidth: 200,
        maxWidth: 280,
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.07)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-100%",
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(255, 153, 0, 0.2), transparent)",
          transition: "top 0.4s ease-in-out",
          zIndex: 0,
        },
        "&:hover::before": {
          top: 0,
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          position: "relative",
          p: 1.5,
          zIndex: 1,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <FileText style={{ color: "#EA580C", width: 20, height: 20 }} />
          <Typography
            variant="body2"
            fontWeight={600}
            color="text.primary"
            sx={{ fontSize: "0.875rem" }}
          >
            {title}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
