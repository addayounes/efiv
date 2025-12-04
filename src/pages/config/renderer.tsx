import { useEffect } from "react";
import { __routes__ } from "@/constants/routes";
import { ConfigSidebarElementsNames } from "./sidebar";
import MotifRetardConfigSection from "./sections/motif";
import { useNavigate, useParams } from "react-router-dom";
import CompositionConfigSection from "./sections/composition";

const ConfigSectionRenderer: React.FC = () => {
  const navigate = useNavigate();
  const { section } = useParams();

  const sectionMap: Record<string, React.ReactNode> = {
    [ConfigSidebarElementsNames.Composition]: <CompositionConfigSection />,
    [ConfigSidebarElementsNames.Templates]: <div></div>,
    [ConfigSidebarElementsNames.MotifRetard]: <MotifRetardConfigSection />,
  };

  useEffect(() => {
    // Fallback to default section if none is selected or invalid section
    if (!section || !(section in sectionMap)) {
      navigate(
        __routes__.Config.Main.replace(
          ":section",
          ConfigSidebarElementsNames.Composition
        )
      );
    }
  }, [section, sectionMap]);

  return (
    <div className="bg-primary-bg w-full h-screen overflow-y-auto">
      {sectionMap[section || ""]}
    </div>
  );
};

export default ConfigSectionRenderer;
