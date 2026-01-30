import { cn } from "@/utils/cn";
import FlowStage from "./stage";
import StageDetails from "./stage/details";
import ActionDetails from "./action/details";
import { useAppSelector } from "@/redux/utils";
import type { CommunicationTemplate } from "@/types/entity/communication";
import StartOfIncident from "./stage/start-of-incident";

interface MainFlowContentProps {
  template: CommunicationTemplate;
}

const MainFlowContent: React.FC<MainFlowContentProps> = ({ template }) => {
  const { selectedStage, selectedAction } = useAppSelector(
    (s) => s.communication,
  );
  return (
    <div>
      <div
        className={cn("transition-transform ease-out duration-500", {
          "-translate-x-[25%]": !!selectedStage || !!selectedAction,
        })}
      >
        <StartOfIncident />

        {(template.stages ?? []).map((stage, index) => {
          return <FlowStage key={stage.id} stage={stage} index={index} />;
        })}
      </div>

      <StageDetails
        stage={selectedStage}
        isOpen={!!selectedStage && !selectedAction}
      />
      <ActionDetails action={selectedAction} stage={selectedStage} />
    </div>
  );
};

export default MainFlowContent;
