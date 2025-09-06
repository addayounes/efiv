import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = ({}) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
