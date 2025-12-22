import { Button } from "antd";
import { Plus } from "lucide-react";
import MotifRetardList from "./list";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/page-header";

interface MotifConfigSectionProps {}

const MotifRetardConfigSection: React.FC<MotifConfigSectionProps> = ({}) => {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate("create");
  };
  return (
    <div>
      <PageHeader
        title="Motifs de retard"
        rightComponent={
          <Button onClick={onClickAdd} type="primary">
            <Plus size={16} />
            Ajouter
          </Button>
        }
      />

      <div className="px-6">
        <MotifRetardList />
      </div>
    </div>
  );
};

export default MotifRetardConfigSection;
