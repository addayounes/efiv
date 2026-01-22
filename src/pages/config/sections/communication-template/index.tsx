import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { __routes__ } from "@/constants/routes";
import { ConfigSidebarElementsNames } from "../../sidebar";

interface CommunicationTemplateConfigProps {}

const CommunicationTemplateConfig: React.FC<
  CommunicationTemplateConfigProps
> = ({}) => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <Button
        type="primary"
        onClick={() =>
          navigate(
            __routes__.Config.SubSections.Create.replace(
              ":section",
              ConfigSidebarElementsNames.Templates,
            ),
          )
        }
      >
        Editeur
      </Button>
    </div>
  );
};

export default CommunicationTemplateConfig;
