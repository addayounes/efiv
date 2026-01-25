import { cn } from "@/utils/cn";
import FlowStage from "./stage";
import StageDetails from "./stage/details";
import { useAppSelector } from "@/redux/utils";
import type { CommunicationTemplate } from "@/types/entity/communication";

interface MainFlowContentProps {
  template: CommunicationTemplate;
}

const MainFlowContent: React.FC<MainFlowContentProps> = ({ template }) => {
  const { selectedStage } = useAppSelector((s) => s.communication);
  return (
    <div>
      <div
        className={cn("transition-transform ease-out duration-500", {
          "-translate-x-[25%]": !!selectedStage,
        })}
      >
        {(template.stages ?? []).map((stage, index) => {
          return <FlowStage key={stage.id} stage={stage} index={index} />;
        })}
      </div>

      <StageDetails stage={selectedStage} />
    </div>
  );
};

export default MainFlowContent;
