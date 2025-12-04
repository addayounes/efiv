import PageHeader from "@/components/page-header";
import MotifRetardList from "./list";

interface MotifConfigSectionProps {}

const MotifRetardConfigSection: React.FC<MotifConfigSectionProps> = ({}) => {
  return (
    <div>
      <PageHeader title="Motifs de retard" />

      <div className="px-6">
        <MotifRetardList />
      </div>
    </div>
  );
};

export default MotifRetardConfigSection;
