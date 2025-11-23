import ConfigSidebar from "./sidebar";
import ConfigSectionRenderer from "./renderer";

interface ConfigPageProps {}

const ConfigPageLayout: React.FC<ConfigPageProps> = ({}) => {
  return (
    <div className="flex">
      <ConfigSidebar />
      <ConfigSectionRenderer />
    </div>
  );
};

export default ConfigPageLayout;
