import { ActionType, type Action } from "@/types/entity/communication";
import ActionSMSVariantDetails from "../action-variants/sms/sms-details";
import ActionEmailVariantDetails from "../action-variants/email/email-details";

interface ActionDetailsRendererProps {
  action?: Action;
}

const ActionDetailsRenderer: React.FC<ActionDetailsRendererProps> = ({
  action,
}) => {
  if (!action) return null;

  switch (action.type) {
    case ActionType.SMS:
      return <ActionSMSVariantDetails action={action} />;
    case ActionType.ExternalEmail:
      return <ActionEmailVariantDetails action={action} />;
    case ActionType.InternalEmail:
      return <ActionEmailVariantDetails action={action} />;
    case ActionType.ShareOnFacebook:
      return <ActionSMSVariantDetails action={action} />;
    case ActionType.ShareOnX:
      return <ActionSMSVariantDetails action={action} />;
    default:
      return <div>Unsupported action type</div>;
  }
};

export default ActionDetailsRenderer;
