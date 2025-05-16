import { FileText } from "lucide-react";

type ReportCardProps = {
  title: string;
  onClick?: () => void; 
};

export default function ReportCard({ title, onClick }: ReportCardProps) {
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className="flex items-center gap-2 bg-white hover:shadow-lg transition-shadow p-3 rounded-md shadow-sm w-fit cursor-pointer"
    >
      <FileText className="text-orange-600 w-5 h-5" />
      <h3 className="text-black font-semibold text-sm">{title}</h3>
    </a>
  );
}
