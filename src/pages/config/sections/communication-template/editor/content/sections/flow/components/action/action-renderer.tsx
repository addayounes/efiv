import ActionSMSVariant from "./action-variants/sms/sms-variant";
import { ActionType, type Action } from "@/types/entity/communication";
import ActionEmailVariant from "./action-variants/email/email-variant";

interface FlowActionRendererProps {
  action: Action;
}

const FlowActionRenderer: React.FC<FlowActionRendererProps> = ({ action }) => {
  switch (action.type) {
    case ActionType.ExternalSMS:
      return <ActionSMSVariant action={action} />;
    case ActionType.ExternalEmail:
      return <ActionEmailVariant action={action} />;
    case ActionType.ShareOnX:
      return <></>;
    default:
      return <div>Unsupported action type</div>;
  }
};

export default FlowActionRenderer;
