import EditorHeader from "./header";
import EditorContent from "./content";
import { useAppSelector } from "@/redux/utils";

interface CommunicationTemplateEditorProps {}

const CommunicationTemplateEditor: React.FC<
  CommunicationTemplateEditorProps
> = ({}) => {
  const { selectedAction, selectedStage, ...rest } = useAppSelector(
    (s) => s.communication,
  );
  return (
    <div>
      <EditorHeader template={rest as any} />
      <EditorContent template={rest as any} />
    </div>
  );
};

export default CommunicationTemplateEditor;
