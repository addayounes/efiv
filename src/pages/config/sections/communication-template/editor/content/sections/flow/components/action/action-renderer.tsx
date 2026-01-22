import { ActionType, type Action } from "@/types/entity/communication";
import ActionSMSVariant from "./action-variants/sms-variant";

interface FlowActionRendererProps {
  action: Action;
}
const FlowActionRenderer: React.FC<FlowActionRendererProps> = ({ action }) => {
  switch (action.type) {
    case ActionType.SMS:
      return <ActionSMSVariant action={action} />;
    case ActionType.ExternalEmail:
      return <ActionSMSVariant action={action} />;
    case ActionType.InternalEmail:
      return <ActionSMSVariant action={action} />;
    case ActionType.ShareOnFacebook:
      return <ActionSMSVariant action={action} />;
    case ActionType.ShareOnX:
      return <ActionSMSVariant action={action} />;
    default:
      return <div>Unsupported action type</div>;
  }
};

export default FlowActionRenderer;
