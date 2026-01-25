import EditorFlow from "./sections/flow";
import type { CommunicationTemplate } from "@/types/entity/communication";

interface EditorContentProps {
  template: CommunicationTemplate;
}

const EditorContent: React.FC<EditorContentProps> = ({ template }) => {
  return (
    <div className="bg-primary-bg h-[calc(100vh-65px)] overflow-y-auto dotted-bg">
      <EditorFlow template={template} />
    </div>
  );
};

export default EditorContent;
