import { useEffect, useState } from "react";
import { Button, Drawer, Input } from "antd";
import { useAppDispatch } from "@/redux/utils";
import type { Stage } from "@/types/entity/communication";
import { setSelectedStage } from "@/redux/slices/communication";

interface StageDetailsProps {
  stage: Stage | undefined;
  isOpen: boolean;
}

const StageDetails: React.FC<StageDetailsProps> = ({ stage, isOpen }) => {
  const [name, setName] = useState(stage?.name);

  const dispatch = useAppDispatch();

  const onClose = () => dispatch(setSelectedStage(undefined));

  const handleUpdateStage = async () => {
    if (!name?.length) return;
  };

  useEffect(() => {
    if (!stage) return;
    setName(stage.name);
  }, [stage]);

  return (
    <Drawer
      mask={false}
      open={isOpen}
      onClose={onClose}
      title="Détails du stage"
      extra={
        <div className="flex items-end">
          <Button onClick={handleUpdateStage} htmlType="button" type="primary">
            Enregistrer
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="font-medium">Libelle</p>
          <Input
            size="large"
            value={name}
            placeholder="Libelle du stage"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <p className="font-medium">Nombre d'actions</p>
          <Input size="large" disabled value={stage?.actions?.length ?? 0} />
        </div>
      </div>
    </Drawer>
  );
};

export default StageDetails;
