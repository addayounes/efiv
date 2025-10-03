import { CircleAlert } from "lucide-react";

interface FieldErrorProps {
  children: React.ReactNode;
}

const FieldError: React.FC<FieldErrorProps> = ({ children }) => {
  return (
    <p className="flex items-center gap-1 text-xs font-medium text-red-500 mt-0.5">
      <CircleAlert size={12} className="translate-y-[1px]" />
      <span>{children}</span>
    </p>
  );
};

export default FieldError;
