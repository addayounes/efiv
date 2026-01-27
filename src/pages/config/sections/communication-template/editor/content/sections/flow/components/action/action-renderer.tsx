import {
  ActionType,
  type Action,
  type Stage,
} from "@/types/entity/communication";
import ActionSMSVariant from "./action-variants/sms/sms-variant";
import ActionEmailVariant from "./action-variants/email/email-variant";

interface FlowActionRendererProps {
  action: Action;
}

const FlowActionRenderer: React.FC<FlowActionRendererProps> = ({ action }) => {
  switch (action.type) {
    case ActionType.SMS:
      return <ActionSMSVariant action={action} />;
    case ActionType.ExternalEmail:
      return <ActionEmailVariant action={action} />;
    case ActionType.InternalEmail:
      return <ActionEmailVariant action={action} />;
    case ActionType.ShareOnFacebook:
      return <></>;
    case ActionType.ShareOnX:
      return <></>;
    default:
      return <div>Unsupported action type</div>;
  }
};

export default FlowActionRenderer;
