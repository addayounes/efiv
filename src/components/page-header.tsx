import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  backTo?: string;
  rightComponent?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  rightComponent,
  backTo,
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-between gap-4 py-4 px-6">
      <div className="flex items-center gap-1">
        {backTo && (
          <ChevronLeft
            size={20}
            onClick={() => navigate(backTo)}
            className="flex items-center justify-center cursor-pointer translate-y-0.5 w-8 h-8 p-1 rounded-full hover:bg-primary/10 duration-200 ease-out"
          />
        )}
        <h1 className="text-2xl font-medium">{title}</h1>
      </div>
      {rightComponent && <div>{rightComponent}</div>}
    </div>
  );
};

export default PageHeader;
