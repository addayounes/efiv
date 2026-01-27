import { Drawer } from "antd";
import { useAppDispatch } from "@/redux/utils";
import ActionDetailsRenderer from "./details-renderer";
import { setSelectedAction } from "@/redux/slices/communication";
import { type Action, type Stage } from "@/types/entity/communication";

interface ActionDetailsProps {
  stage?: Stage;
  action?: Action;
}

const ActionDetails: React.FC<ActionDetailsProps> = ({ action, stage }) => {
  const dispatch = useAppDispatch();

  const onClose = () =>
    dispatch(setSelectedAction({ action: undefined, stage: undefined }));

  return (
    <Drawer
      mask={false}
      width="30vw"
      open={!!action}
      onClose={onClose}
      title="Détails de l'action"
    >
      <ActionDetailsRenderer action={action} stage={stage} />
    </Drawer>
  );
};

export default ActionDetails;
