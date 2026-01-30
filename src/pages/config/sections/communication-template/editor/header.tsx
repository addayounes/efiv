import { useState } from "react";
import { Button, Input } from "antd";
import { Check, Pencil } from "lucide-react";
import type { CommunicationTemplate } from "@/types/entity/communication";

interface EditorHeaderProps {
  template: CommunicationTemplate;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ template }) => {
  const [editingMode, setEditingMode] = useState(false);

  const onEditingModeSwitch = () => {
    setEditingMode((v) => {
      if (v) onSaveName();
      return !v;
    });
  };

  const onSaveName = () => {
    console.log("save");
  };

  return (
    <div className="p-4 border-b border-gray-200 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 -my-2">
          {editingMode ? (
            <Input
              autoFocus
              defaultValue={template.name}
              placeholder="Libelle du template"
              className="!min-w-xl font-medium !text-base -my-2"
            />
          ) : (
            <h1 className="font-medium">{template.name}</h1>
          )}
          <Button type="text" onClick={onEditingModeSwitch}>
            {editingMode ? (
              <Check size={18} className="-mx-2" />
            ) : (
              <Pencil size={16} className="-mx-2" />
            )}
          </Button>
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
