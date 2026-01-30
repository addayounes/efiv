import {
  ActionType,
  type Action,
  type Stage,
} from "@/types/entity/communication";
import ActionSMSVariantDetails from "../action-variants/sms/sms-details";
import ActionEmailVariantDetails from "../action-variants/email/email-details";

interface ActionDetailsRendererProps {
  stage?: Stage;
  action?: Action;
}

const ActionDetailsRenderer: React.FC<ActionDetailsRendererProps> = ({
  stage,
  action,
}) => {
  if (!action || !stage) return null;

  switch (action.type) {
    case ActionType.ExternalSMS:
      return <ActionSMSVariantDetails action={action} stage={stage} />;
    case ActionType.ExternalEmail:
      return <ActionEmailVariantDetails action={action} stage={stage} />;
    case ActionType.ShareOnX:
      return <></>;
    default:
      return <div>Unsupported action type</div>;
  }
};

export default ActionDetailsRenderer;
