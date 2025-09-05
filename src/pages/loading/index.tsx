import { Loader2 } from "lucide-react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-16 w-full">
      <Loader2 className="animate-spin w-12 h-12" />
    </div>
  );
};

export default Loading;
