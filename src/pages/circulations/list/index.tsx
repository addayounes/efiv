import { Button } from "antd";
import { Plus } from "lucide-react";
import CirculationsTable from "./table";
import CirculationsListHeader from "./header";
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
      <div className="px-6">
        <CirculationsListHeader />
      </div>
      <CirculationsTable />
    </div>
  );
};

export default CirculationsList;
