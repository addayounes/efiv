import EmptyAction from "../../empty-action";
import type { Action, EmailActionDetails } from "@/types/entity/communication";

interface ActionEmailVariantProps {
  action: Action;
}

const ActionEmailVariant: React.FC<ActionEmailVariantProps> = ({ action }) => {
  const details = action.details as EmailActionDetails;
  if (!details?.body && !details?.subject) return <EmptyAction />;
  return (
    <div className="space-y-2">
      <p className="text-gray-500  font-medium truncate line-clamp-2">
        {details.subject}
      </p>
      <p className="text-gray-500 line-clamp-3 text-sm">{details.body}</p>
    </div>
  );
};

export default ActionEmailVariant;
