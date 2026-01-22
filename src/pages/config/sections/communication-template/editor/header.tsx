import { Button } from "antd";
import type { CommunicationTemplate } from "@/types/entity/communication";

interface EditorHeaderProps {
  template: CommunicationTemplate;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ template }) => {
  return (
    <div className="p-4 border-b border-gray-200 shadow">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-medium">{template.name}</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button type="primary">Enregistrer</Button>
          <Button>Annuler</Button>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
