import { Tooltip } from "antd";
import { cn } from "../../utils/cn";
import { House, TrainFront } from "lucide-react";
import { __routes__ } from "../../constants/routes";
import { Link, useLocation } from "react-router-dom";

const SidebarElements = [
  {
    label: "Tableau de bord",
    icon: <House color="white" />,
    route: __routes__.Dashboard,
  },
  {
    label: "Circulations",
    icon: <TrainFront color="white" />,
    route: __routes__.Circulations.Main,
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
                  : "hover:bg-primary-dark"
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
