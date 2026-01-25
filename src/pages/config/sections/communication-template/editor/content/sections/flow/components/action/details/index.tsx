import { Button, Drawer } from "antd";
import { useAppDispatch } from "@/redux/utils";
import ActionDetailsRenderer from "./details-renderer";
import { type Action } from "@/types/entity/communication";
import { setSelectedAction } from "@/redux/slices/communication";

interface ActionDetailsProps {
  action?: Action;
}

const ActionDetails: React.FC<ActionDetailsProps> = ({ action }) => {
  const dispatch = useAppDispatch();

  const onClose = () => dispatch(setSelectedAction(undefined));

  const handleUpdateAction = async () => {};

  return (
    <Drawer
      mask={false}
      open={!!action}
      onClose={onClose}
      title="Détails de l'action"
      extra={
        <div className="flex items-end">
          <Button onClick={handleUpdateAction} htmlType="button" type="primary">
            Enregistrer
          </Button>
        </div>
      }
    >
      <ActionDetailsRenderer action={action} />
    </Drawer>
  );
};

export default ActionDetails;
