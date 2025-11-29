import { Button } from "antd";
import { Plus } from "lucide-react";
import Composition from "./composition/list";
import { useNavigate } from "react-router-dom";
import { __routes__ } from "@/constants/routes";
import PageHeader from "@/components/page-header";

interface CompositionConfigSectionProps {}

const CompositionConfigSection: React.FC<
  CompositionConfigSectionProps
> = ({}) => {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate("create");
  };

  return (
    <div>
      <PageHeader
        title="Composition"
        rightComponent={
          <Button onClick={onClickAdd} type="primary">
            <Plus size={16} />
            Ajouter
          </Button>
        }
      />

      <div className="px-6">
        <Composition />
      </div>
    </div>
  );
};

export default CompositionConfigSection;
