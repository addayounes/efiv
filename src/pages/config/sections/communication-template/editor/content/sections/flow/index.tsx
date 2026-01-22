import AddStageButton from "./components/stage/add-stage-button";
import MainFlowContent from "./components/main-flow";
import type { CommunicationTemplate } from "@/types/entity/communication";

interface EditorFlowProps {
  template: CommunicationTemplate;
}

const EditorFlow: React.FC<EditorFlowProps> = ({ template }) => {
  return (
    <div className="flex justify-center py-16 px-10 h-full">
      {!template?.stages.length ? (
        <AddStageButton />
      ) : (
        <MainFlowContent template={template} />
      )}
    </div>
  );
};

export default EditorFlow;
