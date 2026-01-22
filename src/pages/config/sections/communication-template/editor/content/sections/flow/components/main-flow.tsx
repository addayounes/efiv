import FlowStage from "./stage";
import type { CommunicationTemplate } from "@/types/entity/communication";

interface MainFlowContentProps {
  template: CommunicationTemplate;
}

const MainFlowContent: React.FC<MainFlowContentProps> = ({ template }) => {
  return (
    <div>
      {(template.stages ?? []).map((stage, index) => {
        return <FlowStage key={stage.id} stage={stage} index={index} />;
      })}
    </div>
  );
};

export default MainFlowContent;
