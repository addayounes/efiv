import { Tooltip } from "antd";
import { cn } from "@/utils/cn";
import { __routes__ } from "@/constants/routes";
import { Link, useLocation } from "react-router-dom";
import { configSidebarElements } from "@/pages/config/sidebar";
import { Activity, House, Mail, Settings, TrainFront } from "lucide-react";

const SidebarElements = [
  {
    label: "Tableau de bord",
    icon: <House color="white" />,
    route: __routes__.Dashboard,
  },
  {
    label: "Suivi opérationnel",
    icon: <Activity color="white" />,
    route: __routes__.Circulations.Operational,
  },
  {
    label: "Circulations",
    icon: <TrainFront color="white" />,
    route: __routes__.Circulations.Main,
  },
  {
    label: "Événements de communication",
    icon: <Mail color="white" />,
    route: __routes__.Events.Main,
  },
  {
    label: "Configuration",
    icon: <Settings color="white" />,
    route: __routes__.Config.Main.replace(
      ":section",
      configSidebarElements[0].name,
    ), // Default to first config section
  },
];

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-primary h-screen flex flex-col items-center">
      <ul>
        {SidebarElements.map((item) => (
          <li key={item.label}>
            <Tooltip
              placement="right"
              title={item.label}
              className={cn(
                "flex items-center py-4 px-4",
                pathname === item.route
                  ? "bg-primary-dark"
                  : "hover:bg-primary-dark",
              )}
            >
              <Link to={item.route}>{item.icon}</Link>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
