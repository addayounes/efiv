import { Outlet } from "react-router-dom";

interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = ({}) => {
  return <Outlet />;
};

export default AppLayout;
