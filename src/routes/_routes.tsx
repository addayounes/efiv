import Login from "@/pages/auth/login";
import ConfigPage from "@/pages/config";
import Dashboard from "@/pages/dashboard";
import { __routes__ } from "@/constants/routes";
import CirculationsList from "@/pages/circulations/list";
import CreateCirculationForm from "@/pages/circulations/create-form";
import UpdateOperationlCirculation from "@/pages/circulations/update-form";
import OperationalCirculations from "@/pages/circulations/list/tabs/operational";

export interface RouteType {
  path: string;
  withLayout?: boolean;
  element: React.JSX.Element;
}

export const privateRoutes: RouteType[] = [
  {
    path: __routes__.Dashboard,
    element: <Dashboard />,
    withLayout: true,
  },
  {
    path: __routes__.Circulations.Main,
    element: <CirculationsList />,
    withLayout: true,
  },
  {
    path: __routes__.Circulations.Operational,
    element: <OperationalCirculations />,
    withLayout: true,
  },
  {
    path: __routes__.Circulations.OperationalUpdate,
    element: <UpdateOperationlCirculation />,
    withLayout: true,
  },
  {
    path: __routes__.Circulations.Create,
    element: <CreateCirculationForm />,
    withLayout: true,
  },
  {
    path: __routes__.Config.Main,
    element: <ConfigPage />,
    withLayout: true,
  },
  {
    path: __routes__.Config.SubSections.Main,
    element: <ConfigPage />,
    withLayout: true,
  },
];

export const publicRoutes: RouteType[] = [
  {
    path: __routes__.Auth.Login,
    element: <Login />,
  },
];
