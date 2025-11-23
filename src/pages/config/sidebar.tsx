import { cn } from "@/utils/cn";
import { __routes__ } from "@/constants/routes";
import { useNavigate, useParams } from "react-router-dom";

export enum ConfigSidebarElementsNames {
  Composition = "composition",
  Templates = "templates-communication",
}

export const configSidebarElements = [
  {
    label: "Composition",
    name: ConfigSidebarElementsNames.Composition,
  },
  {
    label: "Templates de communication",
    name: ConfigSidebarElementsNames.Templates,
  },
];

const ConfigSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { section } = useParams();

  return (
    <div className="h-screen min-w-2xs py-4 border-r border-gray-200">
      <h1 className="mb-6 font-medium text-xl px-4">Configuration</h1>
      {configSidebarElements.map((item) => (
        <div
          key={item.name}
          onClick={() =>
            navigate(`${__routes__.Config.Main.replace(":section", item.name)}`)
          }
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 cursor-pointer ease-out duration-300",
            section === item.name
              ? "bg-primary-light text-primary"
              : "text-gray-500 hover:bg-gray-100"
          )}
        >
          <p className="text-sm font-medium">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ConfigSidebar;
