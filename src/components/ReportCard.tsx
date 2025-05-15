import { FileText } from "lucide-react";

type ReportCardProps = {
  title: string;
};

export default function ReportCard({ title }: ReportCardProps) {
  return (
    <a href="#" className="flex items-center gap-2 bg-white hover:shadow-lg transition-shadow p-3 rounded-md shadow-sm w-fit">
      <FileText className="text-orange-600 w-5 h-5" />
      <h3 className="text-black font-semibold text-sm">{title}</h3>
    </a>
  );
}
