import { Button } from "antd";
import { Plus } from "lucide-react";
import CirculationsTabs from "./tabs";
import { useNavigate } from "react-router-dom";
import { __routes__ } from "@/constants/routes";
import PageHeader from "@/components/page-header";

const CirculationsList: React.FC = () => {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate(__routes__.Circulations.Create);
  };

  return (
    <div>
      <PageHeader
        title="Circulations"
        rightComponent={
          <Button onClick={onClickAdd} type="primary">
            <Plus size={16} />
            Ajouter
          </Button>
        }
      />
      <CirculationsTabs />
    </div>
  );
};

export default CirculationsList;
