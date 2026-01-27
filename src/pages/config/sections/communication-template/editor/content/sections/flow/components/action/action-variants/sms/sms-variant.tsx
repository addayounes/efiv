import EmptyAction from "../../empty-action";
import type { Action, SMSActionDetails } from "@/types/entity/communication";

interface ActionSMSVariantProps {
  action: Action;
}

const ActionSMSVariant: React.FC<ActionSMSVariantProps> = ({ action }) => {
  const details = action?.details as SMSActionDetails;
  if (!details?.body) return <EmptyAction />;
  return <p className="text-gray-500 truncate line-clamp-3">{details.body}</p>;
};

export default ActionSMSVariant;
